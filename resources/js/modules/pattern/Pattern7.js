import $ from 'jquery';
import Colors from './Colors';
import _ from 'underscore';
import colr from 'colr';
import SimplexNoise from 'simplex-noise';
import * as PIXI from 'pixi.js';

const simplex = new SimplexNoise(Math.random);

console.log(PIXI);

/**
 * http://pixijs.io/pixi-filters/tools/demo/
 */

PIXI.filters.GlitchFilter = class GlitchFilter extends PIXI.Filter {
  constructor() {
    const fragmentSrc = `
    void main( out vec4 fragColor, in vec2 fragCoord )
    {
    	vec2 uv = fragCoord.xy / iResolution.xy;
    	vec2 block = floor(fragCoord.xy / vec2(16));
    	vec2 uv_noise = block / vec2(64);
    	uv_noise += floor(vec2(iTime) * vec2(1234.0, 3543.0)) / vec2(64);
    	
    	float block_thresh = pow(fract(iTime * 1236.0453), 2.0) * 0.2;
    	float line_thresh = pow(fract(iTime * 2236.0453), 3.0) * 0.7;
    	
    	vec2 uv_r = uv, uv_g = uv, uv_b = uv;
    
    	if (texture(iChannel1, uv_noise).r < block_thresh ||
    		texture(iChannel1, vec2(uv_noise.y, 0.0)).g < line_thresh) {
    
    		vec2 dist = (fract(uv_noise) - 0.5) * 0.3;
    		uv_r += dist * 0.1;
    		uv_g += dist * 0.2;
    		uv_b += dist * 0.125;
    	}
    
    	fragColor.r = texture(iChannel0, uv_r).r;
    	fragColor.g = texture(iChannel0, uv_g).g;
    	fragColor.b = texture(iChannel0, uv_b).b;
    
    	if (texture(iChannel1, uv_noise).g < block_thresh)
    		fragColor.rgb = fragColor.ggg;
    
    	if (texture(iChannel1, vec2(uv_noise.y, 0.0)).b * 3.5 < line_thresh)
    		fragColor.rgb = vec3(0.0, dot(fragColor.rgb, vec3(1.0)), 0.0);

    	if (texture(iChannel1, uv_noise).g * 1.5 < block_thresh ||
    		texture(iChannel1, vec2(uv_noise.y, 0.0)).g * 2.5 < line_thresh) {
    		float line = fract(fragCoord.y / 3.0);
    		vec3 mask = vec3(3.0, 0.0, 0.0);
    		if (line > 0.333)
    			mask = vec3(0.0, 3.0, 0.0);
    		if (line > 0.666)
    			mask = vec3(0.0, 0.0, 3.0);
    		
    		fragColor.xyz *= mask;
    	}
    }
    `;

    super(
      null, fragmentSrc, {}
    );
  }
};

export default class Pattern6 {
  constructor(context, canvas) {
    this.context = context;
    this.canvas = canvas;
    this.video = document.createElement("video");

    this.initialize();

    this.app = new PIXI.Application(750, 750, {transparent: true});
    document.querySelector('.box').appendChild(this.app.view);

    this.optionKey = ['bg', 'minH', 'maxH', 'minS', 'maxS', 'minB', 'maxB', 'param1', 'param2', 'param3', 'param4', 'param5', 'param6'];
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
    this.video.pause();
    this.canvas.style.display = 'block';
    this.app.view.style.display = 'none';
  }


  draw() {

    this.canvas.style.display = 'none';
    this.app.view.style.display = 'block';

    this.video.preload = "auto";
    this.video.loop = true;              // enable looping
    this.video.src = '/loop_sp.mp4';

    this.glitchFilter = new PIXI.filters.GlitchFilter();
    const texture = PIXI.Texture.fromVideo(this.video);
    const videoSprite = new PIXI.Sprite(texture);

    videoSprite.width = this.app.renderer.width;
    videoSprite.height = this.app.renderer.height;

    this.app.stage.addChild(videoSprite);
    this.app.stage.filters = [this.glitchFilter];
    //this.app.stage.filters = [this.tvFilter, this.mouseFilter];


    setInterval(() => {
      this.update();
    }, 1000 / 60);

    this.app.ticker.add((delta) => {
      this.glitchFilter.uniforms.iTime += this.param1 * 1000 / 60;
    });
  }

  update(option) {
    //let time = filter.uniforms.time;
  }
}
