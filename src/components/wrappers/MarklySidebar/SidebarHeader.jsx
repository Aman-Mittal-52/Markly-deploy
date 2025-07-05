import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from '@/components/ui/sidebar'
import { BookmarkIcon } from '@/assets/BookmarkIcon'

export function SidebarHeaderComponent() {
  const navigate = useNavigate()

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          {/* Bookmark Manager */}
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            onClick={() => navigate('/')}
          >
            <div className="bg-transparent text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <BookmarkIcon />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-medium">Markly</span>
              <span className="text-xs text-muted-foreground">Bookmark Manager</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      {/* Search */}
      <SidebarGroup className="py-0">
        <SidebarGroupContent className="relative">
          <SidebarInput
            id="search"
            placeholder="Search the bookmarks, users, tags..."
            className="data-[state=collapsed]:hidden"
            onChange={(e) => {
              console.log(e.target.value)
            }}
          />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarHeader>
  )
} 