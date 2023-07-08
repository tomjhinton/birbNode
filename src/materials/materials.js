
import { extend, useLoader } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import vertexShaderTentacle from './shaders/tentacles/vertex.js'
import fragmentShaderTentacle from './shaders/tentacles/fragment.js'


import vertexShaderEye from './shaders/eye/vertex.js'
import fragmentShaderEye from './shaders/eye/fragment.js'

import vertexShaderOuter from './shaders/outer/vertex.js'
import fragmentShaderOuter from './shaders/outer/fragment.js'

import vertexShaderBody from './shaders/body/vertex.js'
import fragmentShaderBody from './shaders/body/fragment.js'





const TentacleMaterial = shaderMaterial(
    {
      uTime: 0,
      uSquishStrength: 0,
      uMousePosition: [0, 0, 0],
      u_progress: 0,
      uTexture: null
      
    },
    vertexShaderTentacle,
    fragmentShaderTentacle
  );
  
  extend({ TentacleMaterial });

  export { TentacleMaterial}


  const EyeMaterial = shaderMaterial(
    {
      uTime: 0,
      uSquishStrength: 0,
      uMousePosition: [0, 0, 0],
      u_progress: 0,
      uTexture: null

   
      
    },
    vertexShaderEye,
    fragmentShaderEye
  );
  
  extend({ EyeMaterial });

  export { EyeMaterial}



  const BodyMaterial = shaderMaterial(
    {
      uTime: 0,
      uSquishStrength: 0,
      uMousePosition: [0, 0, 0],
      u_progress: 0,
      uTexture: null

   
      
    },
    vertexShaderBody,
    fragmentShaderBody
  );
  
  extend({ BodyMaterial });

  export { BodyMaterial}




  const OuterMaterial = shaderMaterial(
    {
      uTime: 0,
      uSquishStrength: 0,
      uMousePosition: [0, 0, 0],
      u_progress: 0,
      uTexture: null

   
      
    },
    vertexShaderOuter,
    fragmentShaderOuter
  );
  
  extend({ OuterMaterial });

  export { OuterMaterial}

