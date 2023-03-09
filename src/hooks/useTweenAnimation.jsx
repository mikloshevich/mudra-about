import { useEffect, useState } from 'react'

export const easing = {
    linear: (t) => t,
    qudratic: (t) => t * (-(t * t) * t + 4 * t * t - 6 * t + 4),
    elastic: (n) => n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
    easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
}

export default function useTweenAnimation({ ease = 'none', duration = 1000, delay = 0 } = {}) {
    const [progress, setProgress] = useState(0)
    const [reset, setReset] = useState(false)

    const resetAnimation = () => {
        setReset((prev) => !prev)
    }

    useEffect(() => {
        let raf
        let startTime = window.performance.now()
        let now = window.performance.now()

        function loop() {
            if (now - startTime < duration + delay) {
                start()
            }

            if (now - startTime > delay) {
                const elapsed = Math.min(1, (now - startTime - delay) / duration)

                setProgress(setEase(ease, elapsed))
            }
            now = window.performance.now()
        }

        function start() {
            raf = requestAnimationFrame(loop)
        }

        start()

        return () => cancelAnimationFrame(raf)
    }, [duration, delay, ease, reset])

    return [progress, resetAnimation]
}

export function setEase(ease, t) {
    if (typeof easing[ease] !== 'function') {
        return t
    }
    return easing[ease](t)
}
