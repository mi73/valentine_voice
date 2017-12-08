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

      t += 0.001;

      context.globalCompositeOperation = 'source-over';
      context.clearRect(0, 0, 750, 750);
      context.fillStyle = this.bg;
      context.fillRect(this.x, this.y, 750, 750);
      context.globalCompositeOperation = this.blending;

      let r = 375 * this.param2;

      for (let x = 0; x < 750; x += interval) {

        for (let y = 0; y < 750; y += interval) {

          const noise = simplex.noise3D(x / 750 / this.param4, y / 750 / this.param4, t);

          context.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${this.param3})`;
          context.lineWidth = interval * this.param2;

          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x + noise * interval, y + noise * interval);
          context.stroke();
        }
      }
    });
  }
}
