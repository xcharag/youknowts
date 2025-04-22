// src/editor/Canvas3D.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { TShirtModel } from './TShirtModel'
import { Suspense } from 'react'

interface Canvas3DProps {
    color?: string
    textureImage?: string
    view?: 'front' | 'back'
}

// src/editor/Canvas3D.tsx
export function Canvas3D({ color = '#FFFFFF', textureImage, view = 'front' }: Canvas3DProps) {
    // Use the view parameter for rotation
    const rotation = view === 'front' ? [0, 0, 0] : [0, Math.PI, 0]

    return (
        <Canvas
            camera={{ position: [0, 0, 3.5], fov: 50 }}
            shadows
            frameloop="demand"  // Render only when needed
            dpr={[1, 2]}        // Optimize pixel ratio
        >
            {/* Lighting */}
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />

            {/* Model */}
            <Suspense fallback={<mesh><boxGeometry args={[1, 1.5, 0.05]} /><meshStandardMaterial color="gray" /></mesh>}>
                <group rotation={[0, rotation[1], 0]} position={[0, 0, 0]}>
                    <TShirtModel color={color} textureImage={textureImage} />
                </group>
                <Environment preset="city" />
            </Suspense>

            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.8} />
        </Canvas>
    )
}