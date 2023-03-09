import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Noise from './Noise'

const Loading = ({ setStartScale, setPlayMusic }) => {
    const [show, setShow] = useState(true)
    const [canClick, setCanClick] = useState(false)
    const el = useRef()
    const tl = useRef()

    const handleClick = () => {
        if (canClick) {
            gsap.context(() => {
                gsap.set('.loadingContainer__click', { display: 'none' })
                const tl = gsap.timeline()
                tl.to(
                    el.current,
                    {
                        duration: 1,
                        backgroundColor: 'transparent',
                    },
                    'time'
                )
                tl.to(
                    '.loadingSvgContainer',
                    {
                        scale: 3.5,
                        duration: 1,
                        ease: 'back.out(4)',
                    },
                    'time+=0.8'
                )
                    .to('.loadingSvgContainer', {
                        duration: 1,
                        opacity: 0,
                        onStart: () => {
                            setStartScale(true)
                            setPlayMusic(true)
                        },
                    })
                    .then(() => {
                        setShow(false)
                    })
            }, el.current)
        }
    }

    useLayoutEffect(() => {
        if (!el.current) return
        const ctx = gsap.context(() => {
            const elList = gsap.utils.toArray('.loadingSvg .loadingLeaf')
            tl.current = gsap
                .timeline()
                .to(elList, {
                    opacity: 1,
                    duration: 1,
                    stagger: 0.25,
                })
                .to(elList, {
                    opacity: 0,
                    duration: 1,
                    stagger: 0.25,
                })
                .to(elList, {
                    opacity: 1,
                    duration: 1,
                    stagger: 0.25,
                    onComplete: function () {
                        setCanClick(true)
                    },
                })
                .to('.loadingStart', { opacity: 1, duration: 1 })
                .set(el.current, { pointerEvents: 'auto' })
                .to('.loadingContainer__click', {
                    opacity: 1,
                    duration: 1,
                    yoyo: true,
                    repeat: -1,
                    ease: 'easeInOut',
                })
        }, el.current)
        return () => ctx.revert()
    }, [])
    return (
        show && (
            <div ref={el} className="loadingContainer" onClick={handleClick}>
                <Noise />
                <div className="loadingSvgContainer">
                    <svg
                        className="loadingSvg"
                        width="74"
                        height="74"
                        viewBox="0 0 74 74"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g className="loadingLeaf">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M37 1C37 20.8823 20.8823 37 1 37C1 17.1178 17.1177 1.00001 37 1Z"
                                fill="#FEFEFE"
                            />
                            <path
                                d="M37 1H37.5V0.5L37 0.5L37 1ZM1 37H0.5L0.5 37.5H1L1 37ZM36.5 1C36.5 20.6061 20.6061 36.5 1 36.5L1 37.5C21.1584 37.5 37.5 21.1584 37.5 1H36.5ZM1.5 37C1.5 17.3939 17.3939 1.50001 37 1.5L37 0.5C16.8416 0.500005 0.5 16.8416 0.5 37H1.5Z"
                                fill="#FEFEFE"
                            />
                        </g>
                        <g className="loadingLeaf">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M37 1C56.8823 1 73 17.1177 73 37C53.1177 37 37 20.8823 37 1Z"
                                fill="#FEFEFE"
                            />
                            <path
                                d="M37 1V0.5L36.5 0.5V1L37 1ZM73 37V37.5H73.5V37H73ZM37 1.5C56.6061 1.5 72.5 17.3939 72.5 37H73.5C73.5 16.8416 57.1584 0.5 37 0.5V1.5ZM73 36.5C53.3939 36.5 37.5 20.6061 37.5 1L36.5 1C36.5 21.1584 52.8416 37.5 73 37.5V36.5Z"
                                fill="#FEFEFE"
                            />
                        </g>
                        <g className="loadingLeaf">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M73 37C73 56.8823 56.8823 73 37 73C37 53.1177 53.1177 37 73 37Z"
                                fill="#FEFEFE"
                            />
                            <path
                                d="M73 37H73.5V36.5H73V37ZM37 73H36.5V73.5H37V73ZM72.5 37C72.5 56.6061 56.6061 72.5 37 72.5V73.5C57.1584 73.5 73.5 57.1584 73.5 37H72.5ZM37.5 73C37.5 53.3939 53.3939 37.5 73 37.5V36.5C52.8416 36.5 36.5 52.8416 36.5 73H37.5Z"
                                fill="#FEFEFE"
                            />
                        </g>
                        <g className="loadingLeaf">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1 37C20.8823 37 37 53.1177 37 73C17.1177 73 1 56.8823 1 37Z"
                                fill="#FEFEFE"
                            />
                            <path
                                d="M1 37V36.5H0.5V37H1ZM37 73V73.5H37.5V73H37ZM1 37.5C20.6061 37.5 36.5 53.3939 36.5 73H37.5C37.5 52.8416 21.1584 36.5 1 36.5L1 37.5ZM37 72.5C17.3939 72.5 1.5 56.6061 1.5 37H0.5C0.5 57.1584 16.8416 73.5 37 73.5V72.5Z"
                                fill="#FEFEFE"
                            />
                        </g>
                        <g className="loadingStart">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M37 1C37 20.8823 20.8823 37 1 37C20.8823 37 37 53.1177 37 73C37 53.1177 53.1177 37 73 37C53.1177 37 37 20.8823 37 1Z"
                                fill="#FEFEFE"
                            />
                            <path
                                d="M1 37.5C21.1584 37.5 37.5 21.1584 37.5 1H36.5C36.5 20.6061 20.6061 36.5 1 36.5L1 37.5ZM1 37.5C20.6061 37.5 36.5 53.3939 36.5 73H37.5C37.5 52.8416 21.1584 36.5 1 36.5L1 37.5ZM73 36.5C52.8416 36.5 36.5 52.8416 36.5 73H37.5C37.5 53.3939 53.3939 37.5 73 37.5V36.5ZM36.5 1C36.5 21.1584 52.8416 37.5 73 37.5V36.5C53.3939 36.5 37.5 20.6061 37.5 1H36.5Z"
                                fill="#FEFEFE"
                            />
                        </g>
                    </svg>
                </div>
                <div className="loadingContainer__click">
                    <p>click</p>
                </div>
            </div>
        )
    )
}

export default Loading
