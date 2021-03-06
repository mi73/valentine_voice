import Loading from './modules/ui/loading';
import Top from './modules/ui/top';
import Introduction from './modules/ui/introduction';
import Recording from './modules/ui/recording';
import Generating from './modules/ui/generating';

import LoveRecorder from './modules/LoveRecorder';


/**
 * Main Script
 */
class Index {
  constructor() {

    this.loading = new Loading('.loading');
    this.top = new Top('.top');
    this.introduction = new Introduction('.introduction');
    this.recording1 = new Recording('.recording1');
    this.recording2 = new Recording('.recording2');
    this.generating = new Generating('.generating');
    this.generating.setRecordingData(this.recording1, this.recording2);

    // this.loading.hide();
    // this.top.hide();
    // this.recording1.show();

    this.loveRecorder = new LoveRecorder;
    this.introduction.setRecorder(this.loveRecorder);

    window.addEventListener('load', () => {

    });

    this.bind();
  }

  bind() {

    this.loading.on('hidden', () => {
      this.top.show();
    });

    this.top.on('hidden', () => {
      this.introduction.show();
    });

    this.introduction.on('hidden', () => {
      this.recording1.show();
    });

    this.recording1.on('startRecording', () => {
      this.loveRecorder.startRecording()
    }).on('stopRecording', () => {
      this.loveRecorder.stopRecording();
    }).on('hidden', () => {
      this.recording2.show();
    });

    this.recording2.on('hidden', () => {
      this.generating.show();
    });

    this.loveRecorder.on('getData', () => {
      this.recording1.drawGraph(this.loveRecorder);
    });
  }
}

window.INDEX = new Index();
