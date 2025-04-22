// src/editor/Canvas3D.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid } from '@react-three/drei'
import { TShirtModel } from './TShirtModel'
import { Suspense } from 'react'

export function Canvas3D({ color = '#FFFFFF', view = 'front' }) {
    // Calculate rotation based on view
    const rotation = view === 'front' ? [0, 0, 0] : [0, Math.PI, 0]

    return (
        <Canvas
            camera={{ position: [0, 0, 2.5], fov: 50 }}
            shadows
        >
            {/* Lighting */}
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />

            {/* Helper elements for debugging */}
            <Grid infiniteGrid position={[0, -0.5, 0]} />
            <axesHelper args={[5]} />

            {/* Model */}
            <Suspense fallback={null}>
                <group rotation={[0, rotation[1], 0]} position={[0, 0, 0]}>
                    <TShirtModel color={color} />
                </group>
                <Environment preset="city" />
            </Suspense>

            <OrbitControls makeDefault />
        </Canvas>
    )
}