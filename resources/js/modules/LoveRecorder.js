import events from 'events';

export default class LoveRecorder extends events {
  constructor() {
    super();

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();
    this.sampleRate = this.audioContext.sampleRate;

    this.fftSize = 2048;

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 1024;//this.fftSize;
    this.analyser.smoothingTimeContant = 0.9;

    // this.analyser2 = this.audioContext.createAnalyser();
    // this.analyser2.fftSize = this.fftSize;
    // this.analyser2.smoothingTimeContant = 0.9;

    this.bufsize = 1024;//this.analyser.frequencyBinCount;

    this.frequency= new Float32Array(this.bufsize);
    this.domain = new Uint8Array(this.bufsize);

    this.frequencys = [];
    this.domains = [];
    this.averages = [];

  }

  initialize() {

    console.log('LoveRecorder::initialize', this);

    navigator.getUserMedia({video: false, audio: true}, (stream) => {
      console.log('LoveRecorder::initialized', this);

      this.stream = stream;
      this.audioTrack = stream.getAudioTracks()[0];

      this.input = this.audioContext.createMediaStreamSource(stream);
      this.input.connect(this.analyser);
      //this.analyser.connect(this.analyser2);

      // this.input.connect(this.filter);
      // this.filter.connect(this.analyser);
    }, (e) => {
      console.log("No live audio input in this browser: " + e);
    });
  }

  startRecording() {
    console.log('LoveRecorder::startRecording', this);

    this.isRecording = true;
    this.startAnalyze();
  }

  stopRecording() {
    console.log('LoveRecorder::stopRecording', this);
    this.isRecording = false;
    clearInterval(this.timer);
    //this.audioTrack.stop();
  }

  startAnalyze() {
    console.log('LoveRecorder::startAnalyze', this);

    this.timer = setInterval(() => {
      if (this.isRecording) {
        this.analyze();
      }
    }, 1000 / 60);
  }

  analyze() {

    this.analyser.getFloatFrequencyData(this.frequency);
    this.analyser.getByteTimeDomainData(this.domain);

    console.log(this.frequency, this.domain);

    if (this.isRecording && this.domain[0] > -1000) {

      console.log(this.frequency);
      let sum = 0;

      const copyData = new Float32Array(this.frequency.length / 8);
      copyData.set(this.frequency.subarray(0, this.frequency.length / 8));
      this.frequencys.push(copyData);

      const copyData2 = new Uint8Array(this.domain.length / 8);
      copyData2.set(this.domain.subarray(0, this.domain.length / 8));
      this.domains.push(copyData2);

      for (let i = 0; i < this.domain.length; i++) {
        sum += this.domain[i];
      }
      this.averages.push(sum / this.domain.length);

      this.emit('getData', this);
    }
  }

  reset() {
  }


}
