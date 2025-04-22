// src/community/CommentsDialog.tsx
import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import placeholderImage from '@/assets/placeholder.svg'

interface Comment {
    id: number
    author: string
    content: string
    time: string
}

interface Post {
    id: number
    author: string
    role: string
    time: string
    content: string
    image: string
    likes: number
    comments: Comment[]
}

interface CommentsDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    post: Post | null
}

export function CommentsDialog({ open, onOpenChange, post }: CommentsDialogProps) {
    const [commentText, setCommentText] = useState('')

    const handleAddComment = () => {
        if (!commentText.trim()) return

        // Here you would typically send the comment to your API
        console.log('Adding comment:', commentText)

        // Clear input after sending
        setCommentText('')
    }

    if (!post) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-white">Comentarios</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    {/* Original post summary */}
                    <div className="flex items-center gap-3 pb-2 border-b">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={placeholderImage} />
                            <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm text-[#dbe9ff]">{post.author}</span>
                        <p className="text-sm text-muted-foreground">{post.content}</p>
                    </div>

                    {/* Comments list */}
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                        {post.comments.length > 0 ? (
                            post.comments.map(comment => (
                                <div key={comment.id} className="flex gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={placeholderImage} />
                                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-sm text-[#dbe9ff]">{comment.author}</span>
                                            <span className="text-xs text-muted-foreground">hace {comment.time}</span>
                                        </div>
                                        <p className="text-sm text-white">{comment.content}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground text-sm">No hay comentarios todavía. ¡Sé el primero!</p>
                        )}
                    </div>

                    {/* Comment input */}
                    <div className="flex items-center gap-3 pt-2 mt-auto">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback>YO</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                            <Input
                                placeholder="Añade un comentario..."
                                className="flex-1 bg-white"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                            />
                            <Button size="sm" onClick={handleAddComment}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}