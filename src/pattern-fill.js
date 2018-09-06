

const Shape = require('sketch/dom').Shape
const Rectangle = require('sketch/dom').Rectangle
const Settings = require('sketch/settings')

const SketchAPI = require('sketch');



export default function(context) {

const MochaJSDelegate = function(selectorHandlerDict){
  var uniqueClassName = "MochaJSDelegate_DynamicClass_" + NSUUID.UUID().UUIDString();

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, NSObject);

  delegateClassDesc.registerClass();

  //  Handler storage

  var handlers = {};

  //  Define interface

  this.setHandlerForSelector = function(selectorString, func){
    var handlerHasBeenSet = (selectorString in handlers);
    var selector = NSSelectorFromString(selectorString);

    handlers[selectorString] = func;

    if(!handlerHasBeenSet){
      /*
        For some reason, Mocha acts weird about arguments:
        https://github.com/logancollins/Mocha/issues/28

        We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
      */

      var dynamicHandler = function(){
        var functionToCall = handlers[selectorString];

        if(!functionToCall) return;

        return functionToCall.apply(delegateClassDesc, arguments);
      };

      var args = [], regex = /:/g;
      while(regex.exec(selectorString)) args.push("arg"+args.length);

      const dynamicFunction = eval("(function("+args.join(",")+"){ return dynamicHandler.apply(this, arguments); })");
      //delegateClassDesc.addInstanceMethodWithSelector_function_(selector, function() {
        //   func.apply(delegateClassDesc, arguments);
      //});
      delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction);
    }
  };

  this.removeHandlerForSelector = function(selectorString){
    delete handlers[selectorString];
  };

  this.getHandlerForSelector = function(selectorString){
    return handlers[selectorString];
  };

  this.getAllHandlers = function(){
    return handlers;
  };

  this.getClass = function(){
    return NSClassFromString(uniqueClassName);
  };

  this.getClassInstance = function(){
    return NSClassFromString(uniqueClassName).new();
  };

  //  Conveience

  if(typeof selectorHandlerDict == "object"){
    for(var selectorString in selectorHandlerDict){
      this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString]);
    }
  }
};




  const pluginSketchRoot = context.scriptPath
    .stringByDeletingLastPathComponent()

  const htmlPath = pluginSketchRoot + '/scripts/panel/panel.html'

  const url = encodeURI("file://" + htmlPath);

  const width = 400
  const height = 600

  const floatWindow = true

  const frame = NSMakeRect(0, 0, width, (height + 32))
  // const titleBgColor = NSColor.colorWithRed_green_blue_alpha(0 / 255, 145 / 255, 234 / 255, 1)
  const titleBgColor = NSColor.colorWithRed_green_blue_alpha(0 / 255, 102 / 255, 204 / 255, 1)
  // const titleBgColor = NSColor.colorWithRed_green_blue_alpha(1, 1, 1, 1)
  const contentBgColor = NSColor.colorWithRed_green_blue_alpha(1, 1, 1, 1)


  const identifier = 'pixel-cycle-pattern-fill-panel'
  const threadDictionary = NSThread.mainThread().threadDictionary();
  if(threadDictionary[identifier]) {
    // Window alrady open

    // Development only:
    // threadDictionary[identifier].close();
    // threadDictionary.removeObjectForKey(identifier)

    // Production only:
    return false
  }

  const hiddenClose = false;

  // let Panel = null
  // if(threadDictionary[identifier]) {
  //   Panel = threadDictionary[identifier]
  // } else {
  //   Panel = NSPanel.alloc().init();
  // }
  const Panel = NSPanel.alloc().init();


  Panel.setTitleVisibility(NSWindowTitleHidden);
  Panel.setTitlebarAppearsTransparent(true);
  Panel.standardWindowButton(NSWindowCloseButton).setHidden(hiddenClose);
  Panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
  Panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
  Panel.setFrame_display(frame, true);
  Panel.setBackgroundColor(contentBgColor);
  Panel.setWorksWhenModal(true);

  if(floatWindow) {
    Panel.becomeKeyWindow();
    Panel.setLevel(NSFloatingWindowLevel);
    threadDictionary[identifier] = Panel;
    // Long-running script
    COScript.currentCOScript().setShouldKeepAround_(true);
  }



  const contentView = Panel.contentView()
  let webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, width, height));
  const windowObject = webView.windowScriptObject();
  contentView.setWantsLayer(true);
  contentView.layer().setFrame(contentView.frame());
  webView.setBackgroundColor(contentBgColor);
  webView.setMainFrameURL_(url);
  contentView.addSubview(webView);

  const delegate = new MochaJSDelegate({
    "webView:didFinishLoadForFrame:": (function (webView, webFrame) {
      const SketchAction = [
        "function SketchAction(hash, data) { ",
          "if(data){ window.PixelCycleData = encodeURI(JSON.stringify(data)); }",
          "window.location.hash = hash;",
        "}"
      ].join("")
      // DOMReady = [
      //   "$(", "function(){", "init(" + JSON.stringify(options.data) + ")", "}",");"
      // ].join("");
      windowObject.evaluateWebScript(SketchAction);
      // windowObject.evaluateWebScript(DOMReady);
    }),
    "webView:didChangeLocationWithinPageForFrame:": (function (webView, webFrame) {
      const request = NSURL.URLWithString(webView.mainFrameURL()).fragment();

      if (request == "insertImage") {
        const svgData = JSON.parse(decodeURI(windowObject.valueForKey("PixelCycleData")));

        const selectedLayers = context.selection
        const selectedCount = selectedLayers.length

        if(selectedLayers && selectedLayers.length > 0) {
          const l = selectedLayers[0]

          //// Example getting parent of selected layer:

          // l.style().contextSettings().setOpacity(Math.random())
          // const frame = new Rectangle(0, 0, 200, 200)
          // const s = new Shape({
          //   name: 'test shape',
          //   frame: frame
          // })
          // let parent = selectedLayers[0].parent;
          // if(!parent){
          //   parent = SketchAPI.fromNative(selectedLayers[0].parentPage())            
          // }

        }

        let parent = null
  

        //// Another parent example:

        // const selectedLayers = context.selection
        // const selectedCount = selectedLayers.length

        // if(selectedLayers && selectedLayers.length > 0) {
          // parent = SketchAPI.fromNative(selectedLayers[0])
          // if(selectedLayers[0].parent) {
          //   parent = selectedLayers[0].parent
          // }
          // const l = selectedLayers[0]
          // parent = selectedLayers[0].parent;
          // if(!parent){
          //   parent = SketchAPI.fromNative(selectedLayers[0].parentPage())            
          // }
        // }

        if(!parent) {
          const ddoc = SketchAPI.Document.getSelectedDocument()
          parent = ddoc.selectedPage          
        }

          // const g = new SketchAPI.Group({
          //   layers: selectedLayers,
          //   parent: parent
          // });

          // const g = new SketchAPI.Group({
          //   name: 'testing',
          //   layers: [l],
          //   frame,
          //   parent: context.document
          // })

          // l.addLayers([s.sketchObject])

          const svgCode = svgData

          var svgString = NSString.stringWithString(svgCode);
          var svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);

          var svgImporter = MSSVGImporter.svgImporter();
          svgImporter.prepareToImportFromData(svgData);
          var svgLayer = svgImporter.importAsLayer();

          svgLayer.setName('PixelCycle.ai Image');

          // const d = SketchAPI.fromNative(context.document)
          // l.addLayers([svgLayer])

          parent.sketchObject.addLayers([svgLayer])

          // context.document.addLayers([svgLayer])
          // MSMaskWithShape.createMaskWithShapeForLayers(group)
          // context.document.currentPage().addLayers([svgLayer]);

          context.document.showMessage("🎉 SVG inserted!");
      }




      if(request == 'setSetting') {
        const requestData = JSON.parse(decodeURI(windowObject.valueForKey("PixelCycleData")));
        Settings.setSettingForKey(requestData.key, requestData.value)
      }


      if(request == 'getSetting') {
        const requestData = JSON.parse(decodeURI(windowObject.valueForKey("PixelCycleData")));
        const setting = Settings.settingForKey(requestData.key)

        if(setting) {
          windowObject.evaluateWebScript(`passData('got_setting', '{"key": "${requestData.key}", "value": "${setting}"}');`);
        }
      }

      


      windowObject.evaluateWebScript("window.location.hash = '';");
    })
  });

  webView.setFrameLoadDelegate_(delegate.getClassInstance());



  const closeButton = Panel.standardWindowButton(NSWindowCloseButton);
  closeButton.setCOSJSTargetFunction(function (sender) {
    threadDictionary.removeObjectForKey(identifier)
    if(floatWindow) {
      COScript.currentCOScript().setShouldKeepAround_(false);
      Panel.close();
      // Develop mode? kill the script
    } else {
      Panel.orderOut(nil);
      NSApp.stopModal();
    }
  });
  closeButton.setAction("callAction:");
  var titlebarView = contentView.superview().titlebarViewController().view(),
  titlebarContainerView = titlebarView.superview();
  closeButton.setFrameOrigin(NSMakePoint(8, 8));
  titlebarContainerView.setFrame(NSMakeRect(0, height, width, 32));
  titlebarView.setFrameSize(NSMakeSize(width, 32));
  titlebarView.setTransparent(true);
  titlebarView.setBackgroundColor(titleBgColor);
  titlebarContainerView.superview().setBackgroundColor(titleBgColor);


  // NSApp.runModalForWindow(Panel);

  if(floatWindow) {
    Panel.center();
    Panel.makeKeyAndOrderFront(nil);    
  } else {
    NSApp.runModalForWindow(Panel);
  }

  // const selectedLayers = context.selection
  // const selectedCount = selectedLayers.length

  // if(selectedLayers && selectedLayers.length > 0) {
  //   const l = selectedLayers[0]
  //   l.style().contextSettings().setOpacity(Math.random())
  // }
  
  // if (selectedCount === 0) {
  //   context.document.showMessage('No layers are selected.')
  // } else {
  //   context.document.showMessage(`${selectedCount} layers selected.`)
  // }
}
