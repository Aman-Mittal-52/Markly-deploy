import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from './store/store'
import { SidebarProvider } from './components/ui/sidebar'

import { ThemeProvider } from './components/wrappers/theme-provider'
import { DotBackground } from './components/wrappers/DotBackground.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <DotBackground>
              <Toaster/>
              <App />
            </DotBackground> 
        </ThemeProvider>
      </BrowserRouter>  
    </Provider>
)
