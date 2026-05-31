import { useEffect, useRef } from 'react'
import type { IconType } from 'react-icons'
import {
  SiAmazon,
  SiDocker,
  SiLaravel,
  SiMongodb,
  SiNestjs,
  SiNodedotjs,
  SiReact,
  SiRedis,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'

export type TechIconSeed = {
  Icon: IconType
  x: number
  y: number
  size: number
}

type Body = TechIconSeed & {
  element: HTMLDivElement | null
  px: number
  py: number
  vx: number
  vy: number
  radius: number
  rotation: number
  angularVelocity: number
  settledFrames: number
  floating: boolean
  canFloat: boolean
  floatAnchorY: number
  floatPhase: number
}

type TechIconBackgroundProps = {
  className?: string
  iconClassName?: string
  enableCursorSplit?: boolean
  cursorRadius?: number
  cursorForce?: number
  gravity?: number
  friction?: number
  wallBounce?: number
  floorFriction?: number
  collisionStrength?: number
  rotateOnImpact?: boolean
  recycleSettledIcons?: boolean
  recycleAfterFrames?: number
  floatingRatio?: number
  floatStrength?: number
  floatDrift?: number
  icons?: TechIconSeed[]
}

export const defaultTechIconSeeds: TechIconSeed[] = [
  { Icon: SiTypescript, x: 0.08, y: 0.08, size: 42 },
  { Icon: SiReact, x: 0.2, y: 0.18, size: 54 },
  { Icon: SiNodedotjs, x: 0.34, y: 0.08, size: 42 },
  { Icon: SiNestjs, x: 0.62, y: 0.12, size: 52 },
  { Icon: SiLaravel, x: 0.82, y: 0.16, size: 42 },
  { Icon: SiMongodb, x: 0.7, y: 0.26, size: 52 },
  { Icon: SiRedis, x: 0.12, y: 0.34, size: 34 },
  { Icon: SiDocker, x: 0.48, y: 0.32, size: 44 },
  { Icon: SiAmazon, x: 0.9, y: 0.38, size: 36 },
  { Icon: SiTailwindcss, x: 0.42, y: 0.18, size: 52 },
  { Icon: SiSocketdotio, x: 0.28, y: 0.42, size: 36 },
]

export default function TechIconBackground({
  className = '',
  iconClassName = 'text-accent/25',
  enableCursorSplit = true,
  cursorRadius = 150,
  cursorForce = 1.2,
  gravity = 0.34,
  friction = 0.992,
  wallBounce = 0.62,
  floorFriction = 0.985,
  collisionStrength = 0.55,
  rotateOnImpact = false,
  recycleSettledIcons = true,
  recycleAfterFrames = 120,
  floatingRatio = 0.3,
  floatStrength = 0.045,
  floatDrift = 18,
  icons = defaultTechIconSeeds,
}: TechIconBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let width = container.clientWidth
    let height = container.clientHeight
    let animationFrame = 0
    let lastTime = performance.now()
    const pointer = { x: -9999, y: -9999 }

    const bodies: Body[] = icons.map((seed, index) => {
      const radius = seed.size / 2
      return {
        ...seed,
        element: iconRefs.current[index],
        px: Math.min(Math.max(seed.x * width, radius), width - radius),
        py: Math.min(Math.max(seed.y * height, radius), height - radius),
        vx: (index % 2 === 0 ? 0.55 : -0.45) * (1 + index * 0.04),
        vy: 0,
        radius,
        rotation: 0,
        angularVelocity: 0,
        settledFrames: 0,
        floating: false,
        canFloat: index < Math.round(icons.length * floatingRatio),
        floatAnchorY: 0,
        floatPhase: index * 0.9,
      }
    })

    const recycleBody = (body: Body) => {
      body.px = Math.min(Math.max(Math.random() * width, body.radius), width - body.radius)
      body.py = -body.radius - Math.random() * height * 0.18
      body.vx = (Math.random() - 0.5) * 1.1
      body.vy = Math.random() * 0.25
      body.rotation = 0
      body.angularVelocity = 0
      body.settledFrames = 0
      body.floating = false
      body.floatAnchorY = 0
    }

    const resize = () => {
      width = container.clientWidth
      height = container.clientHeight
      bodies.forEach((body) => {
        body.px = Math.min(Math.max(body.px, body.radius), width - body.radius)
        body.py = Math.min(Math.max(body.py, body.radius), height - body.radius)
      })
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }

    const handlePointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const update = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.67, 2)
      lastTime = time

      for (const body of bodies) {
        if (enableCursorSplit) {
          const dx = body.px - pointer.x
          const dy = body.py - pointer.y
          const distance = Math.hypot(dx, dy)

          if (distance > 0 && distance < cursorRadius) {
            const strength = (1 - distance / cursorRadius) * cursorForce
            body.vx += (dx / distance) * strength * delta
            body.vy += (dy / distance) * strength * delta
            if (rotateOnImpact) {
              body.angularVelocity += (dx > 0 ? 0.04 : -0.04) * strength
            }
          }
        }

        if (body.floating) {
          const targetY = body.floatAnchorY + Math.sin(time * 0.001 + body.floatPhase) * floatDrift
          body.vy += (targetY - body.py) * floatStrength * delta
          body.vx += Math.cos(time * 0.0007 + body.floatPhase) * 0.008 * delta
        } else {
          body.vy += gravity * delta
        }

        body.vx *= friction
        body.vy *= friction
        body.px += body.vx * delta
        body.py += body.vy * delta

        if (body.px - body.radius < 0) {
          body.px = body.radius
          body.vx = Math.abs(body.vx) * wallBounce
        } else if (body.px + body.radius > width) {
          body.px = width - body.radius
          body.vx = -Math.abs(body.vx) * wallBounce
        }

        if (body.py + body.radius > height) {
          body.py = height - body.radius
          body.vy = -Math.abs(body.vy) * wallBounce
          body.vx *= floorFriction

          if (Math.abs(body.vx) < 0.05 && Math.abs(body.vy) < 0.1) {
            body.settledFrames += 1
            if (body.canFloat && !body.floating && body.settledFrames > Math.max(24, recycleAfterFrames * 0.35)) {
              body.floating = true
              body.floatAnchorY = height - body.radius - Math.random() * height * 0.22
              body.vy = -0.9 - Math.random() * 0.8
              body.vx += (Math.random() - 0.5) * 0.8
              body.settledFrames = 0
            } else if (recycleSettledIcons && !body.floating && body.settledFrames > recycleAfterFrames) {
              recycleBody(body)
            }
          } else {
            body.settledFrames = 0
          }
        } else if (body.py - body.radius < 0) {
          body.py = body.radius
          body.vy = Math.abs(body.vy) * wallBounce
          body.settledFrames = 0
        } else {
          body.settledFrames = 0
        }
      }

      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i]
          const b = bodies[j]
          const dx = b.px - a.px
          const dy = b.py - a.py
          const distance = Math.hypot(dx, dy)
          const minDistance = a.radius + b.radius

          if (distance > 0 && distance < minDistance) {
            const overlap = (minDistance - distance) / 2
            const nx = dx / distance
            const ny = dy / distance

            a.px -= nx * overlap
            a.py -= ny * overlap
            b.px += nx * overlap
            b.py += ny * overlap

            const relativeVx = b.vx - a.vx
            const relativeVy = b.vy - a.vy
            const impulse = (relativeVx * nx + relativeVy * ny) * collisionStrength

            a.vx += impulse * nx
            a.vy += impulse * ny
            b.vx -= impulse * nx
            b.vy -= impulse * ny

            if (rotateOnImpact) {
              a.angularVelocity -= impulse * 0.03
              b.angularVelocity += impulse * 0.03
            }
          }
        }
      }

      for (const body of bodies) {
        if (rotateOnImpact) {
          body.angularVelocity *= 0.96
          body.rotation += body.angularVelocity * delta
        }

        body.element?.style.setProperty(
          'transform',
          `translate3d(${body.px - body.radius}px, ${body.py - body.radius}px, 0)${rotateOnImpact ? ` rotate(${body.rotation}deg)` : ''}`
        )
      }

      animationFrame = requestAnimationFrame(update)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave)
    animationFrame = requestAnimationFrame(update)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [
    collisionStrength,
    cursorForce,
    cursorRadius,
    enableCursorSplit,
    floorFriction,
    floatDrift,
    floatingRatio,
    floatStrength,
    friction,
    gravity,
    icons,
    recycleAfterFrames,
    recycleSettledIcons,
    rotateOnImpact,
    wallBounce,
  ])

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}>
      {icons.map(({ Icon, size }, index) => (
        <div
          key={index}
          ref={(element) => {
            iconRefs.current[index] = element
          }}
          className={`absolute left-0 top-0 will-change-transform ${iconClassName}`}
          style={{
            width: size,
            height: size,
            fontSize: size,
            lineHeight: 1,
          }}
        >
          <Icon />
        </div>
      ))}
    </div>
  )
}
