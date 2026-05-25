import { useEffect, useState, type ReactNode } from 'react'

type TextTypeProps = {
  texts: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  startDelay?: number
  loop?: boolean
  showCursor?: boolean
  cursorCharacter?: string
  renderText?: (text: string) => ReactNode
}

export default function TextType({
  texts,
  className = '',
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseDuration = 1800,
  startDelay = 0,
  loop = false,
  showCursor = true,
  cursorCharacter = '|',
  renderText,
}: TextTypeProps) {
  const [textIndex, setTextIndex] = useState(0)
  const [characterIndex, setCharacterIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasStarted, setHasStarted] = useState(startDelay === 0)
  const currentText = texts[textIndex] ?? ''
  const displayedText = currentText.slice(0, characterIndex)

  useEffect(() => {
    if (hasStarted) return

    const timer = window.setTimeout(() => setHasStarted(true), startDelay)
    return () => window.clearTimeout(timer)
  }, [hasStarted, startDelay])

  useEffect(() => {
    if (!hasStarted || texts.length === 0) return

    if (!isDeleting && characterIndex === currentText.length) {
      if (!loop && textIndex === texts.length - 1) return

      const timer = window.setTimeout(() => setIsDeleting(true), pauseDuration)
      return () => window.clearTimeout(timer)
    }

    if (isDeleting && characterIndex === 0) {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % texts.length)
      return
    }

    const timer = window.setTimeout(() => {
      setCharacterIndex((prev) => prev + (isDeleting ? -1 : 1))
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => window.clearTimeout(timer)
  }, [
    characterIndex,
    currentText.length,
    deletingSpeed,
    hasStarted,
    isDeleting,
    loop,
    pauseDuration,
    textIndex,
    texts.length,
    typingSpeed,
  ])

  return (
    <span className={`text-type ${className}`}>
      <span className="text-type__content">
        {renderText ? renderText(displayedText) : displayedText}
      </span>
      {showCursor && (
        <span className="text-type__cursor" aria-hidden="true">
          {cursorCharacter}
        </span>
      )}
    </span>
  )
}
