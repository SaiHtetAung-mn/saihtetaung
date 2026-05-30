'use client'

import { ThemeProvider } from './context/ThemeContext'
import useDisableRightClick from './hooks/useDisableRightClick'
import { Navigation } from './layouts/Navigation'
import { Landing, Portfolio, About, Education, Experience, Skills, Contact } from './sections'
import StackSection from './components/StackSection'

const sections = [
  { id: 'landing', Component: Landing },
  { id: 'about', Component: About },
  { id: 'experience', Component: Experience },
  { id: 'skills', Component: Skills },
  { id: 'portfolio', Component: Portfolio },
  { id: 'education', Component: Education },
  { id: 'contact', Component: Contact },
]

function App() {
  useDisableRightClick();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-black transition-colors duration-300 ease-out dark:bg-black dark:text-white">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" tabIndex={-1} className="transition-colors duration-300 ease-out">
          {sections.map(({ id, Component }, idx) => (
            <StackSection key={id} idx={idx}>
              <Component />
            </StackSection>
          ))}
        </main>
        <footer className="bg-white py-8 text-center text-black/70 transition-colors duration-300 ease-out dark:bg-black dark:text-white/70">
          <p>© { new Date().getFullYear() } Sai Htet Aung. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
