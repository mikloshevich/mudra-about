import { useEffect, useRef } from 'react'

export default function useRafCallback(callback, fps = 60) {
    const callbackRef = useRef()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    useEffect(() => {
        let raf
        const interval = 1000 / fps
        let startTime = window.performance.now()
        let lastTime = window.performance.now()
        let now = window.performance.now()

        const frame = () => {
            const elapsed = now - startTime
            now = window.performance.now()
            const delta = now - lastTime

            if (interval) {
                if (delta > interval) {
                    callbackRef.current({ elapsed, delta, interval })
                    lastTime = now - (delta % interval)
                }
            } else {
                callbackRef.current({ elapsed, delta })
                lastTime = now
            }
            loop()
        }

        const loop = () => {
            raf = requestAnimationFrame(frame)
        }

        loop()

        return () => cancelAnimationFrame(raf)
    }, [fps])
}
