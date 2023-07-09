# birbNode

- Sure, you've looked at the sketch and it makes no sense to you thematically. 
- I do not have to explain my art to you. 



- [For the skybox](https://skybox.blockadelabs.com/)
- [To split it](https://matheowis.github.io/HDRI-to-CubeMap/)
- It's kinda fine for the purpose but also it's an AI image generation thing so black box/work of the devil/steal from real artists kinda bullshit and also it kept not giving me what I wanted. 

- Rigged model I made in blender. 
- Shaders with textures. 

- Your vertex shader needs some extra bits if you wanna run a shader on a rigged model.
```
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
```

- That's actual useful content. 

- Ok, the squid called Archie is a refence to a William Gibson novel.
- In Spook Country a charachter writng for Node magazine is looking at locative art.
- AR art tied to GPS co-ordinates. 
- One of the pieces is a hovering textured squid called Archie. 
- The texture on my version were made by combining still frames from GLSL shaders in blnder using its shading workspace.
- This is a node based stystem. 