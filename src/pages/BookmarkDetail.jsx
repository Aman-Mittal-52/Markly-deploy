import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@radix-ui/react-select';
import { Bell, BellRing, Bookmark, Calendar, Download, ExternalLink, Eye, Flag, MoreHorizontal, Share2, Tag, ThumbsDown, ThumbsUp } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import { Clock } from "lucide-react"

const RelatedBookmark = {
  id: "",
  title: "",
  thumbnail: "",
  author: "",
  views: "",
  timeAgo: ""
}



export function RelatedBookmarks({ bookmarks }) {
  return (
    <Card className="sticky top-30">
      <CardHeader>
        <CardTitle className="text-lg">Related Bookmarks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookmarks.map((bookmark) => (
          <a
            key={bookmark.id}
            href={`/bookmark/${bookmark.id}`}
            className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="relative flex-shrink-0">
              <img
                src={bookmark.thumbnail || "https://v0.dev/placeholder.svg"}
                alt={bookmark.title}
                className="w-24 h-16 object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-md" />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                {bookmark.title}
              </h4>

              <p className="text-xs text-muted-foreground">{bookmark.author}</p>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{bookmark.views}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{bookmark.timeAgo}</span>
                </div>
              </div>
            </div>
          </a>
        ))}

        <div className="pt-4 border-t">
          <Badge variant="outline" className="w-full justify-center cursor-pointer hover:bg-muted">
            Show More
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}



import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, MoreVertical, Heart } from "lucide-react"

const sampleComments = [
  {
    id: "1",
    author: {
      name: "WebDev_Sarah",
      avatar: "https://v0.dev/placeholder.svg?height=32&width=32",
      verified: false,
    },
    content:
      "This is exactly what I needed! The grid examples are so practical and well-explained. Thanks for sharing this amazing resource! 🔥",
    timeAgo: "2 hours ago",
    likes: 24,
    dislikes: 0,
    replies: 3,
    isLiked: false,
    isDisliked: false,
    isPinned: true,
  },
  {
    id: "2",
    author: {
      name: "CodeMaster_Pro",
      avatar: "https://v0.dev/placeholder.svg?height=32&width=32",
      verified: true,
    },
    content:
      "Great collection! I've been using CSS Grid for years and still learned something new from this. The responsive patterns section is particularly valuable.",
    timeAgo: "4 hours ago",
    likes: 18,
    dislikes: 1,
    replies: 1,
    isLiked: true,
    isDisliked: false,
  },
  {
    id: "3",
    author: {
      name: "DesignNewbie",
      avatar: "https://v0.dev/placeholder.svg?height=32&width=32",
      verified: false,
    },
    content:
      "As someone just starting with CSS Grid, this bookmark is a goldmine! Bookmarked for future reference. Do you have any beginner-friendly tutorials?",
    timeAgo: "6 hours ago",
    likes: 12,
    dislikes: 0,
    replies: 2,
    isLiked: false,
    isDisliked: false,
  },
]

