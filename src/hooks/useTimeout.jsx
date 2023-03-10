import { useCallback, useEffect, useRef } from 'react'

export function useTimeout(callback = () => {}, delay = 1, instant = false) {
    const callbackRef = useRef()
    const timeoutRef = useRef()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current && window.clearTimeout(timeoutRef.current)
        if (typeof callbackRef.current !== 'function') {
            callbackRef.current = function () {}
        }
        timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay)
    }, [delay])

    const clear = useCallback(() => {
        timeoutRef.current && window.clearTimeout(timeoutRef.current)
    }, [])

    useEffect(() => {
        if (instant) set()
        return clear
    }, [set, clear, instant])

    return [set, clear]
}
