import events from 'events';
import velocity from 'velocity-animate';

export default class Recording extends events {
  constructor(selector) {
    super();

    this.$ = document.querySelector(selector);
    this.$p = this.$.querySelector('p');
    this.$a = this.$.querySelector('a');

    this.bind();
  }

  initialize() {

  }

  show() {
    velocity(this.$, {
      opacity: [1, 0],
    }, {
      queue: false,
      display: 'block',
      duration: 800,
    });
  }

  bind() {
    this.$a.addEventListener('click', (e) => {
      this.record();
    });
  }

  record() {

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

    this.recorder = new Recorder(this.filter, {workerPath: './js/recorderjs/recorderWorker.js'});

    setInterval(() => {
      this.drawGraph();
    }, 1000 / 4);
    // setTimeout(() => {
    //   this.drawGraph();
    // }, 3000);

    navigator.getUserMedia({video: false, audio: true}, (stream) => {
      console.log("stream" + stream);
      this.input = this.audioContext.createMediaStreamSource(stream);
      //input.connect(analyser);
      this.input.connect(this.filter);
      this.filter.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      this.recorder && this.recorder.record();
    }, (e) => {
      console.log("No live audio input in this browser: " + e);
    });
  }

  drawGraph() {
    console.log(this.data);
  }

  reset() {
  }


}
