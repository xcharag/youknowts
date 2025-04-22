// src/editor/TShirtModel.tsx
import { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { ObjectMap } from "@react-three/fiber"
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js"

interface TShirtModelProps {
    color?: string
    textureImage?: string
}

export function TShirtModel({ color = '#FFFFFF', textureImage }: TShirtModelProps) {
    const group = useRef<THREE.Group>(null)
    const [modelError, setModelError] = useState(false)
    const [texture, setTexture] = useState<THREE.Texture | null>(null)

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

    // Load texture if provided
    useEffect(() => {
        if (textureImage) {
            const loader = new THREE.TextureLoader()
            loader.load(textureImage,
                (loadedTexture) => {
                    loadedTexture.flipY = true
                    setTexture(loadedTexture)
                    console.log('Texture loaded successfully')
                },
                undefined,
                (error) => console.error('Error loading texture:', error)
            )
        } else {
            setTexture(null)
        }
    }, [textureImage])

// Create a new material with the selected color and texture
    useEffect(() => {
        if (modelData?.scene) {
            modelData.scene.traverse((node: THREE.Object3D) => {
                if (node instanceof THREE.Mesh) {
                    const material = new THREE.MeshStandardMaterial({
                        color: new THREE.Color(color),
                        roughness: 0.7,
                        metalness: 0.1,
                    })

                    // Apply texture if available
                    if (texture) {
                        material.map = texture
                        material.needsUpdate = true
                    }

                    node.material = material
                    console.log('Applied material to:', node.name)
                }
            })
        }
    }, [color, texture, modelData?.scene])

    return (
        <group ref={group}>
            {modelError ? (
                // Fallback box if model fails to load
                <mesh>
                    <boxGeometry args={[1, 1.5, 0.5]} />
                    <meshStandardMaterial color={color} map={texture || undefined} />
                </mesh>
            ) : (
                modelData?.scene ? <primitive object={modelData.scene} scale={1} /> : null
            )}
        </group>
    )
}

// Try to preload the model
useGLTF.preload('/tshirt.glb')