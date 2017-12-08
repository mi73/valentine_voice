precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
varying vec4 vColor;

uniform float time;

void main(void) {
  vec2 cord = vTextureCoord;
  vec4 color = texture2D(uSampler, cord);
  float scanLineInterval = 1300.0;
  float scanLineSpeed = time * 5.0;
  float scanLine = max(1.0, sin(vTextureCoord.y * scanLineInterval + scanLineSpeed) * 2.0) * 1.5;
  color.rgb *= scanLine;
  gl_FragColor = color;
}
