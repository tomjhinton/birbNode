export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;

attribute vec3 position2;
varying vec3 pos;
	uniform float u_progress;
	varying float size;

void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .015));
    trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .015));
    trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .015));
    
  }  

   

  void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.);



		modelPosition.y += sin((uTime * .06) + length(modelPosition.xz)) * 4.;

    modelPosition.x += sin(modelPosition.y * 3.);


    vec4 modelPosition2 = modelMatrix * vec4(position, 1.);

   

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
  
    gl_Position = projectionPosition;
    

    
 gl_PointSize = 250.;

    gl_PointSize *= (1.0/ -viewPosition.z);

    vUv = uv;
    pos = modelPosition.xyz;
		size = gl_PointSize;
              
}`