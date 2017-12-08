import * as PIXI from 'pixi.js';
import fragmentShader from './TvFilter.frag';

export default class TvFilter extends PIXI.Filter {
  constructor() {
    const fragmentSrc = fragmentShader;

    const uniforms = {
      "time": {type: 'f', value: 1.0}
    };

    super(null, fragmentSrc, uniforms);
  }
};
