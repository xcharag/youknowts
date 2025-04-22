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

// src/editor/TShirtModel.tsx
export function TShirtModel({ textureImage }: TShirtModelProps) {
    const group = useRef<THREE.Group>(null)
    const [modelError, setModelError] = useState(false)
    const [texture, setTexture] = useState<THREE.Texture | null>(null)
    // Store materials reference to avoid recreation
    const materialsRef = useRef<Map<THREE.Mesh, THREE.MeshStandardMaterial>>(new Map())

    // Load the model
    let modelData = null as unknown as GLTF & ObjectMap
    try {
        const loaded = useGLTF('/tshirt.glb')
        modelData = Array.isArray(loaded) ? loaded[0] : loaded
    } catch (error) {
        console.error('Error loading model:', error)
        setModelError(true)
    }

    // Initialize white materials once when model loads
    useEffect(() => {
        if (!modelData?.scene) return;

        materialsRef.current.clear();

        modelData.scene.traverse((node) => {
            if (node instanceof THREE.Mesh) {
                // Always create white material
                const material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#FFFFFF'),
                    roughness: 0.7,
                    metalness: 0.1,
                });
                node.material = material;
                materialsRef.current.set(node, material);
            }
        });

        return () => {
            // Clean up materials
            materialsRef.current.forEach(material => material.dispose());
            materialsRef.current.clear();
        };
    }, [modelData?.scene]);

    // Handle texture loading and application
    useEffect(() => {
        if (textureImage) {
            if (texture) texture.dispose();

            new THREE.TextureLoader().load(
                textureImage,
                (loadedTexture) => {
                    loadedTexture.flipY = false;
                    loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
                    loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
                    loadedTexture.anisotropy = 16;
                    setTexture(loadedTexture);

                    // Apply texture to existing materials
                    materialsRef.current.forEach(material => {
                        material.map = loadedTexture;
                        material.needsUpdate = true;
                    });
                },
                undefined,
                (error) => console.error('Error loading texture:', error)
            );
        }

        return () => {
            if (texture) texture.dispose();
        };
    }, [textureImage]);

    return (
        <group ref={group}>
            {modelError ? (
                <mesh>
                    <boxGeometry args={[1, 1.5, 0.5]} />
                    <meshStandardMaterial color="#FFFFFF" map={texture || undefined} />
                </mesh>
            ) : (
                modelData?.scene ? <primitive object={modelData.scene} scale={1} /> : null
            )}
        </group>
    )
}

// Preload the model
useGLTF.preload('/tshirt.glb')