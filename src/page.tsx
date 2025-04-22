// src/page.tsx
import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import placeholderImage from './assets/placeholder.svg'

export function HomePage() {
    return (
        <div className="flex flex-col gap-12 pb-8">
            {/* Hero Section */}
            <section className="w-full py-12 md:py-24 lg:py-32 bg-background border-y">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                <span className="inline-flex px-3 py-1 text-sm rounded-full border border-gray-700 text-gray-200 w-fit">
                  Nueva Colección
                </span>
                                <h1 className="text-3xl font-bold tracking-tighter text-[#60a5fa] sm:text-5xl xl:text-6xl/none">
                                    Diseña Tu Camiseta Perfecta
                                </h1>
                                <p className="max-w-[600px] text-gray-300 md:text-xl">
                                    Crea diseños personalizados, comparte con la comunidad y viste tu creatividad.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                                <Link to="/editor"
                                      className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90">
                                    Empezar a Diseñar
                                </Link>
                                <Link to="/community"
                                      className="rounded-md border px-4 py-2 text-[#60a5fa] hover:bg-[#60a5fa]/10 border-[#60a5fa]">
                                    Explorar Comunidad
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <img
                                src={placeholderImage}
                                alt="Muestra de diseños de camisetas"
                                className="rounded-lg object-cover w-[500px] h-[500px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Designs */}
            <section className="container px-4 md:px-6 py-8">
                <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-white">Diseños Destacados</h2>
                        <Link to="#"
                              className="flex items-center text-sm font-medium text-blue-400 hover:text-blue-300">
                            Ver todos <ArrowRight className="ml-1 h-4 w-4"/>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item}
                                 className="rounded-lg border bg-background hover:bg-accent/10 transition-colors cursor-pointer"
                                 onClick={() => window.location.href = '#'} // To use React Router, replace with: navigate('/test')
                            >
                                <div className="relative aspect-square">
                                    <img
                                        src={placeholderImage}
                                        alt={`Diseño destacado ${item}`}
                                        className="object-cover w-full h-full transition-all hover:scale-105"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-white">Estilo Urbano {item}</h3>
                                            <p className="text-sm text-gray-300">Por Diseñador{item}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                                            <span
                                                className="ml-1 text-sm font-medium text-[#60a5fa]">{4.5 + item * 0.1}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container px-4 md:px-6 py-12">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">¿Listo para crear tu
                            propio
                            diseño?</h2>
                        <p className="max-w-[600px] text-gray-300 md:text-xl">
                            Únete a nuestra comunidad de diseñadores y comienza a crear tus propias camisetas
                            personalizadas.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link to="/register" className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90">
                            Registrarse Ahora
                        </Link>
                        <Link to="/editor" className="rounded-md border px-4 py-2 text-[#60a5fa] hover:bg-[#60a5fa]/10 border-[#60a5fa]">
                            Probar el Editor
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}