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

var _generating = __webpack_require__(337);

var _generating2 = _interopRequireDefault(_generating);

var _LoveRecorder = __webpack_require__(336);

var _LoveRecorder2 = _interopRequireDefault(_LoveRecorder);

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
    this.recording2 = new _recording2.default('.recording2');
    this.generating = new _generating2.default('.generating');

    // this.loading.hide();
    // this.top.hide();
    // this.recording1.show();

    this.loveRecorder = new _LoveRecorder2.default();
    this.introduction.setRecorder(this.loveRecorder);

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

      this.recording1.on('startRecording', function () {
        _this.loveRecorder.startRecording();
      }).on('stopRecording', function () {
        _this.loveRecorder.stopRecording();
      }).on('hidden', function () {
        _this.recording2.show();
      });

      this.recording2.on('hidden', function () {
        _this.generating.show();
      });

      this.loveRecorder.on('getData', function () {
        _this.recording1.drawGraph(_this.loveRecorder);
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

var _events2 = __webpack_require__(50);

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

var _events2 = __webpack_require__(50);

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

var _events2 = __webpack_require__(50);

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
    key: 'setRecorder',
    value: function setRecorder(recorder) {
      this.recorder = recorder;
    }
  }, {
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      this.$button.addEventListener('click', function (e) {
        e.preventDefault();
        _this2.hide();
        _this2.recorder.initialize();
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

var _events2 = __webpack_require__(50);

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
    _this.$record = _this.$.querySelector('.recording__button');
    _this.$next = _this.$.querySelector('.recording__next');

    _this.canvas = document.getElementById("cvs");
    _this.context = _this.canvas.getContext("2d");

    _this.isRecording = false;
    _this.isRendering = true;

    _this.bufsize = 1024;
    _this.frequency = new Uint8Array(_this.bufsize);
    _this.noise = new Uint8Array(_this.bufsize);
    _this.frequencys = [];
    _this.domain = new Uint8Array(_this.bufsize);

    _this.initialize();
    _this.bind();
    return _this;
  }

  _createClass(Recording, [{
    key: 'initialize',
    value: function initialize() {
      for (var i = 0; i < this.bufsize; i++) {
        this.noise[i] = 0.0;
      }
    }
  }, {
    key: 'upDateFilter',
    value: function upDateFilter() {
      if (!this.filter) return;

      console.log('U', this.filter);

      this.filter.type = ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"][document.getElementById("filter").selectedIndex];

      document.getElementById("freq").min = this.filter.frequency.minValue;
      document.getElementById("freq").max = this.filter.frequency.maxValue;
      document.getElementById("q").min = this.filter.frequency.minValue;
      document.getElementById("q").max = this.filter.frequency.maxValue;
      document.getElementById("gain").min = this.filter.frequency.minValue;
      document.getElementById("gain").max = this.filter.frequency.maxValue;

      this.filter.frequency.value = document.getElementById("freqlabel").innerHTML = parseFloat(document.getElementById("freq").value);
      this.filter.Q.value = document.getElementById("qlabel").innerHTML = parseFloat(document.getElementById("q").value);
      this.filter.gain.value = document.getElementById("gainlabel").innerHTML = parseFloat(document.getElementById("gain").value);
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
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      this.$record.addEventListener('click', function (e) {

        if (_this2.isRecording) {
          _this2.stop();
        } else {
          _this2.record();
          _this2.startCountDown();
        }
      });

      this.$next.addEventListener('click', function () {
        _this2.hide();
      });

      document.querySelector('#filter').addEventListener('change', function () {
        _this2.upDateFilter();
      });
      document.querySelector('#freq').addEventListener('change', function () {
        _this2.upDateFilter();
      });
      document.querySelector('#q').addEventListener('change', function () {
        _this2.upDateFilter();
      });
      document.querySelector('#gain').addEventListener('change', function () {
        _this2.upDateFilter();
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this3 = this;

      this.emit('hide');

      (0, _velocityAnimate2.default)(this.$p, {
        translateY: -100,
        opacity: 0
      }, {
        queue: false,
        duration: 800,
        easing: 'easeInQuart',
        complete: function complete() {}
      });

      (0, _velocityAnimate2.default)(this.$next, {
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
  }, {
    key: 'changeToNext',
    value: function changeToNext() {

      (0, _velocityAnimate2.default)(this.$record, {
        translateX: ['-50%', '-50%'],
        opacity: 0
      }, {
        display: 'none',
        duration: 400
      });

      (0, _velocityAnimate2.default)(this.$next, {
        opacity: [1, 0]
      }, {
        display: 'block',
        delay: 400,
        duration: 1000
      });
    }
  }, {
    key: 'record',
    value: function record() {
      var _this4 = this;

      this.timer = setInterval(function () {
        _this4.drawGraph();
      }, 1000 / 60);

      navigator.getUserMedia({ video: false, audio: true }, function (stream) {
        console.log("stream" + stream);

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        _this4.audioContext = new AudioContext();
        _this4.sampleRate = _this4.audioContext.sampleRate;

        _this4.filter = _this4.audioContext.createBiquadFilter();
        _this4.filter.type = 0;
        _this4.filter.frequency.value = 20000;

        _this4.analyser = _this4.audioContext.createAnalyser();
        _this4.analyser.fftSize = _this4.bufsize;
        _this4.analyser.smoothingTimeContant = 0.1;

        _this4.stream = stream;
        _this4.input = _this4.audioContext.createMediaStreamSource(stream);
        _this4.input.connect(_this4.filter);
        _this4.filter.connect(_this4.analyser);

        //this.input.connect(this.analyser);
      }, function (e) {
        console.log("No live audio input in this browser: " + e);
      });
    }
  }, {
    key: 'startCountDown',
    value: function startCountDown() {
      var _this5 = this;

      var count = 3;
      this.isCalibrating = true;
      this.isRendering = true;

      clearInterval(this.interval);
      this.interval = setInterval(function () {
        count--;
        if (count === 0) {
          clearInterval(_this5.interval);
          _this5.$record.innerText = '愛してる';

          _this5.calculateNoise();
          _this5.isCalibrating = false;
          _this5.isRecording = true;
        } else {
          _this5.$record.innerText = count;
        }
      }, 1000);
      this.$record.innerText = count;

      setTimeout(function () {
        if (_this5.isRecording) {
          //this.stop();
        }
      }, 6000);
    }
  }, {
    key: 'stop',
    value: function stop() {

      this.isRecording = false;
      clearInterval(this.timer);
      //this.stream.getAudioTracks()[0].stop();
      this.changeToNext();
    }
  }, {
    key: 'drawGraph',
    value: function drawGraph() {

      var width = 1024;
      var height = 512;

      if (this.isRendering) {

        this.analyze();

        this.context.fillStyle = "#fff";
        this.context.fillRect(0, 0, width, height);

        this.context.fillStyle = "#009900";

        for (var i = 0; i < 512; ++i) {
          var y = (this.frequency[i] - this.noise[i]) * 2;
          this.context.fillRect(i * 2, height - y, 2, y);
        }

        this.context.fillStyle = "#99044f";
        for (var _i = 0; _i < 512; ++_i) {
          var _y = this.domain[_i] * 2 - height / 2;
          this.context.fillRect(_i * 2, height / 2, 2, _y);
        }
      }

      if (this.isCalibrating) {
        this.addFrequency();
      }
    }
  }, {
    key: 'addFrequency',
    value: function addFrequency() {
      var copyData = new Uint8Array(this.frequency.length);
      copyData.set(this.frequency);
      this.frequencys.push(copyData);
    }
  }, {
    key: 'calculateNoise',
    value: function calculateNoise() {

      var sum = new Float32Array(this.bufsize);

      for (var i = 0; i < this.bufsize; i++) {
        sum[i] = 0;
      }

      var count = 0;
      Array.from(this.frequencys, function (frequency) {
        if (frequency[0] > -150) {
          count++;
          for (var _i2 = 0; _i2 < frequency.length; _i2++) {
            sum[_i2] += frequency[_i2];
          }
        }
      });

      for (var _i3 = 0; _i3 < this.noise.length; _i3++) {
        this.noise[_i3] = sum[_i3] / count;
      }
    }
  }, {
    key: 'analyze',
    value: function analyze() {
      this.analyser.getByteFrequencyData(this.frequency);
      this.analyser.getByteTimeDomainData(this.domain);
    }
  }, {
    key: 'reset',
    value: function reset() {}
  }]);

  return Recording;
}(_events3.default);

exports.default = Recording;

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events2 = __webpack_require__(50);

var _events3 = _interopRequireDefault(_events2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoveRecorder = function (_events) {
  _inherits(LoveRecorder, _events);

  function LoveRecorder() {
    _classCallCheck(this, LoveRecorder);

    var _this = _possibleConstructorReturn(this, (LoveRecorder.__proto__ || Object.getPrototypeOf(LoveRecorder)).call(this));

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    _this.audioContext = new AudioContext();
    _this.sampleRate = _this.audioContext.sampleRate;

    _this.fftSize = 2048;

    _this.analyser = _this.audioContext.createAnalyser();
    _this.analyser.fftSize = 1024; //this.fftSize;
    _this.analyser.smoothingTimeContant = 0.9;

    // this.analyser2 = this.audioContext.createAnalyser();
    // this.analyser2.fftSize = this.fftSize;
    // this.analyser2.smoothingTimeContant = 0.9;

    _this.bufsize = 1024; //this.analyser.frequencyBinCount;

    _this.frequency = new Float32Array(_this.bufsize);
    _this.domain = new Uint8Array(_this.bufsize);

    _this.frequencys = [];
    _this.domains = [];
    _this.averages = [];

    return _this;
  }

  _createClass(LoveRecorder, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      console.log('LoveRecorder::initialize', this);

      navigator.getUserMedia({ video: false, audio: true }, function (stream) {
        console.log('LoveRecorder::initialized', _this2);

        _this2.stream = stream;
        _this2.audioTrack = stream.getAudioTracks()[0];

        _this2.input = _this2.audioContext.createMediaStreamSource(stream);
        _this2.input.connect(_this2.analyser);
        //this.analyser.connect(this.analyser2);

        // this.input.connect(this.filter);
        // this.filter.connect(this.analyser);
      }, function (e) {
        console.log("No live audio input in this browser: " + e);
      });
    }
  }, {
    key: 'startRecording',
    value: function startRecording() {
      console.log('LoveRecorder::startRecording', this);

      this.isRecording = true;
      this.startAnalyze();
    }
  }, {
    key: 'stopRecording',
    value: function stopRecording() {
      console.log('LoveRecorder::stopRecording', this);
      this.isRecording = false;
      clearInterval(this.timer);
      //this.audioTrack.stop();
    }
  }, {
    key: 'startAnalyze',
    value: function startAnalyze() {
      var _this3 = this;

      console.log('LoveRecorder::startAnalyze', this);

      this.timer = setInterval(function () {
        if (_this3.isRecording) {
          _this3.analyze();
        }
      }, 1000 / 60);
    }
  }, {
    key: 'analyze',
    value: function analyze() {

      this.analyser.getFloatFrequencyData(this.frequency);
      this.analyser.getByteTimeDomainData(this.domain);

      console.log(this.frequency, this.domain);

      if (this.isRecording && this.domain[0] > -1000) {

        console.log(this.frequency);
        var sum = 0;

        var copyData = new Float32Array(this.frequency.length / 8);
        copyData.set(this.frequency.subarray(0, this.frequency.length / 8));
        this.frequencys.push(copyData);

        var copyData2 = new Uint8Array(this.domain.length / 8);
        copyData2.set(this.domain.subarray(0, this.domain.length / 8));
        this.domains.push(copyData2);

        for (var i = 0; i < this.domain.length; i++) {
          sum += this.domain[i];
        }
        this.averages.push(sum / this.domain.length);

        this.emit('getData', this);
      }
    }
  }, {
    key: 'reset',
    value: function reset() {}
  }]);

  return LoveRecorder;
}(_events3.default);

exports.default = LoveRecorder;

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events2 = __webpack_require__(50);

var _events3 = _interopRequireDefault(_events2);

var _velocityAnimate = __webpack_require__(49);

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Generating = function (_events) {
  _inherits(Generating, _events);

  function Generating(selector) {
    _classCallCheck(this, Generating);

    var _this = _possibleConstructorReturn(this, (Generating.__proto__ || Object.getPrototypeOf(Generating)).call(this));

    _this.$ = document.querySelector(selector);

    _this.$first = _this.$.querySelector('.generating__first');
    _this.$second = _this.$.querySelector('.generating__second');

    _this.initialize();
    return _this;
  }

  _createClass(Generating, [{
    key: 'initialize',
    value: function initialize() {}
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      (0, _velocityAnimate2.default)(this.$, {
        opacity: [1, 0]
      }, {
        queue: false,
        display: 'block',
        duration: 800
      });

      setTimeout(function () {
        _this2.changeText();
      }, 3000);

      setTimeout(function () {
        _this2.hide();
      }, 6000);
    }
  }, {
    key: 'changeText',
    value: function changeText() {
      (0, _velocityAnimate2.default)(this.$first, {
        opacity: 0
      }, {
        queue: false,
        display: 'none',
        duration: 800
      });
      (0, _velocityAnimate2.default)(this.$second, {
        opacity: 1
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

      (0, _velocityAnimate2.default)(this.$, {
        opacity: 0
      }, {
        queue: false,
        display: 'none',
        duration: 800,
        complete: function complete() {
          _this3.$.style.display = 'none';
          _this3.emit('hidden');
        }
      });
    }
  }]);

  return Generating;
}(_events3.default);

exports.default = Generating;

/***/ }),

/***/ 50:
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