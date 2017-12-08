import $ from 'jquery';
import Colors from './Colors';
import _ from 'underscore';
import colr from 'colr';

export default class Pattern1 {
  constructor(context) {
    this.context = context;
    this.initialize();

    this.optionKey = ['bg', 'blending', 'minH', 'maxH', 'minS', 'maxS', 'minB', 'maxB', 'param1', 'param2', 'param3', 'param4', 'param5', 'param6'];
  }

  initialize() {

  }

  setOption(option) {
    this.option = option;
    Array.from(this.optionKey, (key) => {
      console.log(key);
      this[key] = option[key];
    });
  }

  reset() {
  }

  draw() {

    const context = this.context;
    const height = 50 * this.param1;

    this.x = 0;
    this.y = 0;

    context.globalCompositeOperation = 'source-over';
    context.fillStyle = this.bg;
    context.fillRect(this.x, this.y, 750, 750);
    context.globalCompositeOperation = this.blending;

    for(this.y = 0;this.y < 750; this.y += height) {

      let w;

      for(this.x = 0;this.x < 750; this.x += w) {

        w = _.random(0.1, 300 * this.param2);

        if (_.random(0, 1) < this.param3) {

          const color = colr.fromHsv(_.random(this.minH, this.maxH), _.random(this.minS, this.maxS), _.random(this.minB, this.maxB)).toRgbObject();
          const grad  = context.createLinearGradient(0, this.y, 0, this.y + height * 2);

          grad.addColorStop(0,`rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
          grad.addColorStop(1,`rgba(${color.r}, ${color.g}, ${color.b}, 1)`);

          context.fillStyle = grad;

          context.fillRect(this.x, this.y, w, height * 2);
        }
      }
    }

  }
}
