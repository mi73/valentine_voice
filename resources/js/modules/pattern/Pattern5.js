import $ from 'jquery';
import Colors from './Colors';
import _ from 'underscore';
import colr from 'colr';
import SimplexNoise from 'simplex-noise';

const simplex = new SimplexNoise(Math.random);
const RAD = Math.PI * 2 / 360;

export default class Pattern3 {
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
      this[key] = option[key];
    });
  }

  reset() {
    clearInterval(this.timer);
  }

  draw() {

    const context = this.context;
    const color = colr.fromHsv(_.random(this.minH, this.maxH), _.random(this.minS, this.maxS), _.random(this.minB, this.maxB)).toRgbObject();

    this.x = 0;
    this.y = 0;

    let t = 0;

    const interval = this.param1 * 50;

    clearInterval(this.timer);
    this.timer = setInterval(() => {

      t += 0.1 * this.param5;

      context.globalCompositeOperation = 'source-over';
      context.clearRect(0, 0, 750, 750);
      context.fillStyle = this.bg;
      context.fillRect(this.x, this.y, 750, 750);
      context.globalCompositeOperation = this.blending;

      let r = 50 * this.param2;

      for (let x = 0; x < 750; x += interval) {

        for (let y = 0; y < 750; y += interval) {

          const noise = simplex.noise3D(x / 750 / this.param4, y / 750 / this.param4, t);

          context.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
          context.lineWidth = interval * this.param2;

          context.beginPath();
          context.arc(x + noise * this.param3 * 50, y + noise, r, 0, Math.PI*2, false);
          context.stroke();
        }
      }
    });
  }
}
