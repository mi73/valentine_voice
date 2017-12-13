import events from 'events';
import velocity from 'velocity-animate';

export default class Top extends events {
  constructor(selector) {
    super();

    this.$ = document.querySelector(selector);
    this.$h2 = this.$.querySelector('h2');
    this.$start = this.$.querySelector('.top__start');
    this.$button = this.$.querySelector('.top__startButton');
    this.$footer = this.$.querySelector('.top__footer');

    this.initialize();
    this.bind();
  }


  initialize() {

  }

  bind() {
    this.$button.addEventListener('click', (e) => {
      e.preventDefault();
      this.hide();
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

    velocity(this.$footer, {
      translateY: [0, 60],
    }, {
      queue: false,
      display: 'block',
      duration: 800,
      easing: [250, 30],
    });
  }

  hide() {

    this.emit('hide');

    velocity(this.$h2, {
      translateY: -100,
      opacity: 0,
    }, {
      queue: false,
      duration: 800,
      easing: 'easeInQuart',
      complete: () => {
      },
    });

    velocity(this.$start, {
      translateY: 100,
      opacity: 0,
    }, {
      queue: false,
      duration: 800,
      easing: 'easeInQuart',
      complete: () => {
      },
    });

    velocity(this.$footer, {
      translateY: 60,
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
