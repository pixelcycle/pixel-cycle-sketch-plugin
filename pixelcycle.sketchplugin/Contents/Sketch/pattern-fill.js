var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pattern-fill.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pattern-fill.js":
/*!*****************************!*\
  !*** ./src/pattern-fill.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Shape = __webpack_require__(/*! sketch/dom */ "sketch/dom").Shape;

var Rectangle = __webpack_require__(/*! sketch/dom */ "sketch/dom").Rectangle;

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var SketchAPI = __webpack_require__(/*! sketch */ "sketch");

/* harmony default export */ __webpack_exports__["default"] = (function (context) {
  var MochaJSDelegate = function MochaJSDelegate(selectorHandlerDict) {
    var uniqueClassName = "MochaJSDelegate_DynamicClass_" + NSUUID.UUID().UUIDString();
    var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(uniqueClassName, NSObject);
    delegateClassDesc.registerClass(); //  Handler storage

    var handlers = {}; //  Define interface

    this.setHandlerForSelector = function (selectorString, func) {
      var handlerHasBeenSet = selectorString in handlers;
      var selector = NSSelectorFromString(selectorString);
      handlers[selectorString] = func;

      if (!handlerHasBeenSet) {
        /*
          For some reason, Mocha acts weird about arguments:
          https://github.com/logancollins/Mocha/issues/28
           We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
        */
        var dynamicHandler = function dynamicHandler() {
          var functionToCall = handlers[selectorString];
          if (!functionToCall) return;
          return functionToCall.apply(delegateClassDesc, arguments);
        };

        var args = [],
            regex = /:/g;

        while (regex.exec(selectorString)) {
          args.push("arg" + args.length);
        }

        var dynamicFunction = eval("(function(" + args.join(",") + "){ return dynamicHandler.apply(this, arguments); })"); //delegateClassDesc.addInstanceMethodWithSelector_function_(selector, function() {
        //   func.apply(delegateClassDesc, arguments);
        //});

        delegateClassDesc.addInstanceMethodWithSelector_function_(selector, dynamicFunction);
      }
    };

    this.removeHandlerForSelector = function (selectorString) {
      delete handlers[selectorString];
    };

    this.getHandlerForSelector = function (selectorString) {
      return handlers[selectorString];
    };

    this.getAllHandlers = function () {
      return handlers;
    };

    this.getClass = function () {
      return NSClassFromString(uniqueClassName);
    };

    this.getClassInstance = function () {
      return NSClassFromString(uniqueClassName).new();
    }; //  Conveience


    if (_typeof(selectorHandlerDict) == "object") {
      for (var selectorString in selectorHandlerDict) {
        this.setHandlerForSelector(selectorString, selectorHandlerDict[selectorString]);
      }
    }
  };

  var pluginSketchRoot = context.scriptPath.stringByDeletingLastPathComponent();
  var htmlPath = pluginSketchRoot + '/scripts/panel/panel.html';
  var url = encodeURI("file://" + htmlPath);
  var width = 400;
  var height = 600;
  var floatWindow = false;
  var frame = NSMakeRect(0, 0, width, height + 32); // const titleBgColor = NSColor.colorWithRed_green_blue_alpha(0 / 255, 145 / 255, 234 / 255, 1)

  var titleBgColor = NSColor.colorWithRed_green_blue_alpha(0 / 255, 102 / 255, 204 / 255, 1); // const titleBgColor = NSColor.colorWithRed_green_blue_alpha(1, 1, 1, 1)

  var contentBgColor = NSColor.colorWithRed_green_blue_alpha(1, 1, 1, 1); // const identifier = 'pixel-cycle-pattern-fill-panel'
  // const threadDictionary = NSThread.mainThread().threadDictionary();
  // if(threadDictionary[identifier]) {
  //   // Window alrady open
  //   // Development only:
  //   // threadDictionary[identifier].close();
  //   // threadDictionary.removeObjectForKey(identifier)
  //   // Production only:
  //   return false
  // }

  var hiddenClose = false; // let Panel = null
  // if(threadDictionary[identifier]) {
  //   Panel = threadDictionary[identifier]
  // } else {
  //   Panel = NSPanel.alloc().init();
  // }

  var Panel = NSPanel.alloc().init();
  Panel.setTitleVisibility(NSWindowTitleHidden);
  Panel.setTitlebarAppearsTransparent(true);
  Panel.standardWindowButton(NSWindowCloseButton).setHidden(hiddenClose);
  Panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
  Panel.standardWindowButton(NSWindowZoomButton).setHidden(true);
  Panel.setFrame_display(frame, true);
  Panel.setBackgroundColor(contentBgColor);
  Panel.setWorksWhenModal(true);

  if (floatWindow) {
    Panel.becomeKeyWindow();
    Panel.setLevel(NSFloatingWindowLevel); // threadDictionary[identifier] = Panel;
    // Long-running script

    COScript.currentCOScript().setShouldKeepAround_(true);
  }

  var contentView = Panel.contentView();
  var webView = WebView.alloc().initWithFrame(NSMakeRect(0, 0, width, height));
  var windowObject = webView.windowScriptObject();
  contentView.setWantsLayer(true);
  contentView.layer().setFrame(contentView.frame());
  webView.setBackgroundColor(contentBgColor);
  webView.setMainFrameURL_(url);
  contentView.addSubview(webView);
  var delegate = new MochaJSDelegate({
    "webView:didFinishLoadForFrame:": function webViewDidFinishLoadForFrame(webView, webFrame) {
      var SketchAction = ["function SketchAction(hash, data) { ", "if(data){ window.PixelCycleData = encodeURI(JSON.stringify(data)); }", "window.location.hash = hash;", "}"].join(""); // DOMReady = [
      //   "$(", "function(){", "init(" + JSON.stringify(options.data) + ")", "}",");"
      // ].join("");

      windowObject.evaluateWebScript(SketchAction); // windowObject.evaluateWebScript(DOMReady);
    },
    "webView:didChangeLocationWithinPageForFrame:": function webViewDidChangeLocationWithinPageForFrame(webView, webFrame) {
      var request = NSURL.URLWithString(webView.mainFrameURL()).fragment();

      if (request == "insertImage") {
        var _svgData = JSON.parse(decodeURI(windowObject.valueForKey("PixelCycleData")));

        var selectedLayers = context.selection;
        var selectedCount = selectedLayers.length;

        if (selectedLayers && selectedLayers.length > 0) {
          var l = selectedLayers[0]; //// Example getting parent of selected layer:
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

        var parent = null; //// Another parent example:
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

        if (!parent) {
          var ddoc = SketchAPI.Document.getSelectedDocument();
          parent = ddoc.selectedPage;
        } // const g = new SketchAPI.Group({
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


        var svgCode = _svgData;
        var svgString = NSString.stringWithString(svgCode);

        var _svgData = svgString.dataUsingEncoding(NSUTF8StringEncoding);

        var svgImporter = MSSVGImporter.svgImporter();
        svgImporter.prepareToImportFromData(_svgData);
        var svgLayer = svgImporter.importAsLayer();
        svgLayer.setName('PixelCycle.ai Image'); // const d = SketchAPI.fromNative(context.document)
        // l.addLayers([svgLayer])

        parent.sketchObject.addLayers([svgLayer]); // context.document.addLayers([svgLayer])
        // MSMaskWithShape.createMaskWithShapeForLayers(group)
        // context.document.currentPage().addLayers([svgLayer]);

        context.document.showMessage("🎉 SVG inserted!");
      }

      if (request == 'setSetting') {
        var requestData = JSON.parse(decodeURI(windowObject.valueForKey("PixelCycleData")));
        Settings.setSettingForKey(requestData.key, requestData.value);
      }

      if (request == 'getSetting') {
        var _requestData = JSON.parse(decodeURI(windowObject.valueForKey("PixelCycleData")));

        var setting = Settings.settingForKey(_requestData.key);

        if (setting) {
          windowObject.evaluateWebScript("passData('got_setting', '{\"key\": \"".concat(_requestData.key, "\", \"value\": \"").concat(setting, "\"}');"));
        }
      }

      windowObject.evaluateWebScript("window.location.hash = '';");
    }
  });
  webView.setFrameLoadDelegate_(delegate.getClassInstance());
  var closeButton = Panel.standardWindowButton(NSWindowCloseButton);
  closeButton.setCOSJSTargetFunction(function (sender) {
    // threadDictionary.removeObjectForKey(identifier)
    if (floatWindow) {
      COScript.currentCOScript().setShouldKeepAround_(false);
      Panel.close(); // Develop mode? kill the script
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
  titlebarContainerView.superview().setBackgroundColor(titleBgColor); // NSApp.runModalForWindow(Panel);

  if (floatWindow) {
    Panel.center();
    Panel.makeKeyAndOrderFront(nil);
  } else {
    NSApp.runModalForWindow(Panel);
  } // const selectedLayers = context.selection
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

});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=pattern-fill.js.map