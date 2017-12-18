import events from 'events';
import velocity from 'velocity-animate';

export default class Generating extends events {
  constructor(selector) {
    super();

    this.$ = document.querySelector(selector);

    this.$first = this.$.querySelector('.generating__first');
    this.$second = this.$.querySelector('.generating__second');

    this.wave = this.$.querySelector('.wave');
    this.waveContext = this.wave.getContext("2d");
    this.operation = 'destination-over';

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
      this.waveContext.fillRect(0 + 6 * i, 200, 3, this.recording1.graph[i]);
      this.waveContext.fillRect(0 + 6 * i, 200, 3, -this.recording1.graph[i]);
    }

    for(let i = 0; i < this.recording2.graph.length; i++) {
      this.waveContext.fillStyle = "#ff00fc";
      this.waveContext.shadowColor = "#ff00fc";
      this.waveContext.fillRect(3 + 6 * i, 200, 3, this.recording2.graph[i]);
      this.waveContext.fillRect(3 + 6 * i, 200, 3, -this.recording2.graph[i]);
    }

  }

  show() {

    this.drawWave();

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
