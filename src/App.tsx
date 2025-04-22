// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/navbar'
import { HomePage } from '@/page'
import { EditorPage } from '@/editor/page'
import { CommunityPage } from '@/community/page'
import './App.css'

function App() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/editor" element={<EditorPage />} />
                <Route path="/community" element={<CommunityPage />} />
            </Routes>
        </div>
    )
}

export default App