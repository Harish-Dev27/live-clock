import { useEffect, useState } from 'react'
import './App.css'

const timeZones = [
  {
    country: 'India',
    flag: '🇮🇳',
    timeZone: 'Asia/Kolkata',
    locale: 'en-IN',
  },
  {
    country: 'Germany',
    flag: '🇩🇪',
    timeZone: 'Europe/Berlin',
    locale: 'en-DE',
  },
]

type FlameParticle = {
  id: number
  x: number
  y: number
  size: number
  rotation: number
}

function FlameTrail() {
  const [particles, setParticles] = useState<FlameParticle[]>([])

  useEffect(() => {
    let nextId = 0

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return

      const elementUnderPointer = document.elementFromPoint(
        event.clientX,
        event.clientY,
      )

      if (elementUnderPointer?.closest('[data-flame-blocker]')) {
        return
      }

      const particle = {
        id: nextId++,
        x: event.clientX,
        y: event.clientY,
        size: 14 + Math.random() * 18,
        rotation: -25 + Math.random() * 50,
      }

      setParticles((currentParticles) => [...currentParticles, particle].slice(-24))

      window.setTimeout(() => {
        setParticles((currentParticles) =>
          currentParticles.filter(({ id }) => id !== particle.id),
        )
      }, 900)
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div className="flame-trail" aria-hidden="true">
      {particles.map(({ id, x, y, size, rotation }) => (
        <span
          className="flame-particle"
          key={id}
          style={
            {
              left: x,
              top: y,
              '--flame-size': `${size}px`,
              '--flame-rotation': `${rotation}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

function App() {
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <FlameTrail />
      <main className="clock-page">
      <p className="eyebrow" data-flame-blocker>World clock</p>
      <h1 data-flame-blocker>Time, wherever you are.</h1>
      <section className="clock-grid" aria-label="Current time around the world">
        {timeZones.map(({ country, flag, timeZone, locale }) => (
          <article className="clock-location" key={country}>
            <div
              className="flag"
              data-flame-blocker
              role="img"
              aria-label={`${country} flag`}
            >
              {flag}
            </div>
            <div className="clock-box" data-flame-blocker>
              <p className="country">{country}</p>
              <p className="time">
                {new Intl.DateTimeFormat(locale, {
                  timeZone,
                  hour: 'numeric',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                }).format(currentTime)}
              </p>
            </div>
            <p className="date" data-flame-blocker>
              {new Intl.DateTimeFormat(locale, {
                timeZone,
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format(currentTime)}
            </p>
          </article>
        ))}
      </section>
      </main>
    </>
  )
}

export default App
