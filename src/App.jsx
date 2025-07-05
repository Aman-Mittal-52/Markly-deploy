import React from "react";
import RoutesList from "./routes";
import { MarklySidebar } from "./components/wrappers/MarklySidebar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Separator } from "./components/ui/separator";
import DynamicBreadcrumb from "./components/DynamicBreadcrumb.jsx";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <SidebarProvider>
      <MarklySidebar />

      <div className="w-full px-6">
        <header className="bg-background border rounded-xl flex h-16 shrink-0 sticky top-2 z-50 mb-8 items-center justify-between gap-2 border-b px-4 shadow-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <DynamicBreadcrumb />
          </div>
          <ModeToggle />
        </header>
        <RoutesList />
      </div>

    </SidebarProvider>
  );
}

export default App;
