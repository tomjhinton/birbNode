export default /* glsl */ `
varying vec2 vUv;
uniform float uTime;

attribute vec3 position2;
varying vec3 pos;

varying vec3 Normal;
varying vec3 Position;
#include <common>
#include <skinning_pars_vertex>


  void main(){
    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <beginnormal_vertex>
    #include <defaultnormal_vertex>
    #include <skinning_vertex>
    #include <project_vertex>
    vec4 modelPosition = modelMatrix * vec4(position, 1.);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
  

    gl_Position = projectionMatrix * mvPosition;
    
    
    vUv = uv;
    pos = modelPosition.xyz;
}`