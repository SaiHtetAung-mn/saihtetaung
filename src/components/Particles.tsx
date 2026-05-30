import { useEffect, useRef } from 'react'
import { Camera, Geometry, Mesh, Program, Renderer } from 'ogl'

type ParticlesProps = {
  particleCount?: number
  particleSpread?: number
  speed?: number
  particleColors?: string[]
  moveParticlesOnHover?: boolean
  particleHoverFactor?: number
  alphaParticles?: boolean
  particleBaseSize?: number
  sizeRandomness?: number
  cameraDistance?: number
  disableRotation?: boolean
  pixelRatio?: number
  className?: string
}

type Particle = {
  x: number
  y: number
  z: number
  size: number
  color: [number, number, number]
  random: number
}

const vertex = `
  attribute vec3 position;
  attribute vec3 color;
  attribute float size;
  attribute float random;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  uniform vec2 uMouse;
  uniform float uHoverFactor;

  varying vec3 vColor;
  varying float vRandom;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    float wave = sin(uTime * 0.9 + random * 9.0) * 0.22;
    float driftX = sin(uTime * 0.45 + random * 6.0) * 0.3;
    float driftY = cos(uTime * 0.38 + random * 4.0) * 0.26;
    pos.z += wave;
    pos.x += driftX;
    pos.y += driftY;

    vec2 mouseOffset = pos.xy - uMouse;
    float dist = length(mouseOffset);
    float influence = smoothstep(2.6, 0.0, dist) * uHoverFactor;
    pos.xy += normalize(mouseOffset + 0.0001) * influence * 0.55;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uBaseSize * (1.0 + random * uSizeRandomness) * uPixelRatio / -mvPosition.z;

    vColor = color;
    vRandom = random;
    vAlpha = 0.42 + random * 0.58;
  }
`

const fragment = `
  precision highp float;

  uniform float uTime;
  uniform bool uAlphaParticles;

  varying vec3 vColor;
  varying float vRandom;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    float shimmer = 0.18 * sin(uTime + vRandom * 6.28 + uv.x * 6.0);

    if (!uAlphaParticles) {
      if (d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + shimmer, 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + shimmer, circle * vAlpha);
    }
  }
`

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '')
  const value = parseInt(normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized, 16)

  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ]
}

function createParticles(count: number, spread: number, colors: string[], baseSize: number): Particle[] {
  const rgbColors = colors.map(hexToRgb)

  return Array.from({ length: count }, (_, index) => {
    const radius = Math.pow(Math.random(), 0.45) * spread
    const angle = Math.random() * Math.PI * 2
    const depth = (Math.random() - 0.5) * spread

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.58,
      z: depth,
      size: baseSize,
      color: rgbColors[index % rgbColors.length],
      random: Math.random(),
    }
  })
}

export default function Particles({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors = ['#fbbf24', '#38bdf8', '#ffffff'],
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio,
  className = '',
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      depth: false,
      dpr: pixelRatio ?? Math.min(window.devicePixelRatio, 2),
    })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)
    container.appendChild(gl.canvas)

    const camera = new Camera(gl, { fov: 15 })
    camera.position.set(0, 0, cameraDistance)

    const particles = createParticles(particleCount, particleSpread, particleColors, particleBaseSize)
    const positions = new Float32Array(particles.length * 3)
    const colors = new Float32Array(particles.length * 3)
    const sizes = new Float32Array(particles.length)
    const randoms = new Float32Array(particles.length)

    particles.forEach((particle, index) => {
      positions.set([particle.x, particle.y, particle.z], index * 3)
      colors.set(particle.color, index * 3)
      sizes[index] = particle.size
      randoms[index] = particle.random
    })

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      color: { size: 3, data: colors },
      size: { size: 1, data: sizes },
      random: { size: 1, data: randoms },
    })

    const program = new Program(gl, {
      vertex,
      fragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio ?? Math.min(window.devicePixelRatio, 2) },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uMouse: { value: [0, 0] },
        uHoverFactor: { value: moveParticlesOnHover ? particleHoverFactor : 0 },
        uAlphaParticles: { value: alphaParticles },
      },
    })

    const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program })

    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height })
    }

    const pointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    }

    resize()
    window.addEventListener('resize', resize)
    if (moveParticlesOnHover) {
      container.addEventListener('pointermove', pointerMove)
    }

    let frame = 0
    let animationFrame = 0
    const animate = (time: number) => {
      frame = time * 0.001
      program.uniforms.uTime.value = frame * speed
      program.uniforms.uMouse.value = [mouseRef.current.x * particleSpread, mouseRef.current.y * particleSpread]

      if (!disableRotation) {
        mesh.rotation.y = Math.sin(frame * speed * 0.22) * 0.12
        mesh.rotation.x = Math.cos(frame * speed * 0.18) * 0.06
      }

      renderer.render({ scene: mesh, camera })
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      if (moveParticlesOnHover) {
        container.removeEventListener('pointermove', pointerMove)
      }
      gl.canvas.remove()
    }
  }, [
    alphaParticles,
    cameraDistance,
    disableRotation,
    moveParticlesOnHover,
    particleBaseSize,
    particleColors,
    particleCount,
    particleHoverFactor,
    particleSpread,
    pixelRatio,
    sizeRandomness,
    speed,
  ])

  return <div ref={containerRef} className={`particles-canvas ${className}`} aria-hidden="true" />
}
