// src/editor/TShirtModel.tsx
import { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import {ObjectMap} from "@react-three/fiber";
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader.js";

export function TShirtModel({ color = '#FFFFFF' }) {
    const group = useRef<THREE.Group>(null)
    const [modelError, setModelError] = useState(false)

    // Log loading attempt
    console.log('Attempting to load model from: /tshirt.glb')

    // Load the model
    let modelData = null as unknown as GLTF & ObjectMap
    try {
        const loaded = useGLTF('/tshirt.glb')
        modelData = Array.isArray(loaded) ? loaded[0] : loaded
        console.log('Model data:', modelData)
    } catch (error) {
        console.error('Error loading model:', error)
        setModelError(true)
    }

    // Create a new material with the selected color
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.7,
        metalness: 0.1,
    })

    useEffect(() => {
        if (modelData?.scene) {
            // Apply material to all meshes
            modelData.scene.traverse((node: THREE.Object3D) => {
                if (node instanceof THREE.Mesh) {
                    node.material = material
                    console.log('Applied material to:', node.name)
                }
            })
        }
    }, [color, modelData?.scene])

    return (
        <group ref={group}>
            {modelError ? (
                // Fallback box if model fails to load
                <mesh material={material}>
                    <boxGeometry args={[1, 1.5, 0.5]} />
                </mesh>
            ) : (
                modelData?.scene ? <primitive object={modelData.scene} scale={1} /> : null
            )}
        </group>
    )
}

// Try to preload the model
useGLTF.preload('/tshirt.glb')