import React, { useRef, useEffect } from "react";
import { useGLTF , useTexture, useAnimations, Environment} from "@react-three/drei";
import { OrbitControls,   Html, useProgress } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import Title from "./Title/Title.js"
import { TentacleMaterial, EyeMaterial, BodyMaterial, OuterMaterial } from "./materials/materials";


export default function Experience(props) {

  const tentacleMaterial = useRef()
  const eyeMaterial = useRef()
  const outerMaterial = useRef()
  const bodyMaterial = useRef()

  let matArr = [tentacleMaterial, eyeMaterial, outerMaterial, bodyMaterial]

  const tex1 = useTexture('tex1-min.jpg');
  const tex2 = useTexture('tex2-min.jpg');
  const tex3 = useTexture('tex3-min.jpg');
  const tex4 = useTexture('tex4-min.jpg');

  function LoadingScreen() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
  }
  

  useEffect(() => {
        
           tentacleMaterial.current.uniforms.uTexture.value = tex1
            eyeMaterial.current.uniforms.uTexture.value = tex2
            outerMaterial.current.uniforms.uTexture.value = tex3
            bodyMaterial.current.uniforms.uTexture.value = tex4

        
        
        }, []);

        useFrame(() => {

            if(tentacleMaterial){
            matArr.map( (x) => {
              x.current.uniforms.uTime.value += 0.01;
            })
          }
     
            
          });



  const group = useRef();
  const { nodes, materials, animations } = useGLTF("squid.glb");
  const { actions } = useAnimations(animations, group);
  let action = actions['ArmatureAction'];




  useEffect(() => {
    action = actions['ArmatureAction'];

    if (action) action.play();
    console.log(action)
  }, [action]);

  return (
    <>
        <OrbitControls makeDefault enableZoom={true} maxPolarAngle={Math.PI * .5}/>

        
    <Title />
    <Environment
  background={true} // can be true, false or "only" (which only sets the background) (default: false)
  blur={0} 
  files={['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png']}
  path="cubeMap3-min/"
 
/>

    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Armature"
          position={[-9.937, 0, 0]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={7.091}
        >
          <group name="Cube">
            <skinnedMesh
              name="Cube_1"
              geometry={nodes.Cube_1.geometry}
             
              skeleton={nodes.Cube_1.skeleton}
            >
              <bodyMaterial side={THREE.DoubleSide} ref={bodyMaterial} />
            </skinnedMesh>

            <skinnedMesh
              name="Cube_2"
              geometry={nodes.Cube_2.geometry}
              
              skeleton={nodes.Cube_2.skeleton}
            >
                <eyeMaterial side={THREE.DoubleSide} ref={eyeMaterial} />
            </skinnedMesh>
            <skinnedMesh
              name="Cube_3"
              geometry={nodes.Cube_3.geometry}
             
              skeleton={nodes.Cube_3.skeleton}
            >
               <outerMaterial side={THREE.DoubleSide} ref={outerMaterial} />
            </skinnedMesh>
            <skinnedMesh
              name="Cube_4"
              geometry={nodes.Cube_4.geometry}
             
              skeleton={nodes.Cube_4.skeleton}
            >
                <tentacleMaterial side={THREE.DoubleSide} ref={tentacleMaterial} />
            </skinnedMesh>
          </group>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone046} />
        </group>
      </group>
    </group>
    </>
  );
}

useGLTF.preload("squid.glb");
