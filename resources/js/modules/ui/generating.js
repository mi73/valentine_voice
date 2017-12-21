import events from 'events';
import velocity from 'velocity-animate';
import _ from 'lodash';

export default class Generating extends events {
  constructor(selector) {
    super();

    this.$ = document.querySelector(selector);

    this.$first = this.$.querySelector('.generating__first');
    this.$second = this.$.querySelector('.generating__second');

    this.wave = this.$.querySelector('.wave');
    this.waveContext = this.wave.getContext("2d");
    this.operation = 'destination-over';

    this.$mPeak = this.$.querySelector('.mPeak');
    this.$wPeak = this.$.querySelector('.wPeak');
    this.$mLength = this.$.querySelector('.mLength');
    this.$wLength = this.$.querySelector('.wLength');
    this.$similarity = this.$.querySelector('.similarity');
    this.$passion = this.$.querySelector('.passion');
    this.$matured = this.$.querySelector('.matured');
    this.$purgent = this.$.querySelector('.purgent');

    this.initialize();
  }


  initialize() {

  }

  setRecordingData(recording1, recording2) {
    this.recording1 = recording1;
    this.recording2 = recording2;
  }

  drawWave() {

    this.waveContext.fillStyle = "#00bafd"; // : '#ff00fc';
    this.waveContext.shadowColor = "#00bafd";
    this.waveContext.shadowBlur = 20;
    this.waveContext.shadowOffsetX = 0;
    this.waveContext.shadowOffsetY = 0;

    this.waveContext.globalCompositeOperation = this.operation;

    this.waveContext.clearRect(0, 0, 640, 400);

    for(let i = 0; i < this.recording1.graph.length; i++) {
      this.waveContext.fillStyle = "#00bafd"; // : '#ff00fc';
      this.waveContext.shadowColor = "#00bafd";
      this.waveContext.fillRect(3 * i, 200, 1, this.recording1.graph[i]);
      this.waveContext.fillRect(3 * i, 200, 1, -this.recording1.graph[i]);
    }

    for(let i = 0; i < this.recording2.graph.length; i++) {
      this.waveContext.fillStyle = "#ff00fc";
      this.waveContext.shadowColor = "#ff00fc";
      this.waveContext.fillRect(3 * i, 200, 1, this.recording2.graph[i]);
      this.waveContext.fillRect(3 * i, 200, 1, -this.recording2.graph[i]);
    }
  }

  analysis() {

    const mPeak = Generating.getPeak(this.recording1.graph);
    const wPeak = Generating.getPeak(this.recording2.graph);
    const mLength = Generating.getHalfMaximumFrames(this.recording1.graph);
    const wLength = Generating.getHalfMaximumFrames(this.recording2.graph);
    const similarity = Generating.getSimilarity(this.recording1.graph, this.recording2.graph);

    this.passion = Generating.getPassion(mPeak + wPeak);
    this.matured = Generating.getMatured(mLength + wLength);
    this.purgent = Generating.getPurgent(similarity);

    console.log(`${mPeak},${wPeak},${mLength},${wLength},${similarity},${this.passion},${this.matured},${this.purgent}`);

    this.$mPeak.innerText = mPeak;
    this.$wPeak.innerText = wPeak;
    this.$mLength.innerText = mLength;
    this.$wLength.innerText = wLength;
    this.$similarity.innerText = similarity;
    this.$passion.innerText = this.passion;
    this.$matured.innerText = this.matured;
    this.$purgent.innerText = this.purgent;
  }

  static getPeak(graph) {
    return _.max(graph)
  }

  static getHalfMaximumFrames(graph) {
    let count = 0;
    const max = _.max(graph);
    _.each(graph, (value) => {
      if (value > max * 0.6) count++;
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

  static getPassion(peak) {
    if (peak > 210) return 10;
    if (peak > 190) return 9;
    if (peak > 170) return 8;
    if (peak > 150) return 7;
    if (peak > 140) return 6;
    if (peak > 130) return 5;
    if (peak > 120) return 4;
    if (peak > 110) return 3;
    if (peak > 90) return 2;
     return 1;
  }

  static getMatured(length) {
    if (length > 150) return 10;
    if (length > 120) return 9;
    if (length > 100) return 8;
    if (length > 80) return 7;
    if (length > 60) return 6;
    if (length > 55) return 5;
    if (length > 50) return 4;
    if (length > 45) return 3;
    if (length > 40) return 2;
    return 1;
  }

  static getPurgent(similarity) {
    if (similarity < 60) return 10;
    if (similarity < 90) return 9;
    if (similarity < 120) return 8;
    if (similarity < 140) return 7;
    if (similarity < 160) return 6;
    if (similarity < 200) return 5;
    if (similarity < 240) return 4;
    if (similarity < 360) return 3;
    if (similarity < 480) return 2;
    return 1;
  }

  show() {

    this.drawWave();
    this.analysis();

    velocity(this.$, {
      opacity: [1, 0],
    }, {
      queue: false,
      display: 'block',
      duration: 800,
    });

    setTimeout(() => {
      this.changeText();
    }, 10000);

    setTimeout(() => {
      //this.hide();
    }, 12000);
  }

  changeText() {
    velocity(this.$first, {
      opacity: 0,
    }, {
      queue: false,
      display: 'none',
      duration: 800,
    });
    velocity(this.$second, {
      opacity: 1,
    }, {
      queue: false,
      display: 'block',
      duration: 800,
    });
  }

  hide() {
    this.emit('hide');

    velocity(this.$, {
      opacity: 0,
    }, {
      queue: false,
      display: 'none',
      duration: 800,
      complete: () => {
        this.$.style.display = 'none';
        this.emit('hidden');
      },
    });
  }
}
