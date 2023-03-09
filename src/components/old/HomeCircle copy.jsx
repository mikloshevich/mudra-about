import { useEffect, useRef, useState } from 'react'
import useRafCallback from '../hooks/useRafCallback'

const HomeCircle = ({ svgRef, pointRef, pathsRef, setShowSound }) => {
    const newSvg = useRef()
    // const handleMouseMove = (e) => {
    //     if (pointRef.current) {
    //         pointRef.current.x = e.clientX
    //         pointRef.current.y = e.clientY
    //         pointRef.current = pointRef.current.matrixTransform(svgRef.current.getScreenCTM().inverse())
    //     }
    // }

    // const handleMouseEnter = () => {
    //     pointRef.current.x = window.innerWidth / 2
    //     pointRef.current.y = window.innerHeight / 2
    //     pointRef.current = pointRef.current.matrixTransform(svgRef.current.getScreenCTM().inverse())
    // }

    const handlePathMouseEnter = (e) => {
        if (!e.currentTarget.hasAttribute('data-center')) {
            let transform = e.currentTarget.getAttribute('transform').replace('scale(1)', 'scale(0.8)')

            let rotate = e.currentTarget.getAttribute('transform').match(/rotate\(([^)]+)\)/)
            let deg = +rotate[1] - 15
            let newRotate = `rotate(${deg})`

            let translate = e.currentTarget.getAttribute('transform').match(/translate\(([^)]+)\)/)
            let translateVal = translate[1]
                .split(', ')
                .map((t) => +t * 1.5)
                .join(', ')
            let newTranslate = `translate(${translateVal})`
            transform = transform.replace(translate[0], newTranslate)
            e.currentTarget.setAttribute('transform', transform)
        }
        // else {
        //     let transform = e.currentTarget.getAttribute('transform')
        //     let rotate = transform.match(/rotate\(([^)]+)\)/)
        //     if (!rotate) {
        //         transform = transform + ' rotate(90)'
        //     }
        //     e.currentTarget.setAttribute('transform', transform)
        // }
    }

    const handlePathMouseLeave = (e) => {
        if (!e.currentTarget.hasAttribute('data-center')) {
            let transform = e.currentTarget.getAttribute('transform').replace('scale(0.8)', 'scale(1)')
            let rotate = e.currentTarget.getAttribute('transform').match(/rotate\(([^)]+)\)/)
            let deg = +rotate[1] + 15
            let newRotate = `rotate(${deg})`
            let translate = e.currentTarget.getAttribute('transform').match(/translate\(([^)]+)\)/)
            let translateVal = translate[1]
                .split(', ')
                .map((t) => +t / 1.5)
                .join(', ')
            let newTranslate = `translate(${translateVal})`
            transform = transform.replace(translate[0], newTranslate)
            // transform = transform.replace(rotate[0], newRotate)
            e.currentTarget.setAttribute('transform', transform)
        }
        // else {
        //     let transform = e.currentTarget.getAttribute('transform')
        //     let rotate = transform.match(/rotate\(([^)]+)\)/)
        //     transform = transform.replace('rotate(90)', '')
        //     e.currentTarget.setAttribute('transform', transform)
        // }
    }

    const handleSvgMouseMove = (e) => {
        e.currentTarget.style.transitionDuration = '0ms'
        const bRect = e.currentTarget.getBoundingClientRect()
        const x = 1 - ((e.clientX - bRect.left) / bRect.width) * 2
        const y = 1 - ((e.clientY - bRect.top) / bRect.height) * 2
        e.currentTarget.style.transform = `rotateY(${x * -15}deg) rotateX(${y * 15}deg)`
    }

    const angleRef = useRef(30)

    const positions = useRef([])

    function calcPartsPos() {
        setShowSound(false)
        positions.current = []
        const paths = [...newSvg.current.querySelectorAll('path')]
        paths.forEach((path, i) => {
            if (!path.hasAttribute('data-center')) {
                const { x, y, width, height } = path.getBBox()
                const posX = (x + Math.cos(i / paths.length) - width + 20) * 0.5
                const posY = (y + Math.sin(i / paths.length) - height + 20) * 0.5

                positions.current.push({ x: posX, y: posY })

                path.setAttribute(
                    'transform',
                    `translate(${posX}, ${posY}) rotate(${(angleRef.current % 90) - 30}) scale(1)`
                )
            } else {
                path.setAttribute('transform', `scale(0.5) rotate(${(angleRef.current % 90) - 30})`)
            }
        })
        angleRef.current += 30
    }

    function resetPos(e) {
        e.currentTarget.style.transitionDuration = '300ms'
        e.currentTarget.style.transform = `rotateX(0) rotateY(0)`
        setShowSound(true)
        const paths = [...newSvg.current.querySelectorAll('path')]
        paths.forEach((path) => {
            if (!path.hasAttribute('data-center')) {
                path.setAttribute('transform', `translate(0, 0) rotate(0)`)
            } else {
                path.setAttribute('transform', `scale(1) rotate(0)`)
            }
        })
    }

    return (
        <div className="circleSvgContainer">
            <svg
                width="340"
                height="340"
                viewBox="0 0 340 340"
                fill="none"
                stroke="#FEFEFE"
                xmlns="http://www.w3.org/2000/svg"
                ref={svgRef}
                // onMouseEnter={calcPartsPos}
                // onMouseLeave={resetPos}
                style={{ display: 'none' }}>
                <path
                    d="M170 42C170 112.692 112.692 170 42 170C112.692 170 170 227.308 170 298C170 227.308 227.308 170 298 170C227.308 170 170 112.692 170 42Z"
                    fill="#FEFEFE"
                    data-center
                />
                <path d="M42 170C112.692 170 170 112.692 170 42C99.3075 42 42 99.3076 42 170Z" fill="#FEFEFE" />
                <path
                    d="M298 170C298 240.692 240.692 298 170 298C170 227.308 227.308 170 298 170Z"
                    fill="#FEFEFE"
                />
                <path
                    d="M170 42C240.692 42 298 99.3076 298 170C227.308 170 170 112.692 170 42C170 42 170 42 170 42Z"
                    fill="#FEFEFE"
                />
                <path
                    d="M42 170C112.692 170 170 227.308 170 298C99.3075 298 42 240.692 42 170C42 170 42 170 42 170Z"
                    fill="#FEFEFE"
                />
            </svg>
            <svg
                width="340"
                height="340"
                viewBox="0 0 340 340"
                fill="none"
                stroke="#FEFEFE"
                xmlns="http://www.w3.org/2000/svg"
                ref={newSvg}
                // onMouseMove={handleSvgMouseMove}
                onMouseEnter={calcPartsPos}
                onMouseLeave={resetPos}>
                {createPathList(pathsRef.current) &&
                    createPathList(pathsRef.current).map(({ d, fill, center }) => {
                        return (
                            <path
                                key={d}
                                d={d}
                                fill={fill}
                                data-center={center}
                                onMouseLeave={handlePathMouseLeave}
                                onMouseEnter={handlePathMouseEnter}></path>
                        )
                    })}
            </svg>
        </div>

        // <svg
        //     ref={svgRef}
        //     width="300"
        //     height="300"
        //     viewBox="0 0 300 300"
        //     fill="none"
        //     stroke="#FEFEFE"
        //     xmlns="http://www.w3.org/2000/svg"
        //     onMouseEnter={calcPartsPos}
        //     onMouseLeave={resetPos}>
        //     <path
        //         d="M150 42C150 101.647 101.647 150 42 150C101.647 150 150 198.353 150 258C150 198.353 198.353 150 258 150C198.353 150 150 101.647 150 42Z"
        //         fill="#FEFEFE"
        //         data-center
        //     />
        //     <path d="M42 150C101.647 150 150 101.647 150 42C90.3532 42 42 90.3533 42 150Z" fill="#FEFEFE" />
        //     <path d="M258 150C258 209.647 209.647 258 150 258C150 198.353 198.353 150 258 150Z" fill="#FEFEFE" />
        //     <path
        //         d="M150 42C209.647 42 258 90.3533 258 150C198.353 150 150 101.647 150 42C150 42 150 42 150 42Z"
        //         fill="#FEFEFE"
        //     />
        //     <path
        //         d="M42 150C101.647 150 150 198.353 150 258C90.3532 258 42 209.647 42 150C42 150 42 150 42 150Z"
        //         fill="#FEFEFE"
        //     />
        // </svg>

        // <svg
        //     // onMouseMove={handleMouseMove}
        //     // onMouseOut={() =>
        //     //     pathsRef.current.forEach((p) => {
        //     //         p.x = 0
        //     //         p.y = 0
        //     //     })
        //     // }
        //     onMouseEnter={calcPartsPos}
        //     onMouseLeave={resetPos}
        //     ref={svgRef}
        //     width="400"
        //     height="400"
        //     viewBox="0 0 400 400"
        //     fill="none"
        //     xmlns="http://www.w3.org/2000/svg">
        //     <path
        //         d="M92 200C151.647 200 200 151.647 200 92C140.353 92 92 140.353 92 200Z"
        //         fill="#FEFEFE"
        //         stroke="#FEFEFE"
        //     />
        //     <path
        //         d="M308 200C308 259.647 259.647 308 200 308C200 248.353 248.353 200 308 200Z"
        //         fill="#FEFEFE"
        //         stroke="#FEFEFE"
        //     />
        //     <path
        //         d="M200 92C200 151.647 151.647 200 92 200C151.647 200 200 248.353 200 308C200 248.353 248.353 200 308 200C248.353 200 200 151.647 200 92Z"
        //         fill="#FEFEFE"
        //         stroke="#FEFEFE"
        //         data-center
        //     />
        //     <path
        //         d="M200 92C259.647 92 308 140.353 308 200C248.353 200 200 151.647 200 92C200 92 200 92 200 92Z"
        //         fill="#FEFEFE"
        //         stroke="#FEFEFE"
        //     />
        //     <path
        //         d="M92 200C151.647 200 200 248.353 200 308C140.353 308 92 259.647 92 200C92 200 92 200 92 200Z"
        //         fill="#FEFEFE"
        //         stroke="#FEFEFE"
        //     />
        // </svg>
    )
}

