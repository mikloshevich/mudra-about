import { useEffect, useRef } from 'react'

export default function useCanvas() {
    const cnvRef = useRef()
    const ctxRef = useRef()

    const getCanvasContext = () => {
        if (!cnvRef.current) {
            return
        }
        ctxRef.current = cnvRef.current.getContext('2d')
    }

    useEffect(getCanvasContext, [])

    return [cnvRef, ctxRef]
}
