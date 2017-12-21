import events from 'events';
import velocity from 'velocity-animate';

export default class Recording extends events {
  constructor(selector) {
    super();

    this.selector = selector;
    this.isFirst = selector === '.recording1';
    this.$ = document.querySelector(selector);
    this.$p = this.$.querySelector('p');
    this.$record = this.$.querySelector('.recording__button');
    this.$next = this.$.querySelector('.recording__next');

    this.canvas = document.getElementById("cvs");
    this.context = this.canvas.getContext("2d");

    this.wave = this.$.querySelector('.wave');
    this.waveContext = this.wave.getContext("2d");

    this.isRecording = false;
    this.isRendering = true;

    this.bufsize = 1024;
    this.frequency = new Uint8Array(this.bufsize);
    this.noise = new Uint8Array(this.bufsize);
    this.frequencys = [];
    this.domain = new Uint8Array(this.bufsize);
    this.domains = [];
    this.graph = [];

    this.initialize();
    this.bind();
  }

  initialize() {
    for (let i = 0; i < this.bufsize; i++) {
      this.noise[i] = 0.0;
    }
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
    this.$record.addEventListener('click', (e) => {

      if (!this.isRecording) {
        this.record();
        this.startCountDown();
      }
    });

    this.$next.addEventListener('click', () => {
      this.hide();
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

    velocity(this.$next, {
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

  changeToNext() {

    velocity(this.$record, {
      translateX: ['-50%', '-50%'],
      opacity: 0,
    }, {
      display: 'none',
      duration: 400,
    });

    velocity(this.$next, {
      opacity: [1, 0],
    }, {
      display: 'block',
      delay: 400,
      duration: 1000,
    });
  }

  record() {

    this.timer = setInterval(() => {
      this.drawGraph();
      if (this.isRecording) {
        this.drawWave();
      }
    }, 1000 / 60);

    navigator.getUserMedia({video: false, audio: true}, (stream) => {
      console.log("stream" + stream);

      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.sampleRate = this.audioContext.sampleRate;

      this.filter = this.audioContext.createBiquadFilter();
      this.filter.type = 0;
      this.filter.frequency.value = 20000;

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = this.bufsize;
      this.analyser.smoothingTimeContant = 0;

      this.stream = stream;
      this.input = this.audioContext.createMediaStreamSource(stream);
      this.input.connect(this.filter);
      this.filter.connect(this.analyser);

      //this.input.connect(this.analyser);
    }, (e) => {
      console.log("No live audio input in this browser: " + e);
    });
  }

  startCountDown() {
    let count = 3;
    this.isCalibrating = true;
    this.isRendering = true;

    clearInterval(this.interval);
    this.interval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(this.interval);
        this.$record.innerText = '愛してる';

        this.calculateNoise();
        this.isCalibrating = false;
        this.isRecording = true;

      } else {
        this.$record.innerText = count;
      }
    }, 1000);
    this.$record.innerText = count;

    setTimeout(() => {
      if (this.isRecording) {
        this.stop();
      }
    }, 6000);
  }

  stop() {
    console.log(this);
    this.isRecording = false;
    clearInterval(this.timer);
    this.drawWave();
    this.changeToNext();
  }

  drawWave() {

    this.waveContext.fillStyle = this.isFirst ? "#00bafd" : '#ff00fc';
    this.waveContext.shadowColor = this.isFirst ? "#00bafd" : '#ff00fc';
    this.waveContext.shadowBlur = 20;
    this.waveContext.shadowOffsetX = 0;
    this.waveContext.shadowOffsetY = 0;
    this.graph = [];

    this.waveContext.clearRect(0, 0, 640, 400);

    for(let i = 0; i < this.frequencys.length; i++) {
      let sum = 0;
      for(let j = 0; j < this.frequencys[i].length; j++) {
        sum += this.frequencys[i][j];
      }
      const average = sum / this.frequencys[i].length * 2;
      this.waveContext.fillRect(50 + 3 * i, 200, 1, average);
      this.waveContext.fillRect(50 + 3 * i, 200, 1, -average);
      this.graph.push(average);
    }
  }

  drawGraph() {

    const width = 1024;
    const height = 512;

    if (this.isRendering) {

      this.analyze();

      this.context.fillStyle = "#fff";
      this.context.fillRect(0, 0, width, height);

      this.context.fillStyle = "#009900";


      // for (let i = 0; i < 512; ++i) {
      //   let y = (this.frequency[i] - this.noise[i]) * 2;
      //   this.context.fillRect(i * 2, height - y, 2, y);
      // }
      //
      // this.context.fillStyle = "#99044f";
      // for (let i = 0; i < 512; ++i) {
      //   let y = this.domain[i] * 2 - height / 2;
      //   this.context.fillRect(i * 2, height / 2, 2, y);
      // }
    }

    //if (this.isCalibrating) {
      this.addFrequency();
    //}
  }

  addFrequency() {
    if (this.frequency[10] > 0) {
      const copyData = new Uint8Array(this.frequency.length);
      copyData.set(this.frequency);
      this.frequencys.push(copyData);

      const copyData2 = new Uint8Array(this.domain.length);
      copyData2.set(this.domain);
      this.domains.push(copyData2);
    }
  }

  calculateNoise() {

    const sum = new Float32Array(this.bufsize);

    for (let i = 0; i < this.bufsize; i++) {
      sum[i] = 0;
    }

    let count = 0;
    Array.from(this.frequencys, (frequency) => {
      if (frequency[0] > -150) {
        count++;
        for (let i = 0; i < frequency.length; i++) {
          sum[i] += frequency[i];
        }
      }
    });

    for (let i = 0; i < this.noise.length; i++) {
      this.noise[i] = sum[i] / count;
    }

    this.domains = [];
    this.frequencys = [];
  }

  analyze() {
    this.analyser.getByteFrequencyData(this.frequency);
    this.analyser.getByteTimeDomainData(this.domain);
  }


  reset() {
  }


}
