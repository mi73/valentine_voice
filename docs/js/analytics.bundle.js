webpackJsonp([1],{

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(339);


/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = __webpack_require__(127);

var _jquery2 = _interopRequireDefault(_jquery);

var _lodash = __webpack_require__(340);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PATH = '/sound/';

/**
 * Main Script
 */

var Index = function () {
  function Index() {
    _classCallCheck(this, Index);

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();

    this.$man = document.querySelector('#man');
    this.$woman = document.querySelector('#woman');
    this.$playMan = document.querySelector('#playMan');
    this.$playWoman = document.querySelector('#playWoman');
    this.$analysis = document.querySelector('#analysis');
    this.$allAnalysis = document.querySelector('#allAnalysis');
    this.wave = document.querySelector('.wave');
    this.waveContext = this.wave.getContext("2d");
    this.canvas = document.getElementById("cvs");
    this.context = this.canvas.getContext("2d");

    this.$mPeak = document.querySelector('.mPeak');
    this.$wPeak = document.querySelector('.wPeak');
    this.$mLength = document.querySelector('.mLength');
    this.$wLength = document.querySelector('.wLength');
    this.$similarity = document.querySelector('.similarity');

    this.bufsize = 1024;

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = this.bufsize;
    this.analyser.smoothingTimeContant = 0;

    this.frequency = new Uint8Array(this.bufsize);
    this.noise = new Uint8Array(this.bufsize);
    this.wFrequencys = [];
    this.mFrequencys = [];
    this.domain = new Uint8Array(this.bufsize);
    this.wDomains = [];
    this.mDomains = [];
    this.wGraph = [];
    this.mGraph = [];
    this.mGraphs = {};
    this.wGraphs = {};

    this.log = '';

    this.bind();
    this.mode = 'man';

    // this.timer = setInterval(() => {
    //   this.drawGraph();
    // }, 1000 / 60);
  }

  _createClass(Index, [{
    key: 'bind',
    value: function bind() {
      var _this = this;

      this.$playMan.addEventListener('click', function () {
        _this.playMan();
      });
      this.$playWoman.addEventListener('click', function () {
        _this.playWoman();
      });
      this.$analysis.addEventListener('click', function () {
        _this.analysis();
      });
      this.$allAnalysis.addEventListener('click', function () {
        _this.analysisAll();
      });
    }
  }, {
    key: 'playMan',
    value: function playMan() {
      var _this2 = this;

      var url = '' + PATH + this.$man.value;
      this.mode = 'man';
      this.mFrequencys = [];
      this.mDomains = [];
      this.getAudioBuffer(url, function (buffer) {
        _this2.playSound(buffer);
      });
    }
  }, {
    key: 'playWoman',
    value: function playWoman() {
      var _this3 = this;

      var url = '' + PATH + this.$woman.value;
      this.mode = 'woman';
      this.wFrequencys = [];
      this.wDomains = [];
      this.getAudioBuffer(url, function (buffer) {
        _this3.playSound(buffer);
      });
    }
  }, {
    key: 'getAudioBuffer',
    value: function getAudioBuffer(url, callback) {
      var _this4 = this;

      var req = new XMLHttpRequest();
      req.responseType = 'arraybuffer';
      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status === 0 || req.status === 200) {
            _this4.audioContext.decodeAudioData(req.response, function (buffer) {
              _this4.buffer = buffer;
              callback(buffer);
            });
          }
        }
      };

      req.open('GET', url, true);
      req.send('');
    }
  }, {
    key: 'playSound',
    value: function playSound(buffer) {
      var source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      source.start(0);
      this.playAnalysis();
    }
  }, {
    key: 'playAnalysis',
    value: function playAnalysis() {
      var _this5 = this;

      var isRecording = true;
      setTimeout(function () {
        isRecording = false;
      }, 3000);

      var frame = function frame() {
        if (isRecording) {
          requestAnimationFrame(frame);

          _this5.analyser.getByteFrequencyData(_this5.frequency);
          _this5.analyser.getByteTimeDomainData(_this5.domain);

          if (_this5.frequency[10] > 0) {
            var copyData = new Uint8Array(_this5.frequency.length);
            copyData.set(_this5.frequency);
            if (_this5.mode === 'man') _this5.mFrequencys.push(copyData);else _this5.wFrequencys.push(copyData);

            var copyData2 = new Uint8Array(_this5.domain.length);
            copyData2.set(_this5.domain);
            if (_this5.mode === 'man') _this5.mDomains.push(copyData2);else _this5.wDomains.push(copyData2);
          }
          _this5.drawWave();
        }
      };

      frame();
    }
  }, {
    key: 'drawWave',
    value: function drawWave() {

      this.waveContext.globalCompositeOperation = 'lighter';

      // this.waveContext.shadowBlur = 20;
      // this.waveContext.shadowOffsetX = 0;
      // this.waveContext.shadowOffsetY = 0;
      this.mGraph = [];
      this.wGraph = [];

      this.waveContext.clearRect(0, 0, 640, 400);

      this.waveContext.fillStyle = "#ff00fc";
      //this.waveContext.shadowColor = "#ff00fc";

      for (var i = 0; i < this.wFrequencys.length; i++) {
        var sum = 0;
        for (var j = 0; j < this.wFrequencys[i].length; j++) {
          sum += this.wFrequencys[i][j];
        }
        var average = sum / this.wFrequencys[i].length * 2;
        this.waveContext.fillRect(51 + 3 * i, 200, 1, average);
        this.waveContext.fillRect(51 + 3 * i, 200, 1, -average);
        this.wGraph.push(average);
      }

      this.waveContext.fillStyle = "#00bafd";
      //this.waveContext.shadowColor = "#00bafd";

      for (var _i = 0; _i < this.mFrequencys.length; _i++) {
        var _sum = 0;
        for (var _j = 0; _j < this.mFrequencys[_i].length; _j++) {
          _sum += this.mFrequencys[_i][_j];
        }
        var _average = _sum / this.mFrequencys[_i].length * 2;
        this.waveContext.fillRect(50 + 3 * _i, 200, 1, _average);
        this.waveContext.fillRect(50 + 3 * _i, 200, 1, -_average);
        this.mGraph.push(_average);
      }
    }
  }, {
    key: 'drawGraph',
    value: function drawGraph() {

      var width = 1024;
      var height = 512;

      this.context.fillStyle = "#fff";
      this.context.fillRect(0, 0, width, height);

      this.context.fillStyle = "#009900";

      for (var i = 0; i < 512; ++i) {
        var y = (this.frequency[i] - this.noise[i]) * 2;
        this.context.fillRect(i * 2, height - y, 2, y);
      }

      this.context.fillStyle = "#99044f";
      for (var _i2 = 0; _i2 < 512; ++_i2) {
        var _y = this.domain[_i2] * 2 - height / 2;
        this.context.fillRect(_i2 * 2, height / 2, 2, _y);
      }
    }
  }, {
    key: 'analysis',
    value: function analysis() {

      var mPeak = Index.getPeak(this.mGraph);
      var wPeak = Index.getPeak(this.wGraph);
      var mLength = Index.getHalfMaximumFrames(this.mGraph);
      var wLength = Index.getHalfMaximumFrames(this.wGraph);
      var similarity = Index.getSimilarity(this.mGraph, this.wGraph);

      this.$mPeak.innerText = mPeak;
      this.$wPeak.innerText = wPeak;
      this.$mLength.innerText = mLength;
      this.$wLength.innerText = wLength;
      this.$similarity.innerText = similarity;

      //console.log(`${this.$man.value},${this.$woman.value},${mPeak},${wPeak},${mLength},${wLength},${similarity}`);
      //this.log += `${this.$man.value},${this.$woman.value},${mPeak},${wPeak},${mLength},${wLength},${similarity}\n`;

      this.mGraphs[this.$man.value] = this.mGraph;
      this.wGraphs[this.$woman.value] = this.wGraph;
    }
  }, {
    key: 'lastAnalysis',
    value: function lastAnalysis() {
      var _this6 = this;

      _lodash2.default.each(this.mGraphs, function (mGraph, mValue) {
        _lodash2.default.each(_this6.wGraphs, function (wGraph, wValue) {
          var mPeak = Index.getPeak(mGraph);
          var wPeak = Index.getPeak(wGraph);
          var mLength = Index.getHalfMaximumFrames(mGraph);
          var wLength = Index.getHalfMaximumFrames(wGraph);
          var similarity = Index.getSimilarity(mGraph, wGraph);

          console.log(mValue + ',' + wValue + ',' + mPeak + ',' + wPeak + ',' + mLength + ',' + wLength + ',' + similarity);
          _this6.log += mValue + ',' + wValue + ',' + mPeak + ',' + wPeak + ',' + mLength + ',' + wLength + ',' + similarity + '\n';
        });
      });
    }
  }, {
    key: 'playAll',
    value: function playAll() {
      var _this7 = this;

      var mLength = this.$man.querySelectorAll('option').length;
      var wLength = this.$woman.querySelectorAll('option').length;
      var mIndex = 0;
      var wIndex = 0;
      var mode = 'm';

      //this.playWoman();

      var mGraphs = {};
      var wGraphs = {};

      var analysis = function analysis() {
        document.querySelector('#man option:nth-child(' + (mIndex + 1) + ')').selected = true;
        document.querySelector('#woman option:nth-child(' + (wIndex + 1) + ')').selected = true;

        if (mode === 'm') {
          _this7.playMan();

          _lodash2.default.delay(function () {
            _this7.analysis();

            mIndex++;

            if (mIndex === mLength) {
              mode = 'w';
              mIndex--;
            }
            analysis();
          }, 5000);
        } else {
          _this7.playWoman();

          _lodash2.default.delay(function () {
            _this7.analysis();

            wIndex++;

            if (wIndex === wLength) {
              _this7.lastAnalysis();
            } else {
              analysis();
            }
          }, 5000);
        }
      };

      analysis();
    }
  }, {
    key: 'analysisAll',
    value: function analysisAll() {
      var _this8 = this;

      var mLength = this.$man.querySelectorAll('option').length;
      var wLength = this.$woman.querySelectorAll('option').length;
      var mIndex = 0;
      var wIndex = 0;

      this.playWoman();

      var mGraphs = {};
      var wGraphs = {};

      var analysis = function analysis() {
        document.querySelector('#man option:nth-child(' + (mIndex + 1) + ')').selected = true;
        document.querySelector('#woman option:nth-child(' + (wIndex + 1) + ')').selected = true;

        if (mIndex === 0) {
          _this8.playWoman();

          _lodash2.default.delay(function () {
            _this8.playMan();
          }, 5000);

          _lodash2.default.delay(function () {
            _this8.analysis();

            mIndex++;
            if (mIndex === mLength) {
              mIndex = 0;
              wIndex++;
            }

            if (wIndex !== wLength) {
              analysis();
            } else {
              console.log(_this8.log);
            }
          }, 10000);
        } else {
          _this8.playMan();

          _lodash2.default.delay(function () {
            _this8.analysis();

            mIndex++;
            if (mIndex === mLength) {
              mIndex = 0;
              wIndex++;
            }

            if (wIndex !== wLength) {
              analysis();
            } else {
              console.log(_this8.log);
            }
          }, 5000);
        }
      };

      analysis();
    }
  }], [{
    key: 'getPeak',
    value: function getPeak(graph) {
      return _lodash2.default.max(graph);
    }
  }, {
    key: 'getHalfMaximumFrames',
    value: function getHalfMaximumFrames(graph) {
      var count = 0;
      var max = _lodash2.default.max(graph);
      _lodash2.default.each(graph, function (value) {
        if (value > max / 2) count++;
      });
      return count;
    }
  }, {
    key: 'getSimilarity',
    value: function getSimilarity(graph1, graph2) {
      var sum = 0;
      for (var i = 0; i < 180; i++) {
        var value1 = i < graph1.length ? graph1[i] : 0;
        var value2 = i < graph2.length ? graph2[i] : 0;
        sum += Math.pow(value1 - value2, 2);
      }

      return Math.sqrt(sum);
    }
  }]);

  return Index;
}();

window.INDEX = new Index();

/***/ })

},[338]);
//# sourceMappingURL=analytics.bundle.js.map