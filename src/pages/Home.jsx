import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, ThumbsUp, ThumbsDown, MessageCircle, Clock, EllipsisVertical, Heart, Folder, Share2, SquareLibrary } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { fetchBookmarks } from "@/store/thunks/bookmarkThunks";

const Home = () => {

    // bookmarks data
    const sampleBookmarks = [
      {
        id: "1",
        title: "10 Amazing CSS Grid Layouts That Will Blow Your Mind",
        description:
          "Discover the most creative and practical CSS Grid layouts that professional developers use in their projects. From complex magazine layouts to simple card grids.",
        url: "https://example.com/css-grid-layouts",
        thumbnail: "https://v0.dev/placeholder.svg?height=200&width=400",
        author: {
          name: "TechGuru",
          avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
          subscribers: "125K",
          verified: true,
        },
        stats: {
          views: "45.2K",
          likes: 1250,
          dislikes: 23,
          comments: 89,
          timeAgo: "2 hours ago",
        },
        tags: ["CSS", "Web Design", "Frontend", "Grid"],
        category: "Technology",
      },
      {
        id: "2",
        title: "The Ultimate Guide to React Hooks in 2024",
        description:
          "Master React Hooks with this comprehensive guide covering useState, useEffect, custom hooks, and advanced patterns that every React developer should know.",
        url: "https://example.com/react-hooks-guide",
        thumbnail: "https://v0.dev/placeholder.svg?height=200&width=400",
        author: {
          name: "CodeWizard",
          avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
          subscribers: "89K",
          verified: true,
        },
        stats: {
          views: "32.1K",
          likes: 890,
          dislikes: 12,
          comments: 156,
          timeAgo: "5 hours ago",
        },
        tags: ["React", "JavaScript", "Hooks", "Tutorial"],
        category: "Technology",
      },
      {
        id: "3",
        title: "Figma Design System Best Practices for 2024",
        description:
          "Learn how to create scalable design systems in Figma with components, variants, and auto-layout. Perfect for designers and design teams.",
        url: "https://example.com/figma-design-system",
        thumbnail: "https://v0.dev/placeholder.svg?height=200&width=400",
        author: {
          name: "DesignMaster",
          avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
          subscribers: "67K",
          verified: false,
        },
        stats: {
          views: "28.7K",
          likes: 756,
          dislikes: 8,
          comments: 92,
          timeAgo: "1 day ago",
        },
        tags: ["Figma", "Design System", "UI/UX", "Design"],
        category: "Design",
      },
      {
        id: "4",
        title: "Building a Startup: From Idea to $1M ARR",
        description:
          "The complete journey of building a SaaS startup from scratch. Real numbers, real challenges, and actionable insights for aspiring entrepreneurs.",
        url: "https://example.com/startup-journey",
        thumbnail: "https://v0.dev/placeholder.svg?height=200&width=400",
        author: {
          name: "StartupLife",
          avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
          subscribers: "156K",
          verified: true,
        },
        stats: {
          views: "67.3K",
          likes: 2100,
          dislikes: 45,
          comments: 234,
          timeAgo: "3 days ago",
        },
        tags: ["Startup", "Business", "Entrepreneurship", "SaaS"],
        category: "Business",
      },
    ];

    // Add state for favorites
    const [favorites, setFavorites] = useState({});

    // State for dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedBookmark, setSelectedBookmark] = useState(null);
    const [selectedCollection, setSelectedCollection] = useState("");

    // Mocked user collections
    const userCollections = [
      { id: "col1", name: "Frontend Inspiration" },
      { id: "col2", name: "React Resources" },
      { id: "col3", name: "Design Systems" },
    ];

    const dispatch = useDispatch();

    const toggleFavorite = (id) => {
      setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSaveToCollection = (bookmark) => {
      setSelectedBookmark(bookmark);
      setOpenDialog(true);
    };

    const handleCollectionSelect = (e) => {
      setSelectedCollection(e.target.value);
    };

    const handleSave = () => {
      // Here you would call an API or update state to save the bookmark to the collection
      setOpenDialog(false);
      setSelectedCollection("");
      setSelectedBookmark(null);
      toast.success("Bookmark saved to collection!", {
        icon: <SquareLibrary />,
      });
    };

    useEffect(() => {
      dispatch(fetchBookmarks()).then((result) => {
        console.log("Fetched bookmarks result:", result);
      });
    }, [dispatch]);

    return (
        <>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {sampleBookmarks.map((bookmark) => {
            const maxTags = 3;
            const extraTags = bookmark.tags.length - maxTags;
            return (
              <Card
                key={bookmark.id}
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col relative group transition-shadow hover:shadow-lg"
              >
                <div className="relative">
                  <img
                    src={bookmark.thumbnail}
                    alt={bookmark.title}
                    className="w-full h-44 object-cover bg-zinc-100 dark:bg-zinc-800"
                  />
                  
                  <span className="absolute top-3 left-3 bg-zinc-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 dark:bg-zinc-800/80">
                    {bookmark.category}
                  </span>
                </div>
                <CardContent className="flex-1 flex flex-col gap-2 p-4">
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                    <CardTitle className="text-base font-bold leading-tight mb-1 line-clamp-2 hover:underline">
                      {bookmark.title}
                    </CardTitle>
                  </a>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 mb-1 gap-2">
                    <img
                      src={bookmark.author.avatar}
                      alt={bookmark.author.name}
                      className="w-7 h-7 rounded-full mr-2 border border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-700"
                    />
                    <span className="font-medium text-zinc-800 dark:text-zinc-200 flex items-center gap-1">
                      {bookmark.author.name}
                      {bookmark.author.verified && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      )}
                    </span>
                    <span>•</span>
                    <span>{bookmark.author.subscribers} subscribers</span>
                  </div>
                  <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400 gap-4 mb-1">
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {bookmark.stats.views} views</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {bookmark.stats.timeAgo}</span>
                  </div>
                  <CardDescription className="text-sm text-zinc-600 dark:text-zinc-300 mb-1 line-clamp-2">
                    {bookmark.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {bookmark.tags.slice(0, maxTags).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {extraTags > 0 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                        +{extraTags}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="items-center justify-between mt-auto pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400 text-sm">
                    <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {bookmark.stats.likes}</span>
                    <span className="flex items-center gap-1"><ThumbsDown className="w-4 h-4" /> {bookmark.stats.dislikes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {bookmark.stats.comments}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={favorites[bookmark.id] ? "secondary" : "ghost"}
                      size="icon"
                      className="p-2 rounded-full"
                      aria-label={favorites[bookmark.id] ? "Unfavorite" : "Favorite"}
                      onClick={() => toggleFavorite(bookmark.id)}
                    >
                      <Heart className={favorites[bookmark.id] ? "fill-red-500 text-red-500" : ""} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="p-2 rounded-full">
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSaveToCollection(bookmark)}>
                          <SquareLibrary /> Save to collection
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          toast.success("Share link has been copied!");
                        }}>
                          <Share2 /> Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        {/* Dialog for Save to Collection */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save to Collection</DialogTitle>
              <DialogDescription>
                Choose a collection to save this bookmark.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSave();
              }}
              className="flex flex-col gap-4"
            >
              <Select value={selectedCollection} onValueChange={setSelectedCollection} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a collection" />
                </SelectTrigger>
                <SelectContent>
                  {userCollections.map(col => (
                    <SelectItem key={col.id} value={col.id}>
                      <span className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-zinc-500" />
                        {col.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DialogFooter>
                <Button type="submit" disabled={!selectedCollection}>Save</Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        </>
    )
}

export default Home;