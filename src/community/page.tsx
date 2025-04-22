// src/community/page.tsx
import { Heart, MessageSquare, Share2, Filter, TrendingUp, Clock, Star, Search, PlusCircle, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import placeholderImage from '@/assets/placeholder.svg'
import {CommentsDialog} from "@/community/CommentsDialog.tsx";
import {useState} from "react";

export function CommunityPage() {
    const [commentModalOpen, setCommentModalOpen] = useState(false)
    const [currentPost, setCurrentPost] = useState<Post | null>(null)

    // Sample data for posts and comments
    const posts = [
        {
            id: 1,
            author: 'Laura Martínez',
            role: 'Diseñador',
            time: '2 horas',
            content: '¡Acabo de terminar mi último diseño! ¿Qué les parece? 🔥',
            image: placeholderImage,
            likes: 124,
            comments: [
                {id: 1, author: 'Carlos Rodríguez', content: 'Me encanta el uso del color!', time: '1 hora'},
                {id: 2, author: 'Ana García', content: 'Muy creativo, ¿qué software usaste?', time: '30 minutos'}
            ]
        },
        // Add more posts as needed
    ]

    interface Comment {
        id: number;
        author: string;
        content: string;
        time: string;
    }

    interface Post {
        id: number;
        author: string;
        role: string;
        time: string;
        content: string;
        image: string;
        likes: number;
        comments: Comment[];
    }

    const openComments = (post: Post) => {
        setCurrentPost(post)
        setCommentModalOpen(true)
    }
    return (
        <div className="container py-4 md:py-8 mx-auto px-2 md:px-4">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <Users className="h-8 w-8 text-[#dbe9ff]"/>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#dbe9ff]">Comunidad</h1>
                        </div>
                        <p className="text-muted-foreground">Descubre y comparte diseños con otros creadores</p>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Buscar diseños..." className="w-full md:w-[200px] pl-8 bg-white" />
                        </div>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Crear Publicación
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="trending">
                    <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex bg-muted">
                        <TabsTrigger value="trending" className="data-[state=active]:bg-[#dbe9ff] data-[state=active]:text-[#1d4ed8]">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Tendencias
                        </TabsTrigger>
                        <TabsTrigger value="latest" className="data-[state=active]:bg-[#dbe9ff] data-[state=active]:text-[#1d4ed8]">
                            <Clock className="mr-2 h-4 w-4" />
                            Recientes
                        </TabsTrigger>
                        <TabsTrigger value="popular" className="data-[state=active]:bg-[#dbe9ff] data-[state=active]:text-[#1d4ed8]">
                            <Star className="mr-2 h-4 w-4" />
                            Populares
                        </TabsTrigger>
                        <TabsTrigger value="following" className="data-[state=active]:bg-[#dbe9ff] data-[state=active]:text-[#1d4ed8]">
                            <Heart className="mr-2 h-4 w-4" />
                            Seguidos
                        </TabsTrigger>
                    </TabsList>
                    <div className="flex items-center justify-between my-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <Button variant="outline" size="sm" className="bg-white">
                                <Filter className="mr-2 h-4 w-4" />
                                Filtrar
                            </Button>
                            <Badge variant="outline" className="cursor-pointer bg-[#dbe9ff] text-[#1d4ed8]">
                                Camisetas
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer bg-[#dbe9ff] text-[#1d4ed8]">
                                Diseños
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer bg-[#dbe9ff] text-[#1d4ed8]">
                                Arte
                            </Badge>
                        </div>
                    </div>
                    <TabsContent value="trending" className="space-y-6">
                        {/* Post with Image */}
                        <Card className="border shadow">
                            <CardHeader className="flex flex-row items-center gap-4 p-4">
                                <Avatar>
                                    <AvatarImage src={placeholderImage} alt="@usuario1" />
                                    <AvatarFallback>U1</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Laura Martínez</span>
                                        <Badge variant="secondary" className="text-xs">
                                            Diseñadora
                                        </Badge>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Publicado hace 2 horas</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="mb-4">¡Acabo de terminar mi último diseño! ¿Qué les parece? 🔥</p>
                                <div className="relative aspect-video overflow-hidden rounded-lg">
                                    <img
                                        src={placeholderImage}
                                        alt="Diseño de camiseta"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between p-4 pt-0">
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <Heart className="h-4 w-4" />
                                        <span>124</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-1"
                                        onClick={() => openComments(posts[0])}
                                    >
                                        <MessageSquare className="h-4 w-4" />
                                        <span>2</span>
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button variant="outline" size="sm" className="bg-white">
                                    Ver Diseño
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Text Post */}
                        <Card className="border shadow">
                            <CardHeader className="flex flex-row items-center gap-4 p-4">
                                <Avatar>
                                    <AvatarImage src={placeholderImage} alt="@usuario2" />
                                    <AvatarFallback>U2</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Carlos Rodríguez</span>
                                        <Badge variant="secondary" className="text-xs">
                                            Miembro
                                        </Badge>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Publicado hace 5 horas</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p>
                                    Busco opiniones sobre mi nuevo enfoque de diseño minimalista. He estado experimentando con formas geométricas simples y paletas de colores limitadas. ¿Alguien más ha probado este estilo para camisetas?
                                </p>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between p-4 pt-0">
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <Heart className="h-4 w-4" />
                                        <span>56</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>18</span>
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>

                        {/* Post with Multiple Images */}
                        <Card className="border shadow">
                            <CardHeader className="flex flex-row items-center gap-4 p-4">
                                <Avatar>
                                    <AvatarImage src={placeholderImage} alt="@usuario3" />
                                    <AvatarFallback>U3</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Ana García</span>
                                        <Badge variant="secondary" className="text-xs">
                                            Artista Destacada
                                        </Badge>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Publicado ayer</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="mb-4">
                                    ¡Mi nueva colección ya está disponible! Miren estos diseños inspirados en arquitectura urbana.
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                                            <img
                                                src={placeholderImage}
                                                alt={`Diseño ${i}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between p-4 pt-0">
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <Heart className="h-4 w-4" />
                                        <span>248</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>42</span>
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white">
                                    Ver Colección
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="latest" className="space-y-6">
                        <Card className="border shadow">
                            <CardHeader className="flex flex-row items-center gap-4 p-4">
                                <Avatar>
                                    <AvatarImage src={placeholderImage} alt="@usuario4" />
                                    <AvatarFallback>U4</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Miguel Sánchez</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Publicado hace 30 minutos</span>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="mb-4">¡Recién me uno a la comunidad! Pronto compartiré mis diseños.</p>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between p-4 pt-0">
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <Heart className="h-4 w-4" />
                                        <span>12</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-1">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>5</span>
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="popular" className="space-y-6">
                        {/* Contenido para posts populares */}
                    </TabsContent>

                    <TabsContent value="following" className="space-y-6">
                        {/* Contenido para posts seguidos */}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Comments Dialog Component */}
            <CommentsDialog
                open={commentModalOpen}
                onOpenChange={setCommentModalOpen}
                post={currentPost}
            />
        </div>
    )
}