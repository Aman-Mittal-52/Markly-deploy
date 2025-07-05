import React, { useState } from 'react'
import {
  Sidebar,
  SidebarContent,
} from '@/components/ui/sidebar'

import { LibrarySection } from './MarklySidebar/LibrarySection'
import { NavigationSection } from './MarklySidebar/NavigationSection'
import { SidebarHeaderComponent } from './MarklySidebar/SidebarHeader'
import { MarklySidebarFooter } from './MarklySidebar/MarklySidebarFooter'

export function MarklySidebar() {

  return (
    <Sidebar variant="floating">
      
      <SidebarHeaderComponent />
        
      <SidebarContent>
        <NavigationSection />
        <LibrarySection />
      </SidebarContent>

      <MarklySidebarFooter />
      
    </Sidebar>
  )
}
