import { useLayoutEffect, useRef } from 'react'
import useCanvas from '../../hooks/useCanvas'
import Canvas from '../Canvas'
import SvgCircle from './SvgCircle'
import SvgCirclePack from './SvgCirclePack'
import { Path } from '../../lib/Path'
import useRafCallback from '../../hooks/useRafCallback'
import useEventListener from '../../hooks/useEventListener'

const PathCanvas = ({ setShowSound }) => {
    const [cnvRef, ctxRef] = useCanvas()
    const svgRef = useRef()
    const svgRect = useRef()
    const pathList = useRef([])
    const mouse = useRef({ x: undefined, y: undefined })

    function getPathData() {
        svgRect.current = svgRef.current.getBoundingClientRect()
        pathList.current = Array.from(svgRef.current.querySelectorAll('path'), (path) => {
            const { x, y, width, height } = path.getBBox()
            const d = path.getAttribute('d')
            const hide = path.dataset.name === 'hide'
            return new Path(d, { x, y, width, height, hide })
        })
    }

    useLayoutEffect(() => {
        getPathData()
        return () => {
            svgRect.current = null
            pathList.current = []
        }
    }, [])

    useEventListener(
        'resize',
        () => {
            getPathData()
        },
        window
    )

    useEventListener(
        'mousemove',
        (e) => {
            mouse.current.x = e.x - svgRect.current.left
            mouse.current.y = e.y - svgRect.current.top
        },
        document
    )

    const pathListLenght = pathList.current.length

    useRafCallback(({ delta }) => {
        if (cnvRef.current) {
            /** @type {HTMLCanvasElement} */
            const cnv = cnvRef.current
            const ctx = ctxRef.current
            ctx.clearRect(0, 0, cnv.width, cnv.height)
            // console.log(delta)

            for (let i = 0; i < pathListLenght; i++) {
                if (mouse.current.x && mouse.current.y) {
                    pathList.current[i].createSpringPosition(ctx, mouse.current, delta)

                    if (!checkIddle(pathList.current, pathListLenght)) {
                        setShowSound(false)
                    } else {
                        setShowSound(true)
                    }
                }
                pathList.current[i].draw(ctx)
            }
        }
    })

    return (
        <>
            {/* <SvgCircle svgRef={svgRef} /> */}
            <SvgCirclePack svgRef={svgRef} />
            <Canvas cnvRef={cnvRef} className={'pathCanvas'} width={400} height={400} />
        </>
    )
}

export default PathCanvas

export function checkIddle(pathList, len) {
    let iddle = true
    for (let i = 0; i < len; i++) {
        if (Math.abs(pathList[i].pos.x) > 4 || Math.abs(pathList[i].pos.y) > 4) {
            iddle = false
        }
    }
    return iddle
}
