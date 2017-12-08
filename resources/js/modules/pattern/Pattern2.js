import $ from 'jquery';
import Colors from './Colors';
import _ from 'underscore';
import colr from 'colr';

const RAD = Math.PI * 2 / 360;

export default class Pattern2 {
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
  }


  draw() {

    const context = this.context;

    this.x = 0;
    this.y = 0;

    context.globalCompositeOperation = 'source-over';
    context.fillStyle = this.bg;
    context.fillRect(this.x, this.y, 750, 750);
    context.globalCompositeOperation = this.blending;

    let r = 375 * this.param2;

    for(let deg = 0; deg < 360; deg += 90 * (this.param3 + this.param4 * _.random(-10, 10))) {

      const color = colr.fromHsv(_.random(this.minH, this.maxH), _.random(this.minS, this.maxS), _.random(this.minB, this.maxB)).toRgbObject();

      let radian = r + _.random(-100, 100) * (this.param2 - 0.5);

      const angle = 60 * this.param1;

      for(let deg2 = 0; deg2 < angle; deg2 += 1) {

        context.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
        context.lineWidth = 1;

        context.beginPath();
        context.moveTo(375, 375);
        context.lineTo(375 + radian * Math.sin(RAD * (deg + deg2)), 375 + radian * Math.cos(RAD * (deg + deg2)));
        context.stroke();
      }
    }
  }
}
