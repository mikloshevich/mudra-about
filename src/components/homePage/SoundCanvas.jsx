import { useRef, useState } from 'react'
import useAudioContext from '../../hooks/useAudioContext'
import useCanvas from '../../hooks/useCanvas'
import useRafCallback from '../../hooks/useRafCallback'
import { degToRad } from '../../utils/functions'
import Canvas from '../Canvas'

const SoundCanvas = ({ playMusic, showSound }) => {
    // const [showSound, setShowSound] = useState(true)
    const { soundRef } = useAudioContext(playMusic)
    const [cnvRef, ctxRef] = useCanvas()

    const gradAngle = useRef(0)
    const maxLength = Math.sqrt(220 * 220 + 220 * 220)

    useRafCallback(() => {
        if (cnvRef.current) {
            drawSound(soundRef, cnvRef, ctxRef, gradAngle, maxLength)
        }
    })

    return (
        <div
            style={{ opacity: showSound ? '1' : '0', transform: showSound ? 'scale(1)' : 'scale(0.9)' }}
            className="soundCanvasContainer"
            // onMouseEnter={() => setShowSound(false)}
            // onMouseLeave={() => setShowSound(true)}
        >
            <Canvas cnvRef={cnvRef} className={'soundCanvas'} width={290} height={290} />
        </div>
    )
}

export default SoundCanvas

export function drawSound(sound, cnvRef, ctxRef, gradAngle, maxLength) {
    const cnv = cnvRef.current
    const ctx = ctxRef.current

    const gradient = ctx.createLinearGradient(
        // the start of the gradient added to the center
        cnv.width / 2 + Math.cos(gradAngle.current) * maxLength * 0.5,
        cnv.height / 2 + Math.sin(gradAngle.current) * maxLength * 0.9,
        // the end of the gradient subtracted from the center
        cnv.width / 2 - Math.cos(gradAngle.current) * maxLength * 0.5,
        cnv.height / 2 - Math.sin(gradAngle.current) * maxLength * 0.9
    )

    // hsla(184, 100%, 65%, 1) hsla(50, 85%, 70%, 1) hsl(279, 89%, 70%)

    gradient.addColorStop(0, 'hsla(50, 85%, 70%, 1)')
    gradient.addColorStop(1, 'hsla(184, 100%, 65%, 1)')
    // gradient.addColorStop(0.8, 'hsla(184, 100%, 65%, 1)')
    // gradient.addColorStop(1, 'hsl(279, 89%, 70%)')
    // cnv.style.setProperty('--color-deg', Math.floor(gradAngle.current % 360) + 'deg')

    ctx.fillStyle = 'hsl(0, 0%, 16%, 0.03)'
    ctx.fillRect(0, 0, cnv.width, cnv.height)
    // ctx.clearRect(0, 0, cnv.width, cnv.height)

    ctx.strokeStyle = gradient
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 8

    if (sound.current) {
        const buffer = sound.current.bufferLength

        for (let i = 0; i < buffer; i++) {
            const wave = sound.current.getData()[i] / 128 - 1
            const theta = degToRad(gradAngle.current * 50 + (i * 360) / buffer)
            const force = (wave * 200) / buffer

            let x = Math.cos(theta) * (cnv.width * 0.43) + Math.cos(theta + i * 0.18) * force * (cnv.width * 0.055)
            let y =
                Math.sin(theta) * (cnv.height * 0.43) +
                Math.sin(theta + i * 0.2 * (wave + 1)) * force * (cnv.height * 0.055)

            // x = Math.round(x)
            // y = Math.round(y)

            if (i === 0) {
                ctx.beginPath()
                ctx.moveTo(x + cnv.width / 2, y + cnv.height / 2)
            } else {
                ctx.lineTo(x + cnv.width / 2, y + cnv.height / 2)
                ctx.stroke()
            }

            if (i === buffer - 1) {
                ctx.closePath()
                ctx.stroke()
            }
        }
        gradAngle.current = gradAngle.current + 0.01
    }

    ctx.beginPath()
    ctx.fillStyle = 'hsl(0, 0%, 100%)'
    ctx.arc(cnv.width / 2, cnv.height / 2, cnv.width * 0.435, 0, Math.PI * 2)
    ctx.fill()
}
