import { createContext, useContext, useRef, useState } from 'react'

const MouseEnterContext = createContext([false, () => {}])

export function CardContainer({ children, className = '', containerClassName = '' }) {
  const containerRef = useRef(null)
  const [isMouseEnter, setIsMouseEnter] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    // calculate mouse position relative to container center (-0.5 to 0.5)
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5
    
    // Max tilt angles: 12 degrees
    const maxTilt = 12
    const rotateX = -y * maxTilt
    const rotateY = x * maxTilt

    // Set CSS custom properties on container
    containerRef.current.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`)
    containerRef.current.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`)
    
    // Track mouse coordinates for glow reflections
    containerRef.current.style.setProperty('--mx', `${(e.clientX - left).toFixed(0)}px`)
    containerRef.current.style.setProperty('--my', `${(e.clientY - top).toFixed(0)}px`)
  }

  const handleMouseEnter = () => {
    setIsMouseEnter(true)
    if (!containerRef.current) return
    containerRef.current.style.setProperty('--glow-opacity', '1')
  }

  const handleMouseLeave = () => {
    setIsMouseEnter(false)
    if (!containerRef.current) return
    // Reset values on leave
    containerRef.current.style.setProperty('--rx', '0deg')
    containerRef.current.style.setProperty('--ry', '0deg')
    containerRef.current.style.setProperty('--glow-opacity', '0')
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEnter, setIsMouseEnter]}>
      <div
        className={`card-container-wrapper ${containerClassName}`}
        style={{
          perspective: '1000px',
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`card-container ${className}`}
          style={{
            transformStyle: 'preserve-3d',
            transition: isMouseEnter ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
            transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
            position: 'relative'
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export function CardBody({ children, className = '' }) {
  return (
    <div
      className={`card-body ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        height: '100%',
        width: '100%'
      }}
    >
      {children}
    </div>
  )
}

export function CardItem({
  as: Component = 'div',
  children,
  className = '',
  translateZ = 0,
  translateX = 0,
  translateY = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) {
  const [isMouseEnter] = useContext(MouseEnterContext)

  // Compute transform style dynamically
  const transform = `
    translate3d(${translateX}px, ${translateY}px, ${isMouseEnter ? translateZ : 0}px)
    rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)
  `

  return (
    <Component
      className={`card-item ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
        ...rest.style
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}
