import { ThemeProvider } from './context/ThemeContext'
import useDisableRightClick from './hooks/useDisableRightClick'
import { Navigation } from './layouts/Navigation'
import { Landing, Portfolio, About, Education, Experience, Skills, Contact } from './pages'

function App() {
  //useDisableRightClick();

  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Navigation />
        <main>
          <Landing />
          <About />
          <Experience />
          <Skills />
          <Portfolio />
          <Education />
          <Contact />
        </main>
        <footer className="bg-gray-100 dark:bg-gray-900 py-8 text-center text-gray-600 dark:text-gray-400">
          <p>© { new Date().getFullYear() } Sai Htet Aung. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
