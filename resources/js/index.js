import Loading from './modules/ui/loading';
import Top from './modules/ui/top';
import Introduction from './modules/ui/introduction';


/**
 * Main Script
 */
class Index {
  constructor() {

    this.loading = new Loading('.loading');
    this.top = new Top('.top');
    this.introduction = new Introduction('.introduction');

    //this.loading.hide();
    //this.introduction.show();

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

  }
}

window.INDEX = new Index();
