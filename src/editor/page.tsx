// src/editor/page.tsx
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Save, Share, Download, Type, ImageIcon, Palette,
    Shapes, Layers, Undo, Redo, ZoomIn, ZoomOut, Shirt, XCircle
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Canvas3D } from './Canvas3D'

export function EditorPage() {
    // State for the t-shirt customization
    const [fontSize, setFontSize] = useState(16)
    const [fontFamily, setFontFamily] = useState('arial')
    const [tshirtColor, setTshirtColor] = useState('#FFFFFF')
    const [textColor, setTextColor] = useState('#FFFFFF')
    const [textInput, setTextInput] = useState('')
    const [textElements, setTextElements] = useState<{text: string, font: string, size: number, color: string}[]>([])
    const [view, setView] = useState<'front' | 'back'>('front')

    // State for uploaded images
    const [uploadedImage, setUploadedImage] = useState<string | null>(null)
    const [canvasTexture, setCanvasTexture] = useState<string | null>(null)

    // Reference to the canvas for image generation
    const canvasRef = useRef<HTMLCanvasElement>(null)

// Change these initial values
    const [imagePosition, setImagePosition] = useState(0.5); // Center vertically
    const [imageHorizontalPosition, setImageHorizontalPosition] = useState(0.5); // Center horizontally
    const [imageRotation, setImageRotation] = useState(0); // 0 degrees rotation
    const [imageScale, setImageScale] = useState(0.2); // 20% size instead of 50%

    // Handle text addition
    const addText = () => {
        if (!textInput.trim()) return

        setTextElements([
            ...textElements,
            {
                text: textInput,
                font: fontFamily,
                size: fontSize,
                color: textColor
            }
        ])

        setTextInput('')
        updateCanvasTexture()
    }

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            if (typeof event.target?.result === 'string') {
                setUploadedImage(event.target.result)
            }
        }
        reader.readAsDataURL(file)
    }

    // Update canvas texture whenever elements change
    useEffect(() => {
        updateCanvasTexture()
    }, [textElements, uploadedImage, view, imagePosition, imageHorizontalPosition, imageScale, imageRotation])

    // Generate texture from canvas
    const updateCanvasTexture = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas with transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Transparent background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw uploaded image if available
        if (uploadedImage) {
            const img = new Image();
            img.onload = () => {
                // Clear canvas again before drawing
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate dimensions based on the t-shirt print area
                const maxWidth = canvas.width * 0.6;
                const scale = imageScale * 1.5;

                // Calculate dimensions
                const width = Math.min(img.width, maxWidth) * scale;
                const height = (width / img.width) * img.height;

                // Position: fixed to use correct vertical and horizontal positioning
                const x = (canvas.width * 0.5) + (canvas.width * 0.4 * (imageHorizontalPosition - 0.5));
                const y = (canvas.height * 0.3) + (canvas.height * 0.4 * imagePosition);

                // Save context state
                ctx.save();

                // Move to the position where we want the center of the image
                ctx.translate(x, y);

                // Apply rotation (convert degrees to radians)
                ctx.rotate(imageRotation * Math.PI / 180);

                // Draw the image centered at the rotation point
                ctx.drawImage(img, -width / 2, -height / 2, width, height);

                // Restore context state
                ctx.restore();

                // Draw text elements
                drawTextElements(ctx);

                // Update texture
                setCanvasTexture(canvas.toDataURL());
            };
            img.src = uploadedImage;
        } else {
            // Just draw text elements
            drawTextElements(ctx);
            setCanvasTexture(canvas.toDataURL());
        }
    };

    // Draw text elements on canvas
    const drawTextElements = (ctx: CanvasRenderingContext2D) => {
        textElements.forEach((element) => {
            ctx.font = `${element.size}px ${element.font}`
            ctx.fillStyle = element.color
            ctx.textAlign = 'center'
            ctx.fillText(element.text, ctx.canvas.width / 2, ctx.canvas.height / 2)
        })
    }

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
                                        <Input
                                            id="text-input"
                                            placeholder="Ingresa tu texto"
                                            className="bg-white"
                                            value={textInput}
                                            onChange={(e) => setTextInput(e.target.value)}
                                        />
                                        <Button
                                            className="w-full bg-[#60a5fa] text-white hover:bg-[#60a5fa]/80"
                                            onClick={addText}
                                        >
                                            Agregar Texto
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label>Tamaño de Fuente</Label>
                                            <span className="text-sm font-medium text-[#1d4ed8] bg-[#dbe9ff] px-2 py-0.5 rounded">
                                                {fontSize}px
                                            </span>
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
                                        <Select value={fontFamily} onValueChange={setFontFamily}>
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
                                        <Input
                                            type="file"
                                            className="bg-white"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                    {uploadedImage && (
                                        <>
                                            <div className="border rounded-md p-2">
                                                <img
                                                    src={uploadedImage}
                                                    alt="Uploaded"
                                                    className="w-full h-auto max-h-40 object-contain"
                                                />
                                                <Button
                                                    className="w-full mt-2"
                                                    variant="destructive"
                                                    onClick={() => setUploadedImage(null)}
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>

                                            {/* Image position control */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <Label>Posición Vertical</Label>
                                                    <span
                                                        className="text-sm font-medium text-[#1d4ed8] bg-[#dbe9ff] px-2 py-0.5 rounded">
                                                        {Math.round(imagePosition * 100)}%
                                                    </span>
                                                </div>
                                                <Slider
                                                    value={[imagePosition * 100]}
                                                    max={100}
                                                    step={1}
                                                    onValueChange={(value) => setImagePosition(value[0] / 100)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <Label>Posición Horizontal</Label>
                                                    <span
                                                        className="text-sm font-medium text-[#1d4ed8] bg-[#dbe9ff] px-2 py-0.5 rounded">
                                                        {Math.round(imageHorizontalPosition * 100)}%
                                                    </span>
                                                </div>
                                                <Slider
                                                    value={[imageHorizontalPosition * 100]}
                                                    max={100}
                                                    step={1}
                                                    onValueChange={(value) => setImageHorizontalPosition(value[0] / 100)}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <Label>Rotación</Label>
                                                    <span
                                                        className="text-sm font-medium text-[#1d4ed8] bg-[#dbe9ff] px-2 py-0.5 rounded">
                                                        {Math.round(imageRotation)}°
                                                    </span>
                                                </div>
                                                <Slider
                                                    value={[imageRotation]}
                                                    min={-180}
                                                    max={180}
                                                    step={1}
                                                    onValueChange={(value) => setImageRotation(value[0])}
                                                />
                                            </div>

                                            {/* Image size control */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <Label>Tamaño</Label>
                                                    <span
                                                        className="text-sm font-medium text-[#1d4ed8] bg-[#dbe9ff] px-2 py-0.5 rounded">
                        {Math.round(imageScale * 100)}%
                    </span>
                                                </div>
                                                <Slider
                                                    value={[imageScale * 100]}
                                                    max={100}
                                                    step={1}
                                                    onValueChange={(value) => setImageScale(value[0] / 100)}
                                                />
                                            </div>
                                        </>
                                    )}
                                </TabsContent>
                                <TabsContent value="shapes" className="space-y-4 mt-3">
                                    {/* Shape content - unchanged */}
                                </TabsContent>
                                <TabsContent value="layers" className="space-y-4 mt-3">
                                    {textElements.map((element, index) => (
                                        <div key={index} className="space-y-2 bg-white rounded-md p-2 border">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm">Texto: {element.text}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newElements = [...textElements]
                                                        newElements.splice(index, 1)
                                                        setTextElements(newElements)
                                                    }}
                                                >
                                                    <XCircle className="h-4 w-4 text-destructive"/>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    {uploadedImage && (
                                        <div className="space-y-2 bg-white rounded-md p-2 border">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm">Imagen</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setUploadedImage(null)}
                                                >
                                                    <XCircle className="h-4 w-4 text-destructive"/>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
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

                                <div className="relative w-full aspect-[3/4] bg-[#60a5fa] rounded-lg border shadow-sm">
                                    <Canvas3D
                                        color={tshirtColor}
                                        textureImage={canvasTexture || undefined}
                                        view={view}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={view === 'front' ? 'default' : 'secondary'}
                                        onClick={() => setView('front')}
                                    >
                                        Vista Frontal
                                    </Button>
                                    <Button
                                        variant={view === 'back' ? 'default' : 'secondary'}
                                        onClick={() => setView('back')}
                                    >
                                        Vista Trasera
                                    </Button>
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
                                                <div
                                                    key={color}
                                                    className={`aspect-square rounded-md cursor-pointer border ${tshirtColor === color ? 'ring-2 ring-[#1d4ed8]' : 'hover:border-primary'}`}
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => setTshirtColor(color)}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Color de Texto</Label>
                                        <div className="grid grid-cols-6 gap-2">
                                            {['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'].map(color => (
                                                <div
                                                    key={color}
                                                    className={`aspect-square rounded-md cursor-pointer border ${textColor === color ? 'ring-2 ring-[#1d4ed8]' : 'hover:border-primary'}`}
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => setTextColor(color)}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="templates" className="mt-3 space-y-4">
                                    {/* Templates content - unchanged */}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Off-screen canvas for texture generation */}
                <canvas
                    ref={canvasRef}
                    width={1024}
                    height={1024}
                    style={{ display: 'none' }}
                />

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