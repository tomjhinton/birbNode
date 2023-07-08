export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform vec3 uMousePosition;
varying vec3 pos;
uniform float u_progress;

uniform sampler2D uTexture;
uniform sampler2D uTexture2;
uniform sampler2D uTexture3;
float PI = 3.124;



  
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;

}

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .05 * sin(11. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
  
}  

void uvRipple(inout vec2 uv, float intensity){

vec2 p = uv -.5;


  float cLength=length(p);

   uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

} 


uniform vec3 lightDirection;

varying vec3 vNormal;
varying vec3 vWorldPosition;



float circularSineWave(vec2 st, float radius, float frequency, float amplitude) {
  float dist = length(st) - radius;
  float angle = atan(st.y, st.x);
  float wave = sin(angle * frequency) * amplitude;
  return smoothstep(0.0, wave + dist, abs(dist));
}  

vec2 rotateTilePattern(vec2 _st){

  float t = (uTime * .25)  ;
  
    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
  
   if(index == 0.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5 +(t *.8));
    }
  
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5 +t);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5 -t);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI - (t * .8));
    }

    return _st;
}
void main(){




  vec2 uv = vUv;
  uv = rotateTilePattern(uv);


  vec4 tex = texture2D(uTexture, uv);
 



  vec2 uv2 = fract(uv * 5.);

  // uv = fract(uv * 10.);

  
  float t = (uTime * .2) +length(uv-.5);

  
	
	vec3 color = vec3(uv.x, uv.y, 1.);
  
  coswarp(color, 3.);
  coswarp(color, 3.);
  coswarp(color, 3.);

  vec3 color2 = color;



  color = vec3(step(tex.r, .5), step(tex.g, .5), step(tex.b, .5));
  

  

  // color = mix(color, vec3(1.), 1.-circularSineWave(uv2-.5, 0.95 * sin(t), 40. , 0.01) );
  

  
  // color = mix(color, vec3(uv.x, uv.y, 1.), squishFactor *( (sin(u_progress) +1.) * .5) * 1.5 );

  // color -= 1. -pos.z;
  gl_FragColor = vec4(color, 1. );
}`