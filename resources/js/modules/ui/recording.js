
import events from 'events';
import velocity from 'velocity-animate';

export default class Recording extends events {
  constructor(selector) {
    super();

    this.$ = document.querySelector(selector);
    this.$p = this.$.querySelector('p');
    this.$a = this.$.querySelector('a');

    this.isRecording = false;

    this.canvas = document.getElementById("cvs");
    this.context = this.canvas.getContext("2d");

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

      if (this.isRecording) {
        this.stop();
      } else {
        this.record();
      }
    });
  }

  hide() {
    this.emit('hide');

    velocity(this.$p, {
      translateY: -100,
      opacity: 0,
    }, {
      queue: false,
      duration: 800,
      easing: 'easeInQuart',
      complete: () => {
      },
    });

    velocity(this.$a, {
      translateY: 100,
      opacity: 0,
    }, {
      queue: false,
      duration: 800,
      easing: 'easeInQuart',
      complete: () => {
        this.$.style.display = 'none';
        this.emit('hidden');
      },
    });
  }

  record() {

    this.isRecording = true;
    console.log('record');

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    this.audioContext = new AudioContext();
    this.sampleRate = this.audioContext.sampleRate;

    this.bufsize = 1024;
    this.data = new Float32Array(this.bufsize);
    this.data2 = new Uint8Array(this.bufsize);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = this.bufsize;
    this.analyser.smoothingTimeContant = 0.9;

    setInterval(() => {
      this.drawGraph();
    }, 1000 / 60);

    navigator.getUserMedia({video: false, audio: true}, (stream) => {
      console.log("stream" + stream);
      this.stream = stream;
      this.input = this.audioContext.createMediaStreamSource(stream);
      //input.connect(analyser);
      this.input.connect(this.analyser);
      //this.filter.connect(this.analyser);
      //this.analyser.connect(this.audioContext.destination);
    }, (e) => {
      console.log("No live audio input in this browser: " + e);
    });
  }


  stop() {
    this.isRecording = false;
    this.stream.getAudioTracks()[0].stop();

    this.hide();
  }

  drawGraph() {

    if (this.isRecording) {

      this.analyze();
      this.context.fillStyle = "#000000";
      this.context.fillRect(0, 0, 512, 256);
      this.context.fillStyle = "#009900";

      for (let i = 0; i < 512; ++i) {
        let f = this.audioContext.sampleRate * i / 1024;
        let y = 128 + (this.data[i] + 48.16) * 2.56;
        this.context.fillRect(i, 256 - y, 1, y);
      }

      this.context.fillStyle = "#ff8844";
      for (let d = -50; d < 50; d += 10) {
        let y = 128 - (d * 256 / 100) | 0;
        this.context.fillRect(20, y, 512, 1);
        this.context.fillText(d + "dB", 5, y);
      }

      this.context.fillRect(20, 128, 512, 1);
      for (let f = 2000; f < this.audioContext.sampleRate / 2; f += 2000) {
        let x = (f * 1024 / this.audioContext.sampleRate) | 0;
        this.context.fillRect(x, 0, 1, 245);
        this.context.fillText(f + "Hz", x - 10, 255);
      }
    }
  }

  analyze() {
    this.analyser.getFloatFrequencyData(this.data);
    this.analyser.getByteTimeDomainData(this.data2);
  }


  reset() {
  }


}
