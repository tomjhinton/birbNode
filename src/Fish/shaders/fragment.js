export default /* glsl */`uniform float uTime;

varying vec2 vUv;
uniform vec2 uResolution;
varying vec3 pos;
const float PI = 3.1415926535897932384626433832795;
varying float size;

  
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;

}

void coswarp(inout vec3 trip, float warpsScale ){

  trip.xyz += warpsScale * .1 * sin(3. * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .05 * sin(uTime * trip.yzx + (uTime * .15));
  trip.xyz += warpsScale * .025 * sin(17. * trip.yzx + (uTime * .15));
  
}  

void uvRipple(inout vec2 uv, float intensity){

vec2 p = uv -.5;


  float cLength=length(p);

   uv= uv +(p/cLength)*cos(cLength*15.0-uTime*.5)*intensity;

} 



float shape( in vec2 p, float sides ,float size)
{
  
   float d = 0.0;
  vec2 st = p *2.-1.;

  // Number of sides of your shape
  float N = sides ;

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI ;
  float r = (2.* PI)/(N) ;

  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);
  

  return  1.0-smoothstep(size,size +.1,d);
}

float roundedBoxSDF(vec2 CenterPosition, vec2 Size, float Radius) {
  return length(max(abs(CenterPosition)-Size+Radius,0.0))-Radius;
}

vec2 rotateUV(vec2 uv, vec2 pivot, float rotation) {
  mat2 rotation_matrix=mat2(  vec2(sin(rotation),-cos(rotation)),
                              vec2(cos(rotation),sin(rotation))
                              );
  uv -= pivot;
  uv= uv*rotation_matrix;
  uv += pivot;
  return uv;
}
 


void main() {
  vec2 uv = vUv;
  vec2 uv2 = uv;
  uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy + 0.5;
  
 
 vec3 color = vec3(0.);
  
 
 vec2 coOrd = gl_PointCoord;
 vec2 coOrd2 = gl_PointCoord;

 

   float alpha = 1.;


   
     uvRipple(uv, .1);

        color = vec3(uv.x, uv.y, 1.);
        coswarp(color, 3.);
        coswarp(color, 3.);

        vec2 rote = rotateUV(coOrd-.2, vec2(.5), PI  * .35);
  
        vec2 roteC = rotateUV(vec2(coOrd.x+.3, coOrd.y-.1), vec2(.25), PI  * -.35);
     
   
     float fish = step(roundedBoxSDF(rote, vec2(.1, .3), .3), .01) + step(roundedBoxSDF(roteC, vec2(.1, .3), .3), .01) + step(roundedBoxSDF(coOrd-.5, vec2(.5, .3), .5), .01);
     

      alpha= fish;  
     

  
    gl_FragColor = vec4(vec3(color.r, color.g, color.b), alpha);
}`