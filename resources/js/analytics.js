import $ from 'jquery'
import _ from 'lodash'

const PATH = '/sound/';

/**
 * Main Script
 */
class Index {
  constructor() {

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

  bind() {
    this.$playMan.addEventListener('click', () => {
      this.playMan();
    });
    this.$playWoman.addEventListener('click', () => {
      this.playWoman();
    });
    this.$analysis.addEventListener('click', () => {
      this.analysis();
    });
    this.$allAnalysis.addEventListener('click', () => {
      this.analysisAll();
    });
  }

  playMan() {
    const url = `${PATH}${this.$man.value}`;
    this.mode = 'man';
    this.mFrequencys = [];
    this.mDomains = [];
    this.getAudioBuffer(url, (buffer) => {
      this.playSound(buffer);
    });
  }

  playWoman() {
    const url = `${PATH}${this.$woman.value}`;
    this.mode = 'woman';
    this.wFrequencys = [];
    this.wDomains = [];
    this.getAudioBuffer(url, (buffer) => {
      this.playSound(buffer);
    });
  }

  getAudioBuffer(url, callback) {
    const req = new XMLHttpRequest();
    req.responseType = 'arraybuffer';
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          this.audioContext.decodeAudioData(req.response, (buffer) => {
            this.buffer = buffer;
            callback(buffer);
          });
        }
      }
    };

    req.open('GET', url, true);
    req.send('');
  }

  playSound(buffer) {
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
    source.start(0);
    this.playAnalysis();
  }

  playAnalysis() {
    let isRecording = true;
    setTimeout(() => {
      isRecording = false;
    }, 3000);

    const frame = () => {
      if (isRecording) {
        requestAnimationFrame(frame);

        this.analyser.getByteFrequencyData(this.frequency);
        this.analyser.getByteTimeDomainData(this.domain);

        if (this.frequency[10] > 0) {
          const copyData = new Uint8Array(this.frequency.length);
          copyData.set(this.frequency);
          if (this.mode === 'man')
            this.mFrequencys.push(copyData);
          else
            this.wFrequencys.push(copyData);

          const copyData2 = new Uint8Array(this.domain.length);
          copyData2.set(this.domain);
          if (this.mode === 'man')
            this.mDomains.push(copyData2);
          else
            this.wDomains.push(copyData2);
        }
        this.drawWave();
      }
    };

    frame();
  }

  drawWave() {

    this.waveContext.globalCompositeOperation = 'lighter';

    // this.waveContext.shadowBlur = 20;
    // this.waveContext.shadowOffsetX = 0;
    // this.waveContext.shadowOffsetY = 0;
    this.mGraph = [];
    this.wGraph = [];

    this.waveContext.clearRect(0, 0, 640, 400);

    this.waveContext.fillStyle = "#ff00fc";
    //this.waveContext.shadowColor = "#ff00fc";

    for (let i = 0; i < this.wFrequencys.length; i++) {
      let sum = 0;
      for (let j = 0; j < this.wFrequencys[i].length; j++) {
        sum += this.wFrequencys[i][j];
      }
      const average = sum / this.wFrequencys[i].length * 2;
      this.waveContext.fillRect(51 + 3 * i, 200, 1, average);
      this.waveContext.fillRect(51 + 3 * i, 200, 1, -average);
      this.wGraph.push(average);
    }


    this.waveContext.fillStyle = "#00bafd";
    //this.waveContext.shadowColor = "#00bafd";

    for (let i = 0; i < this.mFrequencys.length; i++) {
      let sum = 0;
      for (let j = 0; j < this.mFrequencys[i].length; j++) {
        sum += this.mFrequencys[i][j];
      }
      const average = sum / this.mFrequencys[i].length * 2;
      this.waveContext.fillRect(50 + 3 * i, 200, 1, average);
      this.waveContext.fillRect(50 + 3 * i, 200, 1, -average);
      this.mGraph.push(average);
    }
  }

  drawGraph() {

    const width = 1024;
    const height = 512;


    this.context.fillStyle = "#fff";
    this.context.fillRect(0, 0, width, height);

    this.context.fillStyle = "#009900";

    for (let i = 0; i < 512; ++i) {
      let y = (this.frequency[i] - this.noise[i]) * 2;
      this.context.fillRect(i * 2, height - y, 2, y);
    }

    this.context.fillStyle = "#99044f";
    for (let i = 0; i < 512; ++i) {
      let y = this.domain[i] * 2 - height / 2;
      this.context.fillRect(i * 2, height / 2, 2, y);
    }


  }


  analysis() {

    const mPeak = Index.getPeak(this.mGraph);
    const wPeak = Index.getPeak(this.wGraph);
    const mLength = Index.getHalfMaximumFrames(this.mGraph);
    const wLength = Index.getHalfMaximumFrames(this.wGraph);
    const similarity = Index.getSimilarity(this.mGraph, this.wGraph);

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

  lastAnalysis() {
    _.each(this.mGraphs, (mGraph, mValue) => {
      _.each(this.wGraphs, (wGraph, wValue) => {
        const mPeak = Index.getPeak(mGraph);
        const wPeak = Index.getPeak(wGraph);
        const mLength = Index.getHalfMaximumFrames(mGraph);
        const wLength = Index.getHalfMaximumFrames(wGraph);
        const similarity = Index.getSimilarity(mGraph, wGraph);

        console.log(`${mValue},${wValue},${mPeak},${wPeak},${mLength},${wLength},${similarity}`);
        this.log += `${mValue},${wValue},${mPeak},${wPeak},${mLength},${wLength},${similarity}\n`;
      });
    });
  }

  static getPeak(graph) {
    return _.max(graph)
  }

  static getHalfMaximumFrames(graph) {
    let count = 0;
    const max = _.max(graph);
    _.each(graph, (value) => {
      if (value > max / 2) count++;
    });
    return count;
  }

  static getSimilarity(graph1, graph2) {
    let sum = 0;
    for(let i = 0; i < 180; i++) {
      const value1 = i < graph1.length ? graph1[i] : 0;
      const value2 = i < graph2.length ? graph2[i] : 0;
     sum += Math.pow(value1 - value2, 2);
    }

    return Math.sqrt(sum);
  }

  playAll() {
    const mLength = this.$man.querySelectorAll('option').length;
    const wLength = this.$woman.querySelectorAll('option').length;
    let mIndex = 0;
    let wIndex = 0;
    let mode = 'm';

    //this.playWoman();

    let mGraphs = {};
    let wGraphs = {};

    const analysis = () => {
      document.querySelector(`#man option:nth-child(${mIndex + 1})`).selected = true;
      document.querySelector(`#woman option:nth-child(${wIndex + 1})`).selected = true;

      if (mode === 'm') {
        this.playMan();

        _.delay(() => {
          this.analysis();

          mIndex++;

          if (mIndex === mLength) {
            mode = 'w';
            mIndex--;
          }
          analysis();
        }, 5000);

      } else {
        this.playWoman();

        _.delay(() => {
          this.analysis();

          wIndex++;

          if (wIndex === wLength) {
            this.lastAnalysis();
          } else {
            analysis();
          }
        }, 5000);
      }
    };

    analysis();
  }

  analysisAll() {
    const mLength = this.$man.querySelectorAll('option').length;
    const wLength = this.$woman.querySelectorAll('option').length;
    let mIndex = 0;
    let wIndex = 0;

    this.playWoman();

    let mGraphs = {};
    let wGraphs = {};

    const analysis = () => {
      document.querySelector(`#man option:nth-child(${mIndex + 1})`).selected = true;
      document.querySelector(`#woman option:nth-child(${wIndex + 1})`).selected = true;

      if (mIndex === 0) {
        this.playWoman();

        _.delay(() => {
          this.playMan();
        }, 5000);

        _.delay(() => {
          this.analysis();

          mIndex++;
          if (mIndex === mLength) {
            mIndex = 0;
            wIndex++;
          }

          if (wIndex !== wLength) {
            analysis();
          } else {
            console.log(this.log);
          }
        }, 10000);
      } else {
          this.playMan();

        _.delay(() => {
          this.analysis();

          mIndex++;
          if (mIndex === mLength) {
            mIndex = 0;
            wIndex++;
          }

          if (wIndex !== wLength) {
            analysis();
          } else {
            console.log(this.log);
          }
        }, 5000);
      }
    };

    analysis();
  }
}

window.INDEX = new Index();
