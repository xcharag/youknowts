import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import {Link, useLocation} from 'react-router-dom';
import youknowlogo from '/youknowlogo.svg'

interface NavItem {
    label: string
    href: string
}

const navigation: NavItem[] = [
    { label: 'Pagina Principal', href: '/' },
    { label: '3D Editor', href: '/editor' },
    { label: 'Comunidad', href: '/community' }
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();

    return (
        <nav className="bg-gray-500/40 backdrop-blur-sm rounded-lg m-4">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img src={youknowlogo} alt="You Know Logo" className="w-auto" style={{height:'100px'}}/>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-4">
                                {navigation.map((item) => {
                                    const isActive = location.pathname === item.href
                                    return (
                                        <Link to={item.href}
                                            key={item.label}
                                            className={`rounded-md px-3 py-2 text-sm font-medium ${
                                                isActive
                                                    ? 'text-white font-bold bg-accent/50'
                                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => {
                                const isActive = window.location.pathname === item.href
                                return (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className={`block rounded-md px-3 py-2 text-base font-medium ${
                                            isActive
                                                ? 'text-white font-bold bg-accent/50'
                                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                        }`}
                                    >
                                        {item.label}
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}