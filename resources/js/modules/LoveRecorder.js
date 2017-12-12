import events from 'events';

export default class LoveRecorder extends events {
  constructor(selector) {
    super();

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.sampleRate = this.audioContext.sampleRate;

    this.bufsize = 1024;

    this.data = new Float32Array(this.bufsize);
    this.data2 = new Uint8Array(16);

    this.datum = [];
    this.datum2 = [];
    this.averages = [];

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = this.bufsize;
    this.analyser.smoothingTimeContant = 0;

    this.analyser2 = this.audioContext.createAnalyser();
    this.analyser2.fftSize = 32;
    this.analyser2.smoothingTimeContant = 0.9;
  }

  initialize() {

    navigator.getUserMedia({video: false, audio: true}, (stream) => {
      this.stream = stream;
      this.input = this.audioContext.createMediaStreamSource(stream);
      this.input.connect(this.analyser);
      this.input.connect(this.analyser2);

      // this.input.connect(this.filter);
      // this.filter.connect(this.analyser);

      this.audioTrack = stream.getAudioTracks()[0];

      console.log('initialized');
    }, (e) => {
      console.log("No live audio input in this browser: " + e);
    });
  }

  startRecording() {
    this.isRecording = true;
    this.startAnalyze();
  }

  stopRecording() {
    this.isRecording = false;
    this.audioTrack.stop();
  }

  startAnalyze() {

    const frame = () => {
      if (this.isRecording) {
        requestAnimationFrame(frame);
        this.analyze();
      }
    };
    frame();
  }

  analyze() {

    this.analyser.getFloatFrequencyData(this.data);
    this.analyser2.getByteTimeDomainData(this.data2);

    if (this.isRecording && this.data2[0] > -1000) {

      console.log(this.data);
      let sum = 0;

      const copyData = new Float32Array(this.data.length);
      copyData.set(this.data);
      this.datum.push(copyData);

      const copyData2 = new Uint8Array(this.data2.length);
      copyData2.set(this.data2);
      this.datum2.push(copyData2);

      for (let i = 0; i < this.data2.length; i++) {
        sum += this.data2[i];
      }
      this.averages.push(sum / this.data2.length);

      this.emit('getData', this);
    }
  }

  reset() {
  }


}
