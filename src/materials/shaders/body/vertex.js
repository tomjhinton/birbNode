export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;

attribute vec3 position2;
varying vec3 pos;

varying vec3 Normal;
varying vec3 Position;
#include <common>
#include <skinning_pars_vertex>

void coswarp(inout vec3 trip, float warpsScale ){

    trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (uTime * .015));
    trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (uTime * .015));
    trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (uTime * .015));
    
  }  

  void uvRipple(inout vec2 uv, float intensity){

    vec2 p = uv -.5;
    
    
      float cLength=length(p);
    
       uv= uv +(p/cLength)*cos(cLength*15.0-(uTime * .25)*.5)*intensity;
    
    } 
    

  void main(){
    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>
    #include <skinning_vertex>
    #include <project_vertex>
    vec4 modelPosition = modelMatrix * vec4(position, 1.);



    vec4 modelPosition2 = modelMatrix * vec4(position, 1.);

   

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
  
    Normal = normalize(normalMatrix * normal);
    Position = vec3(modelViewMatrix * vec4(position, 1.0));
    gl_Position = projectionMatrix * mvPosition;
    
    
    vUv = uv;
    pos = modelPosition.xyz;
}`