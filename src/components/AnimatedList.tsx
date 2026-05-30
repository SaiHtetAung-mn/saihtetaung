import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type UIEvent } from 'react'
import { motion, useInView } from 'framer-motion'

type RenderItemParams<T> = {
  item: T
  index: number
  selected: boolean
}

type AnimatedListProps<T> = {
  items: T[]
  onItemSelect?: (item: T, index: number) => void
  showGradients?: boolean
  enableArrowNavigation?: boolean
  className?: string
  itemClassName?: string
  displayScrollbar?: boolean
  initialSelectedIndex?: number
  maxHeightClassName?: string
  getItemKey?: (item: T, index: number) => string
  renderItem?: (params: RenderItemParams<T>) => ReactNode
}

type AnimatedItemProps = {
  index: number
  delay: number
  className?: string
  onMouseEnter: () => void
  onClick: () => void
  children: ReactNode
}

function AnimatedItem({
  index,
  delay,
  className,
  onMouseEnter,
  onClick,
  children,
}: AnimatedItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.35, once: true })

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.22, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AnimatedList<T>({
  items,
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = false,
  initialSelectedIndex = -1,
  maxHeightClassName = 'max-h-[360px]',
  getItemKey,
  renderItem,
}: AnimatedListProps<T>) {
  const listRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex)
  const [isFocused, setIsFocused] = useState(false)
  const [topGradientOpacity, setTopGradientOpacity] = useState(0)
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1)

  const keys = useMemo(
    () => items.map((item, index) => getItemKey?.(item, index) ?? `${index}`),
    [getItemKey, items]
  )

  const handleItemClick = useCallback(
    (item: T, index: number) => {
      setSelectedIndex(index)
      onItemSelect?.(item, index)
    },
    [onItemSelect]
  )

  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    setTopGradientOpacity(Math.min(scrollTop / 40, 1))
    const bottomDistance = scrollHeight - (scrollTop + clientHeight)
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 40, 1))
  }, [])

  useEffect(() => {
    if (!enableArrowNavigation || !isFocused) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(Math.max(prev, -1) + 1, items.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < items.length) {
        e.preventDefault()
        onItemSelect?.(items[selectedIndex], selectedIndex)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enableArrowNavigation, isFocused, items, onItemSelect, selectedIndex])

  useEffect(() => {
    if (selectedIndex < 0 || !listRef.current) return
    const container = listRef.current
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null
    if (!selectedItem) return

    const extraMargin = 24
    const containerScrollTop = container.scrollTop
    const containerHeight = container.clientHeight
    const itemTop = selectedItem.offsetTop
    const itemBottom = itemTop + selectedItem.offsetHeight

    if (itemTop < containerScrollTop + extraMargin) {
      container.scrollTo({ top: Math.max(itemTop - extraMargin, 0), behavior: 'smooth' })
    } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
      container.scrollTo({
        top: itemBottom - containerHeight + extraMargin,
        behavior: 'smooth',
      })
    }
  }, [selectedIndex])

  return (
    <div className={`relative ${className}`}>
      <div
        ref={listRef}
        tabIndex={0}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onScroll={handleScroll}
        className={`${maxHeightClassName} overflow-y-auto rounded-lg outline-none ${
          displayScrollbar
            ? '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-surface'
            : 'scrollbar-hide'
        }`}
        style={{
          scrollbarWidth: displayScrollbar ? 'thin' : 'none',
        }}
      >
        <div className="space-y-2 p-1">
          {items.map((item, index) => (
            <AnimatedItem
              key={keys[index]}
              index={index}
              delay={Math.min(index * 0.03, 0.2)}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={() => handleItemClick(item, index)}
              className={itemClassName}
            >
              {renderItem ? renderItem({ item, index, selected: selectedIndex === index }) : String(item)}
            </AnimatedItem>
          ))}
        </div>
      </div>

      {showGradients && (
        <>
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-background to-transparent transition-opacity duration-200"
            style={{ opacity: topGradientOpacity }}
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent transition-opacity duration-200"
            style={{ opacity: bottomGradientOpacity }}
          />
        </>
      )}
    </div>
  )
}
