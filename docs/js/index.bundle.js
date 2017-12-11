webpackJsonp([0],{

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(331);


/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loading = __webpack_require__(332);

var _loading2 = _interopRequireDefault(_loading);

var _top = __webpack_require__(333);

var _top2 = _interopRequireDefault(_top);

var _introduction = __webpack_require__(334);

var _introduction2 = _interopRequireDefault(_introduction);

var _recording = __webpack_require__(335);

var _recording2 = _interopRequireDefault(_recording);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Main Script
 */
var Index = function () {
  function Index() {
    _classCallCheck(this, Index);

    this.loading = new _loading2.default('.loading');
    this.top = new _top2.default('.top');
    this.introduction = new _introduction2.default('.introduction');
    this.recording1 = new _recording2.default('.recording1');

    this.loading.hide();
    this.recording1.show();

    window.addEventListener('load', function () {});

    this.bind();
  }

  _createClass(Index, [{
    key: 'bind',
    value: function bind() {
      var _this = this;

      this.loading.on('hidden', function () {
        _this.top.show();
      });

      this.top.on('hidden', function () {
        _this.introduction.show();
      });

      this.introduction.on('hidden', function () {
        _this.recording1.show();
      });
    }
  }]);

  return Index;
}();

window.INDEX = new Index();

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events2 = __webpack_require__(64);

var _events3 = _interopRequireDefault(_events2);

var _velocityAnimate = __webpack_require__(49);

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loading = function (_events) {
  _inherits(Loading, _events);

  function Loading(selector) {
    _classCallCheck(this, Loading);

    var _this = _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this));

    _this.$ = document.querySelector(selector);
    _this.$h2 = _this.$.querySelector('h2');
    _this.$gauge = _this.$.querySelector('.loading__gauge');
    //this.$loading = this.$.querySelector('p');
    _this.$progress = _this.$.querySelector('progress');

    _this.initialize();
    return _this;
  }

  _createClass(Loading, [{
    key: 'initialize',
    value: function initialize() {
      this.start();
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      (0, _velocityAnimate2.default)(this.$progress, {
        tween: [100, 0]
      }, {
        duration: 1000,
        progress: function progress(a, b, c, d, e) {
          var tween = e;
          _this2.$progress.setAttribute('value', e);
        },
        complete: function complete() {
          _this2.emit('loaded');
          _this2.hide();
        }
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      this.emit('hide');

      (0, _velocityAnimate2.default)(this.$h2, {
        translateY: -100,
        opacity: 0
      }, {
        queue: false,
        duration: 800,
        easing: 'easeInQuart',
        complete: function complete() {}
      });

      (0, _velocityAnimate2.default)(this.$gauge, {
        translateY: 100,
        opacity: 0
      }, {
        queue: false,
        duration: 800,
        easing: 'easeInQuart',
        complete: function complete() {
          _this3.$.style.display = 'none';
          _this3.emit('hidden');
        }
      });
    }
  }]);

  return Loading;
}(_events3.default);

exports.default = Loading;

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events2 = __webpack_require__(64);

var _events3 = _interopRequireDefault(_events2);

var _velocityAnimate = __webpack_require__(49);

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Top = function (_events) {
  _inherits(Top, _events);

  function Top(selector) {
    _classCallCheck(this, Top);

    var _this = _possibleConstructorReturn(this, (Top.__proto__ || Object.getPrototypeOf(Top)).call(this));

    _this.$ = document.querySelector(selector);
    _this.$h2 = _this.$.querySelector('h2');
    _this.$start = _this.$.querySelector('.top__start');
    _this.$button = _this.$.querySelector('.top__startButton');
    _this.$footer = _this.$.querySelector('.top__footer');

    _this.initialize();
    _this.bind();
    return _this;
  }

  _createClass(Top, [{
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      this.$button.addEventListener('click', function (e) {
        console.log('click');
        e.preventDefault();
        _this2.hide();
      });
    }
  }, {
    key: 'show',
    value: function show() {

      (0, _velocityAnimate2.default)(this.$, {
        opacity: [1, 0]
      }, {
        queue: false,
        display: 'block',
        duration: 800
      });

      (0, _velocityAnimate2.default)(this.$footer, {
        translateY: [0, 60]
      }, {
        queue: false,
        display: 'block',
        duration: 800,
        easing: [250, 30]
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      this.emit('hide');

      (0, _velocityAnimate2.default)(this.$h2, {
        translateY: -100,
        opacity: 0
      }, {
        queue: false,
        duration: 800,
        easing: 'easeInQuart',
        complete: function complete() {}
      });

      (0, _velocityAnimate2.default)(this.$start, {
        translateY: 100,
        opacity: 0
      }, {
        queue: false,
        duration: 800,
        easing: 'easeInQuart',
        complete: function complete() {}
      });

      (0, _velocityAnimate2.default)(this.$footer, {
        translateY: 60,
        opacity: 0
      }, {
        queue: false,
        duration: 800,
        easing: 'easeInQuart',
        complete: function complete() {
          _this3.$.style.display = 'none';
          _this3.emit('hidden');
        }
      });
    }
  }]);

  return Top;
}(_events3.default);

exports.default = Top;

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events2 = __webpack_require__(64);

var _events3 = _interopRequireDefault(_events2);

var _velocityAnimate = __webpack_require__(49);

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Introduction = function (_events) {
  _inherits(Introduction, _events);

  function Introduction(selector) {
    _classCallCheck(this, Introduction);

    var _this = _possibleConstructorReturn(this, (Introduction.__proto__ || Object.getPrototypeOf(Introduction)).call(this));

    _this.$ = document.querySelector(selector);
    _this.$h3 = _this.$.querySelector('h3');
    _this.$p = _this.$.querySelectorAll('p');
    _this.$button = _this.$.querySelector('.introduction__button');

    _this.initialize();
    _this.bind();
    return _this;
  }

  _createClass(Introduction, [{
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      this.$button.addEventListener('click', function (e) {
        console.log('click');
        e.preventDefault();
        _this2.hide();
      });
    }
  }, {
    key: 'show',
    value: function show() {

      (0, _velocityAnimate2.default)(this.$, {
        opacity: [1, 0]
      }, {
        queue: false,
        display: 'block',
        duration: 800
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      this.emit('hide');

      (0, _velocityAnimate2.default)(this.$h3, {
        translateY: -100,
        opacity: 0
      }, {
        queue: false,
        duration: 800,
        easing: 'easeInQuart',
        complete: function complete() {}
      });

      (0, _velocityAnimate2.default)(this.$p, {
        translateY: -100,
        opacity: 0
      }, {
        queue: false,
        duration: 800,
        easing: 'easeInQuart',
        complete: function complete() {}
      });

      (0, _velocityAnimate2.default)(this.$button, {
        translateY: 100,
        opacity: 0
      }, {
        queue: false,
        duration: 800,
        easing: 'easeInQuart',
        complete: function complete() {
          _this3.$.style.display = 'none';
          _this3.emit('hidden');
        }
      });
    }
  }]);

  return Introduction;
}(_events3.default);

exports.default = Introduction;

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events2 = __webpack_require__(64);

var _events3 = _interopRequireDefault(_events2);

var _velocityAnimate = __webpack_require__(49);

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recording = function (_events) {
  _inherits(Recording, _events);

  function Recording(selector) {
    _classCallCheck(this, Recording);

    var _this = _possibleConstructorReturn(this, (Recording.__proto__ || Object.getPrototypeOf(Recording)).call(this));

    _this.$ = document.querySelector(selector);
    _this.$p = _this.$.querySelector('p');
    _this.$a = _this.$.querySelector('a');

    _this.bind();
    return _this;
  }

  _createClass(Recording, [{
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'show',
    value: function show() {
      (0, _velocityAnimate2.default)(this.$, {
        opacity: [1, 0]
      }, {
        queue: false,
        display: 'block',
        duration: 800
      });
    }
  }, {
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      this.$a.addEventListener('click', function (e) {
        _this2.record();
      });
    }
  }, {
    key: 'record',
    value: function record() {
      var _this3 = this;

      console.log('record');

      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.sampleRate = this.audioContext.sampleRate;

      this.filter = this.audioContext.createBiquadFilter();
      this.filter.type = 0;
      this.filter.frequency.value = 20000;
      this.bufsize = 1024;
      this.data = new Float32Array(this.bufsize);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.bufsize;
      this.analyser.smoothingTimeContant = 0.9;

      this.recorder = new Recorder(this.filter, { workerPath: 'js/recorderjs/recorderWorker.js' });

      setInterval(function () {
        _this3.drawGraph();
      }, 1000 / 4);
      // setTimeout(() => {
      //   this.drawGraph();
      // }, 3000);

      navigator.getUserMedia({ video: false, audio: true }, function (stream) {
        console.log("stream" + stream);
        _this3.input = _this3.audioContext.createMediaStreamSource(stream);
        //input.connect(analyser);
        _this3.input.connect(_this3.filter);
        _this3.filter.connect(_this3.analyser);
        _this3.analyser.connect(_this3.audioContext.destination);
        _this3.recorder && _this3.recorder.record();
      }, function (e) {
        console.log("No live audio input in this browser: " + e);
      });
    }
  }, {
    key: 'drawGraph',
    value: function drawGraph() {
      console.log(this.data);
    }
  }, {
    key: 'reset',
    value: function reset() {}
  }]);

  return Recording;
}(_events3.default);

exports.default = Recording;

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ })

},[330]);
//# sourceMappingURL=index.bundle.js.map