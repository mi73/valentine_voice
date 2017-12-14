import events from 'events';
import velocity from 'velocity-animate';

export default class Generating extends events {
  constructor(selector) {
    super();

    this.$ = document.querySelector(selector);

    this.$first = this.$.querySelector('.generating__first');
    this.$second = this.$.querySelector('.generating__second');

    this.initialize();
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

    setTimeout(() => {
      this.changeText();
    }, 3000);

    setTimeout(() => {
      this.hide();
    }, 6000);
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
