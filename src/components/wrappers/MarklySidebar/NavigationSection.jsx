import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Home, Users, TrendingUp, Book } from 'lucide-react'
import { useSelector } from 'react-redux'

export function NavigationSection() {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.user)  

  // Main navigation items
  const navItems = [
    {
      label: 'Home',
      icon: Home,
      url: '/',
    },
    {
      label: 'Trending',
      icon: TrendingUp,
      url: '/trending',
    },
    {
      label: 'Subscriptions',
      icon: Users,
      url: '/subscriptions',
      badge: 24,
      isDisabled: !isAuthenticated,
    },
    {
      label: 'My Bookmarks',
      icon: Book,
      url: '/bookmarks',
      badge: 156,
      isDisabled: !isAuthenticated,
    },
  ]

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton onClick={() => navigate(item.url)} disabled={item.isDisabled}>
              <item.icon className="w-5 h-5 mr-2" />
              <span>{item.label}</span>
              {isAuthenticated && item.badge && (
                <span className="ml-auto bg-muted px-2 py-0.5 rounded-full text-xs font-medium">
                  {item.badge}
                </span>
              )}
              {!isAuthenticated && item.badge && (
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