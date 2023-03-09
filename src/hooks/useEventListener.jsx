import { useRef, useEffect } from 'react'

export default function useEventListener(evtName, evtHandler, element = window) {
    const handlerRef = useRef()

    useEffect(() => {
        handlerRef.current = evtHandler
    }, [evtHandler])

    useEffect(() => {
        if (!(element && element.addEventListener)) return

        const handler = (e) => handlerRef.current(e)

        element.addEventListener(evtName, handler)

        return () => element.removeEventListener(evtName, handler)
    }, [evtName, element])
}
