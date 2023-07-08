import { OrbitControls , shaderMaterial, Center, Text, Float, Point, Points, QuadraticBezierLine} from '@react-three/drei'
import React, { useRef, useState } from 'react'
import {  useFrame, extend } from '@react-three/fiber'
import vertexShader from './shaders/vertex.js'
import fragmentShader from './shaders/fragment.js'
import * as THREE from 'three'





let box = new THREE.BoxGeometry( 6, 6, 6, 20,20, 20 );





export default function Fish(props){
 console.log(props)

      
    const PointMaterial = shaderMaterial(

        {
            uTime: 0,
            uResolution: {x: screen.width, y: screen.height}
            
           
        },
        vertexShader,
        fragmentShader,
    
        
    )
    extend({PointMaterial})

    console.log(PointMaterial)

const ref = useRef()
// Hold state for hovered and clicked events
const [hovered, hover] = useState(false)
const [clicked, click] = useState(false)




const pointMaterial = useRef()
useFrame((state, delta) => {
   pointMaterial.current.uTime += delta

    if (
     pointMaterial.current.uResolution.x === 0 &&
     pointMaterial.current.uResolution.y === 0
    ) {
     pointMaterial.current.uResolution.x = screen.width;
     pointMaterial.current.uResolution.y = screen.height;
     
    }
})




    return(

<>
<OrbitControls makeDefault enableZoom={true}/>




        <Points position={[0, -10, 0]} positions={box.attributes.position.array} stride={3} ref={ref} rotation-x={Math.PI *  1.} >
        <pointMaterial ref={pointMaterial} depthWrite={false} transparent />
    </Points>

       
    

 
      </>
    )
}