import $ from 'jquery';
import Colors from './Colors';
import _ from 'underscore';
import colr from 'colr';
import SimplexNoise from 'simplex-noise';

const simplex = new SimplexNoise(Math.random);
const RAD = Math.PI * 2 / 360;

export default class Pattern4 {
  constructor(context) {
    this.context = context;
    this.initialize();

    this.optionKey = ['bg', 'blending', 'minH', 'maxH', 'minS', 'maxS', 'minB', 'maxB', 'param1', 'param2', 'param3', 'param4', 'param5', 'param6'];
  }

  initialize() {

  }

  setOption(option) {
    this.option = option;r
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

    clearInterval(this.timer);
    this.timer = setInterval(() => {

      t += 0.001;

      const noise = simplex.noise2D(this.param3, t);

      context.globalCompositeOperation = 'source-over';
      context.clearRect(0, 0, 750, 750);
      context.fillStyle = this.bg;
      context.fillRect(this.x, this.y, 750, 750);
      context.globalCompositeOperation = this.blending;

      context.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${this.param3})`;
      context.lineWidth = 10 * this.param3;

      this.x = 375 * this.param4 * Math.sin(0);
      this.y = 375 * this.param4 * Math.cos(0);

      context.beginPath();
      context.moveTo(375 + this.x, 375 + this.y);

      for (let x = 0; x < 100 / this.param1; x += this.param2) {

        this.x = 375 * this.param4 * Math.sin(x * this.param5 * noise) * Math.cos(x * this.param5 * 0.123134);
        this.y = 375 * this.param4 * Math.cos(x * this.param6 * noise);

        context.lineTo(375 + this.x, 375 + this.y);
      }

      context.stroke();
    }, 50);
  }
}
