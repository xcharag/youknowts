// src/editor/page.tsx
import { Link } from 'react-router-dom'
import {
    Save,
    Share,
    Download,
    Type,
    ImageIcon,
    Palette,
    Shapes,
    Layers,
    Undo,
    Redo,
    ZoomIn,
    ZoomOut,
    Shirt
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React from "react";

export function EditorPage() {
    const [fontSize, setFontSize] = React.useState(16)
    return (
        <div className="container py-4 md:py-8 mx-auto px-2 md:px-4">
            <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold">Diseñador de Camisetas</h1>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="secondary" size="sm">
                            <Undo className="mr-2 h-4 w-4" />
                            Deshacer
                        </Button>
                        <Button variant="secondary" size="sm">
                            <Redo className="mr-2 h-4 w-4" />
                            Rehacer
                        </Button>
                        <Button variant="secondary" size="sm">
                            <Save className="mr-2 h-4 w-4" />
                            Guardar
                        </Button>
                        <Button variant="default" size="sm">
                            <Share className="mr-2 h-4 w-4" />
                            Compartir
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Left Toolbar */}
                    <Card className="md:col-span-1 border shadow">
                        <CardContent className="p-3 md:p-4">
                            <Tabs defaultValue="text">
                                <TabsList className="grid w-full grid-cols-4 bg-muted">
                                    <TabsTrigger value="text" className="data-[state=active]:bg-[#dbe9ff] data-[state=active]:text-[#1d4ed8]">
                                        <Type className="h-4 w-4" />
                                    </TabsTrigger>
                                    <TabsTrigger value="images" className="data-[state=active]:bg-[#dbe9ff] data-[state=active]:text-[#1d4ed8]">
                                        <ImageIcon className="h-4 w-4" />
                                    </TabsTrigger>
                                    <TabsTrigger value="shapes" className="data-[state=active]:bg-[#dbe9ff] data-[state=active]:text-[#1d4ed8]">
                                        <Shapes className="h-4 w-4" />
                                    </TabsTrigger>
                                    <TabsTrigger value="layers" className="data-[state=active]:bg-[#dbe9ff] data-[state=active]:text-[#1d4ed8]">
                                        <Layers className="h-4 w-4" />
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="text" className="space-y-4 mt-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="text-input">Agregar Texto</Label>
                                        <Input id="text-input" placeholder="Ingresa tu texto" className="bg-white"/>
                                        <Button className="w-full bg-[#60a5fa] text-white hover:bg-[#60a5fa]/80">Agregar
                                            Texto</Button>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label>Tamaño de Fuente</Label>
                                            <span
                                                className="text-sm font-medium text-[#1d4ed8] bg-[#dbe9ff] px-2 py-0.5 rounded">{fontSize}px</span>
                                        </div>
                                        <Slider
                                            defaultValue={[fontSize]}
                                            max={72}
                                            step={1}
                                            onValueChange={(value) => setFontSize(value[0])}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Familia de Fuente</Label>
                                        <Select>
                                            <SelectTrigger className="bg-white">
                                                <SelectValue placeholder="Seleccionar fuente"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="arial">Arial</SelectItem>
                                                <SelectItem value="helvetica">Helvetica</SelectItem>
                                                <SelectItem value="times">Times New Roman</SelectItem>
                                                <SelectItem value="comic">Comic Sans MS</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </TabsContent>
                                <TabsContent value="images" className="space-y-4 mt-3">
                                    <div className="space-y-2">
                                        <Label>Subir Imagen</Label>
                                        <Input type="file" className="bg-white"/>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <Card key={i} className="cursor-pointer hover:border-[#60a5fa] border bg-white">
                                                <CardContent className="p-2">
                                                    <div className="aspect-square bg-white rounded-md flex items-center justify-center">
                                                        <span className="text-xs text-muted-foreground">Imagen {i}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="shapes" className="space-y-4 mt-3">
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Círculo', 'Cuadrado', 'Triángulo', 'Estrella', 'Corazón', 'Rombo'].map((shape) => (
                                            <Card key={shape} className="cursor-pointer hover:border-[#60a5fa] border bg-white">
                                                <CardContent className="p-2">
                                                    <div className="aspect-square bg-white rounded-md flex items-center justify-center">
                                                        <span className="text-xs text-center text-muted-foreground">{shape}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="layers" className="space-y-4 mt-3">
                                    <div className="space-y-2 bg-white rounded-md p-2 border">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Capa 1: Texto</span>
                                            <Button variant="ghost" size="sm">
                                                <Layers className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2 bg-white rounded-md p-2 border">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Capa 2: Imagen</span>
                                            <Button variant="ghost" size="sm">
                                                <Layers className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Main Canvas Area */}
                    <Card className="md:col-span-2 border shadow">
                        <CardContent className="p-3 md:p-4">
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Button variant="secondary" size="sm">
                                        <ZoomOut className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm">100%</span>
                                    <Button variant="secondary" size="sm">
                                        <ZoomIn className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="relative w-full aspect-[3/4] bg-background rounded-lg border shadow-sm flex items-center justify-center">
                                    <div className="text-muted-foreground">
                                        Visualización 3D de la Camiseta Aparecerá Aquí
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="secondary">Vista Frontal</Button>
                                    <Button variant="secondary">Vista Trasera</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right Panel */}
                    <Card className="md:col-span-3 lg:col-span-1 border shadow">
                        <CardContent className="p-3 md:p-4">
                            <Tabs defaultValue="colors">
                                <TabsList className="grid w-full grid-cols-2 bg-muted">
                                    <TabsTrigger value="colors" className="data-[state=active]:bg-[#dbe9ff] data-[state=active]:text-[#1d4ed8]">
                                        <Palette className="mr-2 h-4 w-4" />
                                        Colores
                                    </TabsTrigger>
                                    <TabsTrigger value="templates" className="data-[state=active]:bg-[#dbe9ff] data-[state=active]:text-[#1d4ed8]">
                                        <Shirt className="mr-2 h-4 w-4" />
                                        Plantillas
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="colors" className="mt-3 space-y-4">
                                    <div className="space-y-2">
                                        <Label>Color de Camiseta</Label>
                                        <div className="grid grid-cols-6 gap-2">
                                            {['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#888888', '#CCCCCC', '#663399', '#336699'].map(color => (
                                                <div key={color} className="aspect-square rounded-md cursor-pointer border hover:border-primary" style={{ backgroundColor: color }}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Color de Texto</Label>
                                        <div className="grid grid-cols-6 gap-2">
                                            {['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'].map(color => (
                                                <div key={color} className="aspect-square rounded-md cursor-pointer border hover:border-primary" style={{ backgroundColor: color }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="templates" className="mt-3 space-y-4">
                                    <div className="grid grid-cols-2 gap-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <Card key={i} className="cursor-pointer hover:border-[#60a5fa] border bg-white">
                                                <CardContent className="p-2">
                                                    <div className="aspect-square bg-white rounded-md flex items-center justify-center">
                                                        <span className="text-xs text-muted-foreground">Plantilla {i}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-4">
                    <Button variant="secondary">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar Diseño
                    </Button>
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <Button variant="secondary">Cancelar</Button>
                        </Link>
                        <Button variant="default">Guardar y Continuar</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}