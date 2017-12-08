import * as PIXI from 'pixi.js';
import fragmentShader from './GlitchFilter.frag';

export default class glitchFilter extends PIXI.Filter {
  constructor() {
    const fragmentSrc = fragmentShader;
    const uniforms = {
      "tDiffuse": {type: 'sampler2D', value: 0},
      "tDisp": {type: 'sampler2D', value: 0},
      "byp": {type: 'i', value: 0},
      "amount": {type: 'f', value: 0.08},
      "angle": {type: 'f', value: 0.02},
      "seed": {type: 'f', value: 0.02},
      "seed_x": {type: 'f', value: 0.02},
      "seed_y": {type: 'f', value: 0.02},
      "distortion_x": {type: 'f', value: 0.5},
      "distortion_y": {type: 'f', value: 0.6},
      "col_s": {type: 'f', value: 0.05}
    };

    super(null, fragmentSrc, uniforms);
  }
};