export default HomeCircle

export function createPathList(pathNodeList) {
    if (!pathNodeList) {
        return null
    }
    const pathList = []
    pathNodeList.forEach((path) => {
        const d = path.getAttribute('d')
        const fill = path.getAttribute('fill')
        const center = path.getAttribute('data-center')
        pathList.push({ d, fill, center })
    })
    return pathList
}

export function calcPos(paths, pathPos, point, alpha, show, moveDistance = 50) {
    if (pathPos.current.length > 0) {
        for (let i = 0; i < paths.current.length; i++) {
            const path = paths.current[i]
            if (!path.hasAttribute('data-center')) {
                const { x, y, width, height } = path.getBBox()
                let deltaX = Math.cos(x)
                let deltaY = Math.cos(y)
                // let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
                pathPos.current[i].x = deltaX * moveDistance
                pathPos.current[i].y = deltaY * moveDistance
                alpha.current = 0.3
                path.style.transform = `translate(${pathPos.current[i].x}px, ${pathPos.current[i].y}px)`
                path.style.setProperty('--shadow-alpha', alpha.current)
            }
            show(false)
        }
    }
}

export function drawCircleParts(
    paths,
    pathPos,
    point,
    rotate,
    alpha,
    show,
    triggerDistance = 70,
    moveDistance = -90
) {
    if (pathPos.current.length > 0) {
        for (let i = 0; i < paths.current.length; i++) {
            const path = paths.current[i]
            const { x, y, width, height } = path.getBBox()
            let deltaX = point.current.x - (x + width / 2)
            let deltaY = point.current.y - (y + height / 2)
            let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
            if (distance < triggerDistance) {
                pathPos.current[i].x = (deltaX / distance) * moveDistance
                pathPos.current[i].y = (deltaY / distance) * moveDistance
                alpha.current = 0.3
                rotate.current = Math.atan2(deltaX, deltaY) * -10
            } else {
                pathPos.current[i].x = 0
                pathPos.current[i].y = 0
            }

            if (pathPos.current[i].x === 0 && pathPos.current[i].y === 0) {
                alpha.current = 0
                rotate.current = 0
            }
            if (!checkIddle(pathPos.current)) {
                show(false)
            } else {
                show(true)
            }

            path.style.transform = `rotate(${rotate.current}deg) translate(${pathPos.current[i].x}px, ${pathPos.current[i].y}px)`
            path.style.setProperty('--shadow-alpha', alpha.current)
        }
    }
}

