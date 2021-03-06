import events from 'events';
import velocity from 'velocity-animate';

export default class Introduction extends events {
  constructor(selector) {
    super();

    this.$ = document.querySelector(selector);
    this.$h3 = this.$.querySelector('h3');
    this.$p = this.$.querySelectorAll('p');
    this.$button = this.$.querySelector('.introduction__button');

    this.initialize();
    this.bind();
  }


  initialize() {

  }

  setRecorder(recorder) {
    this.recorder = recorder;
  }

  bind() {
    this.$button.addEventListener('click', (e) => {
      e.preventDefault();
      this.hide();
      this.recorder.initialize();
    });
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

  hide() {

    velocity(this.$h3, {
      translateY: -100,
      opacity: 0,
    }, {
      queue: false,
      duration: 800,
      easing: 'easeInQuart',
      complete: () => {
      },
    });

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

    velocity(this.$button, {
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
}
