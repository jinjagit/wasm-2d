(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const rust = __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../pkg/wasm_3d */ \"../pkg/wasm_3d.js\"));\nconst canvas = document.getElementById('rustCanvas');\nconst gl = canvas.getContext('webgl', {antialias: true});\n\nrust.then(m => {\n    if (!gl) {\n        alert('Failed to initialize WebGl');\n        return;\n    }\n\n    const FPS_THROTTLE = 1000.0 / 30.0; // ms / frames\n    const rustClient = new m.RustClient();\n    const initialTime = Date.now();\n    let lastDrawTime = -1;// In milliseconds\n\n    function render() {\n        window.requestAnimationFrame(render);\n        const currentTime = Date.now();\n\n        if (currentTime >= lastDrawTime + FPS_THROTTLE) {\n            lastDrawTime = currentTime;\n\n            if (window.innerHeight !== canvas.height || window.innerWidth !== canvas.width) {\n                canvas.height = window.innerHeight;\n                canvas.clientHeight = window.innerHeight;\n                canvas.style.height = window.innerHeight;\n\n                canvas.width = window.innerWidth;\n                canvas.clientWidth = window.innerWidth;\n                canvas.style.width = window.innerWidth;\n\n                gl.viewport(0, 0, window.innerWidth, window.innerHeight);\n            }\n            let elapsedTime = currentTime - initialTime;\n            rustClient.update(elapsedTime, window.innerHeight, window.innerWidth);\n            rustClient.render();\n        }\n\n    }\n\n    render();\n});\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

}]);