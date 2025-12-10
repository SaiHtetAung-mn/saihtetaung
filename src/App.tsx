import { ThemeProvider } from './context/ThemeContext'
import useDisableRightClick from './hooks/useDisableRightClick'
import { Navigation } from './layouts/Navigation'
import { Landing, Portfolio, About, Education, Experience, Skills, Contact } from './pages'
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
  //useDisableRightClick();

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Navigation />
        <main>
          {sections.map(({ id, Component }, idx) => (
            <StackSection key={id} idx={idx}>
              <Component />
            </StackSection>
          ))}
        </main>
        <footer className="bg-gray-100 dark:bg-gray-900 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>© { new Date().getFullYear() } Sai Htet Aung. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
