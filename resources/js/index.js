import Loading from './modules/ui/loading';
import Top from './modules/ui/top';
import Introduction from './modules/ui/introduction';

import Recording from './modules/ui/recording';


/**
 * Main Script
 */
class Index {
  constructor() {

    this.loading = new Loading('.loading');
    this.top = new Top('.top');
    this.introduction = new Introduction('.introduction');
    this.recording1 = new Recording('.recording1');
     this.loading.hide();
     this.recording1.show();
    //

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
  }
}

window.INDEX = new Index();
