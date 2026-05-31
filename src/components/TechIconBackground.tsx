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
  mass: number
  restitution: number
  rotation: number
  angularVelocity: number
  settledFrames: number
  floating: boolean
  alwaysFloating: boolean
  floatAnchorX: number
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
  bouncyRatio?: number
  bounceRestitution?: number
  bouncyRestitution?: number
  impactSpin?: number
  maxSpeed?: number
  rotateOnImpact?: boolean
  recycleSettledIcons?: boolean
  recycleAfterFrames?: number
  alwaysFloatingRatio?: number
  floatingRatio?: number
  floatAreaMinY?: number
  floatAreaMaxY?: number
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
  bouncyRatio = 0.3,
  bounceRestitution = 0.42,
  bouncyRestitution = 0.78,
  impactSpin = 0.018,
  maxSpeed = 9,
  rotateOnImpact = false,
  recycleSettledIcons = true,
  recycleAfterFrames = 120,
  alwaysFloatingRatio = 0,
  floatingRatio = 0.3,
  floatAreaMinY = 0.58,
  floatAreaMaxY = 0.9,
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
    const getFloatingAnchorY = (seedY: number, radius: number) => {
      const minY = height * Math.min(floatAreaMinY, floatAreaMaxY)
      const maxY = height * Math.max(floatAreaMinY, floatAreaMaxY)
      const y = minY + seedY * (maxY - minY)

      return Math.min(Math.max(y, radius), height - radius)
    }

    const getSettledFloatingAnchorY = (radius: number) => {
      const minY = height * Math.max(0.68, Math.min(floatAreaMinY, floatAreaMaxY))
      const maxY = height * Math.max(floatAreaMinY, floatAreaMaxY)
      const y = minY + Math.random() * Math.max(0, maxY - minY)

      return Math.min(Math.max(y, radius), height - radius)
    }

    const pickDistributedIndexes = (ratio: number) => {
      const count = Math.min(icons.length, Math.max(0, Math.round(icons.length * ratio)))
      const indexes = new Set<number>()
      const step = Math.max(1, Math.floor(icons.length / Math.max(count, 1)))

      for (let index = 0; index < icons.length && indexes.size < count; index += step) {
        indexes.add(index)
      }

      for (let index = 0; index < icons.length && indexes.size < count; index += 1) {
        indexes.add(index)
      }

      return indexes
    }

    const alwaysFloatingIndexes = pickDistributedIndexes(alwaysFloatingRatio)
    const bouncyIndexes = pickDistributedIndexes(bouncyRatio)

    const bodies: Body[] = icons.map((seed, index) => {
      const radius = seed.size / 2
      const px = Math.min(Math.max(seed.x * width, radius), width - radius)
      const py = Math.min(Math.max(seed.y * height, radius), height - radius)
      const alwaysFloating = alwaysFloatingIndexes.has(index)
      const bouncy = bouncyIndexes.has(index)

      return {
        ...seed,
        element: iconRefs.current[index],
        px,
        py,
        vx: alwaysFloating ? 0 : (index % 2 === 0 ? 0.55 : -0.45) * (1 + index * 0.04),
        vy: 0,
        radius,
        mass: Math.max(0.8, radius / 18),
        restitution: bouncy ? bouncyRestitution : bounceRestitution,
        rotation: 0,
        angularVelocity: 0,
        settledFrames: 0,
        floating: alwaysFloating,
        alwaysFloating,
        floatAnchorX: px,
        canFloat: !alwaysFloating && index < Math.round(icons.length * floatingRatio),
        floatAnchorY: alwaysFloating ? getFloatingAnchorY(seed.y, radius) : py,
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
      body.floating = body.alwaysFloating
      body.floatAnchorX = body.px
      body.floatAnchorY = body.alwaysFloating ? getFloatingAnchorY(body.y, body.radius) : 0
    }

    const resize = () => {
      width = container.clientWidth
      height = container.clientHeight
      bodies.forEach((body) => {
        body.px = Math.min(Math.max(body.px, body.radius), width - body.radius)
        body.py = Math.min(Math.max(body.py, body.radius), height - body.radius)
        if (body.alwaysFloating) {
          body.floatAnchorX = Math.min(Math.max(body.x * width, body.radius), width - body.radius)
          body.floatAnchorY = getFloatingAnchorY(body.y, body.radius)
        }
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
          const phase = time * 0.001 + body.floatPhase
          const targetX = body.floatAnchorX + Math.cos(phase * 0.7) * floatDrift * 0.55
          const targetY = body.floatAnchorY + Math.sin(phase) * floatDrift
          body.vx += (targetX - body.px) * floatStrength * 0.45 * delta
          body.vy += (targetY - body.py) * floatStrength * delta
          body.vx += Math.cos(time * 0.0007 + body.floatPhase) * 0.008 * delta
        } else {
          body.vy += gravity * delta
        }

        body.vx *= friction
        body.vy *= friction
        body.vx = Math.max(-maxSpeed, Math.min(maxSpeed, body.vx))
        body.vy = Math.max(-maxSpeed, Math.min(maxSpeed, body.vy))
        body.px += body.vx * delta
        body.py += body.vy * delta

        if (body.px - body.radius < 0) {
          body.px = body.radius
          body.vx = Math.abs(body.vx) * Math.max(wallBounce, body.restitution * 0.8)
        } else if (body.px + body.radius > width) {
          body.px = width - body.radius
          body.vx = -Math.abs(body.vx) * Math.max(wallBounce, body.restitution * 0.8)
        }

        if (body.py + body.radius > height) {
          const impactSpeed = Math.abs(body.vy)
          const impactRestitution = Math.min(0.92, body.restitution + impactSpeed * 0.018)

          body.py = height - body.radius
          body.vy = impactSpeed < 0.38 ? 0 : -impactSpeed * impactRestitution
          body.vx *= floorFriction
          body.angularVelocity += body.vx * impactSpin

          if (Math.abs(body.vx) < 0.05 && Math.abs(body.vy) < 0.1) {
            body.settledFrames += 1
            if (body.canFloat && !body.floating && body.settledFrames > Math.max(24, recycleAfterFrames * 0.35)) {
              body.floating = true
              body.floatAnchorX = body.px
              body.floatAnchorY = getSettledFloatingAnchorY(body.radius)
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
          body.vy = Math.abs(body.vy) * Math.max(wallBounce, body.restitution * 0.8)
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
            const velocityAlongNormal = relativeVx * nx + relativeVy * ny

            if (velocityAlongNormal < 0) {
              const inverseMassA = 1 / a.mass
              const inverseMassB = 1 / b.mass
              const restitution = Math.min(a.restitution, b.restitution)
              const impulse =
                (-(1 + restitution) * velocityAlongNormal * collisionStrength) /
                (inverseMassA + inverseMassB)

              a.vx -= impulse * inverseMassA * nx
              a.vy -= impulse * inverseMassA * ny
              b.vx += impulse * inverseMassB * nx
              b.vy += impulse * inverseMassB * ny

              if (rotateOnImpact) {
                a.angularVelocity -= impulse * impactSpin
                b.angularVelocity += impulse * impactSpin
              }
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
    floatAreaMaxY,
    floatAreaMinY,
    floatDrift,
    floatingRatio,
    floatStrength,
    friction,
    gravity,
    icons,
    alwaysFloatingRatio,
    bounceRestitution,
    bouncyRatio,
    bouncyRestitution,
    impactSpin,
    maxSpeed,
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
