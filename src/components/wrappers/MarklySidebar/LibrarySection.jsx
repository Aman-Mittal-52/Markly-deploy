import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { useSelector } from 'react-redux'
import { ThumbsUp, Heart, SquareLibrary } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function LibrarySection() {
  const navigate = useNavigate()
  const { isAuthenticated, collections, favourites } = useSelector((state) => state.user)


 
  // Library section items
  const libraryItems = [
    {
      label: 'Liked Bookmarks',
      icon: ThumbsUp,
      url: '/liked',
      badge: 89,
    },
    {
      label: 'Favorites',
      icon: Heart,
      url: '/favorites',
      badge: isAuthenticated ? favourites?.bookmarks?.length : null,
    },
    {
      label: 'Collections',
      icon: SquareLibrary,
      url: '/collections',
      badge: isAuthenticated ? collections.length : null,
      isDisabled: !isAuthenticated,
    },
  ]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Library</SidebarGroupLabel>
      <SidebarMenu>
        {libraryItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton onClick={() => navigate(item.url)} disabled={!isAuthenticated}>
              <item.icon className="w-5 h-5 mr-2" />
              <span>{item.label}</span>
              {isAuthenticated && item.badge && (
                <span className="ml-auto bg-muted px-2 py-0.5 rounded-full text-xs font-medium">
                  {item.badge}
                </span>
              )}
              {!isAuthenticated && (
                 <span className="ml-auto bg-muted px-2 py-0.5 rounded-full text-xs font-medium">
                 Sign in
               </span>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
} 