export function checkIddle(paths) {
    let iddle = true
    for (let i = 0; i < paths.length; i++) {
        if (paths[i].x !== 0 || paths[i].y !== 0) {
            iddle = false
        }
    }
    return iddle
}

export function useCircleAnimation() {
    const [showSound, setShowSound] = useState(true)
    const svgRef = useRef(null)
    const pathsRef = useRef(null)
    const pathPosRef = useRef([])
    const pointRef = useRef()
    const alphaRef = useRef(0)
    const rotateRef = useRef(0)

    useEffect(() => {
        pathPosRef.current = []
        pathsRef.current = svgRef.current.querySelectorAll('path')
        pathsRef.current.forEach((p, i) => {
            pathPosRef.current.push({
                x: 0,
                y: 0,
            })
        })
        pointRef.current = svgRef.current.createSVGPoint()
        // calcPos(pathsRef, pathPosRef, pointRef, alphaRef, setShowSound)
    }, [])

    return { svgRef, pathsRef, pathPosRef, pointRef, alphaRef, rotateRef, showSound, setShowSound }
}

// export function useCircleAnimation() {
//     const [showSound, setShowSound] = useState(true)
//     const svgRef = useRef(null)
//     const pathsRef = useRef(null)
//     const pointRef = useRef()
//     const pathPosRef = useRef([])
//     const alphaRef = useRef(0)
//     const rotateRef = useRef(0)

//     useEffect(() => {
//         pathPosRef.current = []
//         pathsRef.current = svgRef.current.querySelectorAll('path')
//         pathsRef.current.forEach((p, i) => {
//             pathPosRef.current.push({
//                 x: 0,
//                 y: 0,
//             })
//         })
//         pointRef.current = svgRef.current.createSVGPoint()
//     }, [])

//     useRafCallback(() => {
//         drawCircleParts(pathsRef, pathPosRef, pointRef, rotateRef, alphaRef, setShowSound)
//     })

//     return { svgRef, pathsRef, pointRef, pathPosRef, alphaRef, rotateRef, showSound }
// }