export function CommentsSection({ bookmarkId, commentCount }) {
  const [comments, setComments] = useState(sampleComments)
  const [newComment, setNewComment] = useState("")
  const [sortBy, setSortBy] = useState("top")

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "https://v0.dev/placeholder.svg?height=32&width=32",
        verified: false,
      },
      content: newComment,
      timeAgo: "Just now",
      likes: 0,
      dislikes: 0,
      replies: 0,
      isLiked: false,
      isDisliked: false,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleLikeComment = (commentId) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            isDisliked: comment.isLiked ? comment.isDisliked : false,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
        }
        return comment
      }),
    )
  }

  const handleDislikeComment = (commentId) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isDisliked: !comment.isDisliked,
            isLiked: comment.isDisliked ? comment.isLiked : false,
            dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes + 1,
          }
        }
        return comment
      }),
    )
  }

  const sortedComments = [...comments].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1

    if (sortBy === "top") {
      return b.likes - a.likes
    } else {
      return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime()
    }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {commentCount} Comments
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant={sortBy === "top" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("top")}>
              Top
            </Button>
            <Button variant={sortBy === "newest" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("newest")}>
              Newest
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Comment */}
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://v0.dev/placeholder.svg?height=32&width=32" alt="You" />
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setNewComment("")}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSubmitComment} disabled={!newComment.trim()}>
                Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {sortedComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.author.avatar || "https://v0.dev/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment.author.name}</span>
                  {comment.author.verified && (
                    <div className="h-3 w-3 rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                  {comment.isPinned && (
                    <Badge variant="secondary" className="text-xs">
                      <Heart className="mr-1 h-3 w-3 fill-current" />
                      Pinned
                    </Badge>
                  )}
                </div>

                <p className="text-sm leading-relaxed">{comment.content}</p>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-2 ${comment.isLiked ? "text-blue-600" : ""}`}
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <ThumbsUp className="mr-1 h-3 w-3" />
                    {comment.likes > 0 && comment.likes}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 px-2 ${comment.isDisliked ? "text-red-600" : ""}`}
                    onClick={() => handleDislikeComment(comment.id)}
                  >
                    <ThumbsDown className="mr-1 h-3 w-3" />
                    {comment.dislikes > 0 && comment.dislikes}
                  </Button>

                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Reply
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {comment.replies > 0 && (
                  <Button variant="link" size="sm" className="p-0 h-auto text-blue-600">
                    View {comment.replies} {comment.replies === 1 ? "reply" : "replies"}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


const getBookmarkData = (id) => {
    return {
      id,
      title: "10 Amazing CSS Grid Layouts That Will Blow Your Mind",
      description: `Discover the most creative and practical CSS Grid layouts that professional developers use in their projects. From complex magazine layouts to simple card grids.
  
  In this comprehensive guide, we'll explore:
  • Advanced CSS Grid techniques used by top companies
  • Responsive design patterns that work across all devices  
  • Performance optimization tips for grid layouts
  • Real-world examples from popular websites
  • Common pitfalls and how to avoid them
  
  Whether you're a beginner looking to master CSS Grid or an experienced developer seeking inspiration, this collection will elevate your web design skills to the next level.`,
      url: "https://example.com/css-grid-layouts",
      thumbnail: "https://v0.dev/placeholder.svg?height=400&width=800",
      author: {
        name: "TechGuru",
        avatar: "https://v0.dev/placeholder.svg?height=48&width=48",
        subscribers: "125K",
        verified: true,
        bio: "Frontend developer sharing the latest web technologies and design trends. 5+ years building amazing user experiences.",
      },
      stats: {
        views: "45.2K",
        likes: 1250,
        dislikes: 23,
        comments: 89,
        shares: 156,
        saves: 234,
        publishedAt: "2 hours ago",
        category: "Technology",
      },
      tags: ["CSS", "Web Design", "Frontend", "Grid", "Responsive Design"],
      isLiked: false,
      isDisliked: false,
      isSaved: false,
      isSubscribed: false,
    }
  }
  
  const getRelatedBookmarks = () => {
    return [
      {
        id: "2",
        title: "Flexbox vs CSS Grid: When to Use What",
        thumbnail: "https://v0.dev/placeholder.svg?height=120&width=200",
        author: "CodeMaster",
        views: "32K",
        timeAgo: "1 day ago",
      },
      {
        id: "3",
        title: "Modern CSS Layout Techniques",
        thumbnail: "https://v0.dev/placeholder.svg?height=120&width=200",
        author: "WebDesignPro",
        views: "28K",
        timeAgo: "3 days ago",
      },
      {
        id: "4",
        title: "Responsive Design Best Practices 2024",
        thumbnail: "https://v0.dev/placeholder.svg?height=120&width=200",
        author: "TechGuru",
        views: "67K",
        timeAgo: "1 week ago",
      },
    ]
  }
  


function BookmarkDetail() {

const bookmark = getBookmarkData("1")
const relatedBookmarks = getRelatedBookmarks()

    const navigate = useNavigate()
    const [isLiked, setIsLiked] = useState(bookmark.isLiked)
    const [isDisliked, setIsDisliked] = useState(bookmark.isDisliked)
    const [isSaved, setIsSaved] = useState(bookmark.isSaved)
    const [isSubscribed, setIsSubscribed] = useState(bookmark.isSubscribed)
    const [showFullDescription, setShowFullDescription] = useState(false)



    
    const handleLike = () => {
        setIsLiked(!isLiked)
        if (isDisliked) setIsDisliked(false)
        // Here you would typically make an API call to update the like status
        console.log("Bookmark liked:", !isLiked)
      }
    
      const handleDislike = () => {
        setIsDisliked(!isDisliked)
        if (isLiked) setIsLiked(false)
        console.log("Bookmark disliked:", !isDisliked)
      }
    
      const handleSave = () => {
        setIsSaved(!isSaved)
        console.log("Bookmark saved:", !isSaved)
      }
    
      const handleSubscribe = () => {
        setIsSubscribed(!isSubscribed)
        console.log("Subscribed to author:", !isSubscribed)
      }
    
      const handleShare = () => {
        if (navigator.share) {
          navigator.share({
            title: bookmark.title,
            text: bookmark.description,
            url: window.location.href,
          })
        } else {
          navigator.clipboard.writeText(window.location.href)
          console.log("Link copied to clipboard")
        }
      }
    
      const handleVisitWebsite = () => {
        window.open(bookmark.url, "_blank", "noopener,noreferrer")
      }
    
      const handleAuthorClick = () => {
        navigate(`/channel/${bookmark.author.name.toLowerCase().replace(" ", "")}`)
      }
    
  return (

    <div className="flex flex-1 gap-6 p-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Bookmark Preview */}
        <Card className="overflow-hidden">
          <div className="relative">
            <img
              src={bookmark.thumbnail || "https://v0.dev/placeholder.svg"}
              alt={bookmark.title}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <Button
              size="lg"
              className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700"
              onClick={handleVisitWebsite}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Visit Website
            </Button>
          </div>
        </Card>

        {/* Title and Actions */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold leading-tight">{bookmark.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{bookmark.stats.views} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{bookmark.stats.publishedAt}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-full bg-muted">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-l-full ${isLiked ? "bg-blue-100 text-blue-600" : ""}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {bookmark.stats.likes + (isLiked ? 1 : 0)}
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-r-full ${isDisliked ? "bg-red-100 text-red-600" : ""}`}
                  onClick={handleDislike}
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  {bookmark.stats.dislikes + (isDisliked ? 1 : 0)}
                </Button>
              </div>

              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>

              <Button
                variant="outline"
                size="sm"
                className={isSaved ? "bg-red-50 text-red-600 border-red-200" : ""}
                onClick={handleSave}
              >
                <Bookmark className={`mr-2 h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                {isSaved ? "Saved" : "Save"}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => console.log("Download bookmark")}>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log("Report bookmark")}>
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Author Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 cursor-pointer" onClick={handleAuthorClick}>
                <AvatarImage src={bookmark.author.avatar || "https://v0.dev/placeholder.svg"} alt={bookmark.author.name} />
                <AvatarFallback>{bookmark.author.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={handleAuthorClick}
                    className="font-semibold hover:text-blue-600 transition-colors"
                  >
                    {bookmark.author.name}
                  </button>
                  {bookmark.author.verified && (
                    <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{bookmark.author.subscribers} subscribers</p>
                <p className="text-sm text-muted-foreground">{bookmark.author.bio}</p>
              </div>

              <Button
                className={`${
                  isSubscribed
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
                onClick={handleSubscribe}
              >
                {isSubscribed ? (
                  <>
                    <BellRing className="mr-2 h-4 w-4" />
                    Subscribed
                  </>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Subscribe
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Description and Tags */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{bookmark.stats.views} views</span>
                <span>•</span>
                <span>{bookmark.stats.publishedAt}</span>
                <span>•</span>
                <span>{bookmark.stats.saves} saves</span>
              </div>

              <div>
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {showFullDescription ? bookmark.description : `${bookmark.description.slice(0, 200)}...`}
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto text-blue-600"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {bookmark.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-blue-100"
                    onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <CommentsSection bookmarkId={bookmark.id} commentCount={bookmark.stats.comments} />
      </div>

      {/* Sidebar - Related Bookmarks */}
      <div className="w-80 flex-shrink-0">
        <RelatedBookmarks bookmarks={relatedBookmarks} />
      </div>
    </div>
  )
}

export default BookmarkDetail