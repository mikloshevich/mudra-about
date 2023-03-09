import { useRef } from 'react'
import useAudioContext from '../hooks/useAudioContext'
import useCanvas from '../hooks/useCanvas'
import useRafCallback from '../hooks/useRafCallback'

const Canvas = ({ width = 280, height = 280, showSound, playMusic }) => {
    const { cnvRef } = useSoundAnimation(showSound, playMusic)
    return <canvas className="soundCanvas" ref={cnvRef} width={width} height={height}></canvas>
}

export default Canvas

export function drawSound(sound, cnvRef, ctxRef, gradPos, gAngle, show = true) {
    const cnv = cnvRef.current
    const ctx = ctxRef.current

    gradPos.current.gx2 = gradPos.current.gx1 + 10 + Math.cos(degToRad(gAngle.current * 0.6)) * cnv.width
    gradPos.current.gy2 = gradPos.current.gy1 + Math.sin(degToRad(gAngle.current)) * cnv.height

    const grad = ctx.createLinearGradient(
        gradPos.current.gx1,
        gradPos.current.gy1,
        gradPos.current.gx2,
        gradPos.current.gy2
    )
    grad.addColorStop(0, `hsla(65, 70%, 24%, 0.03)`)
    grad.addColorStop(0.3, `hsla(210, 70%, 24%, 0.03)`)
    grad.addColorStop(1, `hsla(210, 70%, 24%, 0.03)`)
    cnv.style.setProperty('--color-deg', Math.floor(gAngle.current % 360) + 'deg')

    gAngle.current += 0.5

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, cnv.width, cnv.height)

    ctx.beginPath()
    ctx.fillStyle = 'hsl(0, 80%, 100%)'
    ctx.arc(cnv.width / 2, cnv.height / 2, cnv.width * 0.44, 0, Math.PI * 2)
    ctx.fill()

    if (sound.current) {
        const buffer = sound.current.bufferLength

        for (let i = 0; i < buffer; i++) {
            const wave = sound.current.getData()[i] / 128 - 1
            const x =
                Math.cos(i * degToRad(360 / buffer)) * (cnv.width * 0.39) +
                Math.cos(i / wave) * wave * (cnv.width * 0.27)
            const y =
                Math.sin(i * degToRad(360 / buffer)) * (cnv.width * 0.39) +
                Math.sin(i / wave) * wave * (cnv.width * 0.27)

            ctx.beginPath()
            ctx.fillStyle = 'hsl(0, 80%, 100%)'
            ctx.arc(x + cnv.width / 2, y + cnv.height / 2, 10, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    if (!show) {
        cnv.style.setProperty('--sound-opacity', 0)
    } else {
        cnv.style.setProperty('--sound-opacity', 1)
    }
}

export function useSoundAnimation(showSound, playMusic) {
    const { soundRef } = useAudioContext(playMusic)
    const { cnvRef, ctxRef } = useCanvas()

    const gradPos = useRef({
        gx1: 0,
        gy1: 0,
        gx2: 0,
        gy2: 0,
    })

    const gAngle = useRef(0)

    if (cnvRef.current) {
        gradPos.current.gx1 = cnvRef.current.width / 2
        gradPos.current.gy1 = cnvRef.current.height / 2
    }

    useRafCallback(() => {
        drawSound(soundRef, cnvRef, ctxRef, gradPos, gAngle, showSound)
    })

    return { cnvRef, ctxRef, soundRef, gradPos, gAngle }
}

export function degToRad(deg) {
    return deg * (Math.PI / 180)
}
