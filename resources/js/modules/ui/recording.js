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

    this.initialize();
    this.bind();

    this.isCountingDown = false;
    this.isRecording = false;
    this.isRecorded = false;
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
      if (this.isCountingDown) {
        this.stopCountDown();
      } else if (this.isRecording){
        this.stopRecording();
      } else if (!this.isRecorded) {
        this.startCountDown();
      }
    });
  }

  startCountDown() {

    let count = 3;
    this.isCountingDown = true;

    this.timer = setInterval(() => {
      count--;
      this.$a.innerText = count;
      if (count === 0) {
        clearInterval(this.timer);
        this.startRecording();
      }
    }, 1000);
    this.$a.innerText = count;
  }

  stopCountDown() {
    clearInterval(this.timer);
    this.$a.innerText = '録音';
    this.isCountingDown = false;
  }

  startRecording() {
    this.isRecording = true;
    this.isCountingDown = false;
    this.$a.innerText = '録音中';
    this.emit('startRecording');

    setTimeout(() => {
      if (!this.isRecorded) {
        this.stopRecording();
      }
    }, 3000);
  }

  stopRecording() {

    this.isCountingDown = false;
    this.isRecording = false;
    this.isRecorded = true;
    this.$a.innerText = '愛してる';
    this.emit('stopRecording');
  }

  drawGraph(recorder) {

    let width = 1024;
    let height = 512;

    this.context.clearRect(0, 0, width, height);

    // 白塗り
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, 1024, 512);

    // 周波数
    this.context.fillStyle = "#009900";
    for (let i = 0; i < 512; ++i) {
      let y = 128 + (recorder.data[i] + 48.16) * 2.56;
      this.context.fillRect(i, 512 - y, 1, y);
    }

    this.context.fillStyle = "#990000";
    // for (let i = 0; i < 32; ++i) {
    //   let y = 128 + (this.data2[i] + 48.16) * 2.56;
    //   this.context.fillRect(i * 32, 256 - y, 512/32, y);
    // }

    // GRID
    // this.context.fillStyle = "#ff8844";
    // for (let d = -50; d < 50; d += 10) {
    //   let y = 128 - (d * 256 / 100) | 0;
    //   this.context.fillRect(20, y, 512, 1);
    //   this.context.fillText(d + "dB", 5, y);
    // }

    // Hz
    // this.context.fillRect(20, 128, 512, 1);
    // for (let f = 2000; f < this.audioContext.sampleRate / 2; f += 2000) {
    //   let x = (f * 1024 / this.audioContext.sampleRate) | 0;
    //   this.context.fillRect(x, 0, 1, 245);
    //   this.context.fillText(f + "Hz", x - 10, 255);
    // }

    // line
    this.context.strokeStyle = '#5722ff';
    this.context.beginPath();
    this.context.moveTo(0, 256);
    const averageLength = recorder.averages.length;
    for (let i = 0; i < averageLength; ++i) {
      //let y = 128 + (this.averages[i] + 48.16) * 2.56;
      //this.context.lineTo(i * 512 / averageLength, 256 - y);
      //this.context.lineTo(i * 512 / averageLength, 128 + this.averages[i] * 5124);
      let y = recorder.averages[i] * 2;
      this.context.lineTo(i * 1080 / averageLength, y);
    }
    this.context.stroke();


    for (let j = 0; j < recorder.datum2[0].length; ++j) {
      this.context.strokeStyle = '#5722ff';
      this.context.beginPath();
      this.context.moveTo(0, 256);
      const averageLength = recorder.averages.length;
      for (let i = 0; i < averageLength; ++i) {
        //let y = 128 + (this.averages[i] + 48.16) * 2.56;
        //this.context.lineTo(i * 512 / averageLength, 256 - y);
        //this.context.lineTo(i * 512 / averageLength, 128 + this.averages[i] * 5124);
        let y = recorder.datum2[j][i] * 2;
        this.context.lineTo(i * 1080 / averageLength, y);
      }
      this.context.stroke();
    }
  }

}
