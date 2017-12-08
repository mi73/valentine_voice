import events from 'events';
import velocity from 'velocity-animate';

export default class Loading extends events {
  constructor(selector) {
    super();

    this.$ = document.querySelector(selector);
    this.$h2 = this.$.querySelector('h2');
    this.$gauge = this.$.querySelector('.loading__gauge');
    //this.$loading = this.$.querySelector('p');
    this.$progress = this.$.querySelector('progress');

    this.initialize();
  }

  initialize() {
    this.start();
  }

  start() {

    velocity(this.$progress, {
      tween: [100, 0],
    }, {
      duration: 1000,
      progress: (a, b, c, d, e) => {
        const tween = e;
        this.$progress.setAttribute('value', e);
      },
      complete: () => {
        this.emit('loaded');
        this.hide();
      },
    })
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

    velocity(this.$gauge, {
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
