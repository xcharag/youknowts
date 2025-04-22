// src/test/page.tsx
import { useState, useEffect } from 'react'
import { Canvas3D } from '@/editor/Canvas3D'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function TestPage() {
    const [color, setColor] = useState('#FFFFFF')
    const [view, setView] = useState<'front' | 'back'>('front')

    const colors = [
        '#FFFFFF', '#000000', '#FF0000', '#00FF00',
        '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'
    ]

    useEffect(() => {
        console.log("Model should load with color:", color)
    }, [])

    return (
        <div className="container py-8 mx-auto">
            <h1 className="text-3xl font-bold mb-6">3D Model Test Page</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    {/* Make sure height is sufficient */}
                    <Card className="w-full h-[600px] overflow-hidden relative">
                        <Canvas3D color={color} view={view} />
                    </Card>
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-medium mb-3">View Controls</h2>
                        <div className="flex gap-2">
                            <Button
                                variant={view === 'front' ? 'default' : 'outline'}
                                onClick={() => setView('front')}
                            >
                                Front View
                            </Button>
                            <Button
                                variant={view === 'back' ? 'default' : 'outline'}
                                onClick={() => setView('back')}
                            >
                                Back View
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-medium mb-3">Color Controls</h2>
                        <div className="grid grid-cols-4 gap-2">
                            {colors.map(c => (
                                <button
                                    key={c}
                                    className="w-12 h-12 rounded-md border-2 transition-all"
                                    style={{
                                        backgroundColor: c,
                                        borderColor: color === c ? '#60a5fa' : 'transparent',
                                        transform: color === c ? 'scale(1.1)' : 'scale(1)'
                                    }}
                                    onClick={() => setColor(c)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}