import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import About1 from './About1'
import About2 from './About2'
import About3 from './About3'
import About4 from './About4'
import About5 from './About5'
import About6 from './About6'
import About7 from './About7'
import About8 from './About8'
import AboutStars from './AboutStars'
import AboutChicken from './Chicken/AboutChicken'
import Noise from '../Noise'
import notMarina from '../../assets/aboutPage/notMarina.png'
import notAndrew from '../../assets/aboutPage/notAndrew.png'
import notPablo from '../../assets/aboutPage/notPablo.png'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import MotionPathPlugin from 'gsap/dist/MotionPathPlugin'
import { interpolate } from 'flubber'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const AboutWrapper = () => {
    const [modelLoaded, setModelLoaded] = useState(false)
    const [loadVisible, setLoadVisible] = useState(true)
    const scrollRef = useRef()
    const chickenModel = useRef(null)

    useLayoutEffect(() => {
        setLoadVisible(true)
        console.clear()
        let gCtx
        let timeout = window.setTimeout(() => {
            gCtx = gsap.context((self) => {
                const galleryItems = gsap.utils.toArray('.aboutGallery__item')
                const teamNames = gsap.utils.toArray('.aboutSlide__team')

                gsap.set(teamNames, { autoAlpha: 0, scale: 0, transformOrigin: 'left' })

                gsap.set(galleryItems, { scale: 0, transformOrigin: 'top', autoAlpha: 0 })
                gsap.set('.chickenTwoCircles', { autoAlpha: 0 })
                gsap.set('.aboutChicken__3DModel', { autoAlpha: 0 })
                gsap.set(scrollRef.current, { pointerEvents: 'none', autoAlpha: 0 })
                gsap.set('.aboutSlide__discount_text', { transformOrigin: 'center' })
                gsap.set('.aboutSlide__discount_text', { transformOrigin: 'center' })
                // gsap.set('[data-move-sanskrit]', { transformOrigin: 'top' })

                const twoCirclesPath = self.selector('.chickenTwoCircles')[0]
                const twoCirclesD = twoCirclesPath.getAttribute('d')
                const chickenHeartD = self.selector('.chickenHeart')[0].getAttribute('d')
                const chickenDeviD = self.selector('.chickenDevi')[0].getAttribute('d')
                const chickenChickenD = self.selector('.chickenChicken')[0].getAttribute('d')

                gsap.set(twoCirclesPath, { transformOrigin: 'center' })

                const morphValHeart = {
                    a: 0,
                }
                const morphValDevi = {
                    a: 0,
                }
                const morphValChicken = {
                    a: 0,
                }

                const morphToHeart = interpolate(twoCirclesD, chickenHeartD, {
                    maxSegmentLength: 3,
                })
                const morphToDevi = interpolate(chickenHeartD, chickenDeviD, {
                    maxSegmentLength: 3,
                })
                const morphToChicken = interpolate(chickenDeviD, chickenChickenD, {
                    maxSegmentLength: 3,
                })

                if (modelLoaded) {
                    // console.clear()
                    // console.log(chickenModel?.current)
                    gsap.to('.aboutLoad', { autoAlpha: 0 }).then(() => {
                        setLoadVisible(false)
                    })
                    gsap.to(scrollRef.current, { autoAlpha: 1 }).then(() =>
                        gsap.set(scrollRef.current, { pointerEvents: 'auto' })
                    )

                    gsap.defaults({ ease: 'none' })

                    const scrollTween = gsap.to(scrollRef.current, {
                        x: -(scrollRef.current.offsetWidth - window.innerWidth),
                        scrollTrigger: {
                            trigger: scrollRef.current,
                            pin: true,
                            scrub: 1,
                            end: '+=12000',
                            // markers: true,
                        },
                    })

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: '.aboutGalleryWrapper',
                            containerAnimation: scrollTween,
                            start: 'left left',
                            end: `left+=${window.innerWidth * 4.5} left`,
                            scrub: true,
                            // markers: true,
                        },
                    })
                        .to('.aboutGalleryWrapper', { translateX: window.innerWidth * 4.5 })
                        .to('.aboutStars__container', { translateX: window.innerWidth * 4.5 }, 0)

                    // Vacancy Animation:
                    gsap.set('.aboutSlide__vacancy', { autoAlpha: 0 })
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: '.aboutSlide5',
                            containerAnimation: scrollTween,
                            start: 'left left',
                            end: (self) => `right left`,
                            scrub: true,
                            // markers: true,
                        },
                    })
                        .to('.aboutSlide__vacancy', {
                            autoAlpha: 1,
                            x: (index, element) => element.offsetWidth * 2,
                        })
                        .to('.aboutSlide__vacancy', {
                            autoAlpha: 0,
                        })

                    // teamNames.forEach((item, i) => {
                    //     const isLast = i === teamNames.length - 1
                    //     gsap.timeline({
                    //         scrollTrigger: {
                    //             trigger: '.aboutGallery',
                    //             containerAnimation: scrollTween,
                    //             start: `center+=${window.innerWidth * i + window.innerWidth * 0.25} center`,
                    //             end: `center+=${window.innerWidth * (i + 1) + window.innerWidth * 0.4} center`,
                    //             scrub: true,
                    //         },
                    //     })
                    //         .to(item, { autoAlpha: 1 })
                    //         .to(item, {
                    //             autoAlpha: 0,
                    //         })
                    // })

                    // ============ Path Move Animation =================
                    galleryItems.forEach((item, i) => {
                        const isLast = i === galleryItems.length - 1
                        let pathId = '#movePathLeft'
                        if (i % 2 === 0) {
                            pathId = '#movePathLeft'
                        } else {
                            pathId = '#movePathRight'
                        }
                        const tl = gsap.timeline({
                            defaults: { ease: 'none' },
                            scrollTrigger: {
                                trigger: '.aboutGallery',
                                containerAnimation: scrollTween,
                                start: `center+=${window.innerWidth * i + window.innerWidth * 0.25} center`,
                                end: `center+=${window.innerWidth * (i + 1) + window.innerWidth} center`,
                                scrub: true,
                            },
                        })
                        tl.to(
                            item,
                            {
                                scale: 1,
                                autoAlpha: 1,
                                motionPath: {
                                    path: pathId,
                                    align: pathId,
                                    alignOrigin: [0.5, 1],
                                    start: 0,
                                    end: 0.5,
                                },
                            },
                            'begin'
                        )
                        tl.to(
                            teamNames[i],
                            {
                                autoAlpha: 1,
                                scale: 1,
                            },
                            'begin'
                        )
                        tl.to(teamNames[i], {
                            autoAlpha: 0,
                        })
                        if (isLast) {
                            tl.to(
                                item,
                                {
                                    autoAlpha: 0,
                                },
                                'end'
                            )
                        } else {
                            tl.to(
                                item,
                                {
                                    autoAlpha: 0,
                                    scale: 2,
                                    motionPath: {
                                        path: pathId,
                                        align: pathId,
                                        alignOrigin: [0.5, 1],
                                        start: 0.5,
                                        end: 1,
                                    },
                                },
                                'end'
                            )
                        }
                        // tl.to(
                        //     teamNames[i],
                        //     {
                        //         autoAlpha: 0,
                        //     },
                        //     'end'
                        // )
                    })

                    gsap.to('.aboutSlide__discount_text', {
                        duration: 20,
                        rotate: 360,
                        repeat: -1,
                        ease: 'none',
                    })

                    // Sanskrit:
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: '.aboutChicken__wrapper',
                            containerAnimation: scrollTween,
                            start: 'left left',
                            end: `left+=${window.innerWidth * 3} right`,
                            scrub: true,
                        },
                    })
                        .to(
                            '[data-move-sanskrit]',
                            {
                                x: '200%',
                                autoAlpha: 0,
                            },
                            'time'
                        )
                        .to(
                            '.aboutSlide6__bottom .aboutSlide__features',
                            {
                                x: '200%',
                                autoAlpha: 0,
                            },
                            'time'
                        )

                    // ================ Chicken Animation =====================

                    // Chicken:
                    gsap.to('.aboutChicken__wrapper', {
                        x: '650vw',
                        scrollTrigger: {
                            trigger: '.aboutChicken__wrapper',
                            containerAnimation: scrollTween,
                            start: 'left left',
                            end: `left+=${window.innerWidth * 7.5} right`,
                            scrub: true,
                            // markers: true,
                        },
                    })
                    gsap.to('.aboutSlide7', {
                        x: '200vw',
                        scrollTrigger: {
                            trigger: '.aboutSlide7',
                            containerAnimation: scrollTween,
                            start: 'left left',
                            end: `right+=${window.innerWidth} left`,
                            scrub: true,
                            // markers: true,
                        },
                    })
                    const chickenTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.aboutChicken__wrapper',
                            containerAnimation: scrollTween,
                            start: 'left left',
                            end: `left+=${window.innerWidth * 6.5} right`,
                            scrub: true,
                            // markers: true,
                        },
                    })

                    gsap.set(['.chickenCircle__left', '.chickenCircle__right'], {
                        scale: 0,
                        autoAlpha: 0,
                        transformOrigin: 'center',
                    })
                    chickenTl.to(
                        ['.chickenCircle__left', '.chickenCircle__right'],
                        {
                            scale: 1,
                            autoAlpha: 1,
                        },
                        'start'
                    )
                    chickenTl.to(
                        '.chickenCircle__left',
                        {
                            attr: { cx: 128 },
                        },
                        'second'
                    )
                    chickenTl.to(
                        '.chickenCircle__right',
                        {
                            attr: { cx: 472 },
                        },
                        'second'
                    )
                    chickenTl.to(
                        '.chickenCircle__left',
                        {
                            attr: { cx: 226 },
                        },
                        'third'
                    )
                    chickenTl
                        .to(
                            '.chickenCircle__right',
                            {
                                attr: { cx: 374 },
                            },
                            'third'
                        )
                        .set('.chickenTwoCircles', { autoAlpha: 1 })
                        .set(['.chickenCircle__right', '.chickenCircle__left'], { autoAlpha: 0 })

                    chickenTl.to(morphValHeart, {
                        a: 1,
                        onUpdate: () => {
                            twoCirclesPath.setAttribute('d', morphToHeart(morphValHeart.a))
                        },
                    })

                    chickenTl.to(morphValDevi, {
                        a: 1,
                        onUpdate: () => {
                            twoCirclesPath.setAttribute('d', morphToDevi(morphValDevi.a))
                        },
                    })
                    chickenTl.to(twoCirclesPath, {
                        rotate: 180,
                    })
                    chickenTl.to(morphValChicken, {
                        a: 1,
                        onUpdate: () => {
                            twoCirclesPath.setAttribute('d', morphToChicken(morphValChicken.a))
                        },
                    })
                    chickenTl.to(
                        '.aboutChicken__svg',
                        {
                            rotateY: 540,
                            autoAlpha: 0,
                        },
                        '3d'
                    )
                    chickenTl.to('.aboutChicken__3DModel', { autoAlpha: 1 }, '3d')
                    chickenTl.to(
                        chickenModel?.current.rotation,
                        {
                            y: Math.PI * 4,
                        },
                        '3d'
                    )
                    chickenTl.to(chickenModel?.current.rotation, {
                        y: Math.PI * 4 + Math.PI,
                    })
                    chickenTl.to(chickenModel?.current.rotation, {
                        y: Math.PI * 5 + Math.PI,
                    })
                }
            }, scrollRef.current)
        }, 200)

        return () => {
            if (gCtx) gCtx.revert()
            if (timeout) window.clearTimeout(timeout)
        }
    }, [modelLoaded])

    return (
        <div className="aboutWrapper">
            {loadVisible && <div className="aboutLoad"></div>}
            <div ref={scrollRef} className="aboutContainer">
                <Noise />
                <div className="aboutGalleryWrapper">
                    <svg
                        data-tragectory-path
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        stroke="none"
                        fill="none">
                        <path id="movePathRight" d="M50,50 L75,100 l25,50" />
                        <path id="movePathLeft" d="M50,50 L25,100 l-25,50" />
                    </svg>
                    <div className="aboutSlide__team z-up">
                        <p className="aboutSlide__team_name">Марина Мудролюбова</p>
                        <p className="aboutSlide__team_job">CEO</p>
                    </div>
                    <div className="aboutSlide__team z-up">
                        <p className="aboutSlide__team_name">Андрей Мудролюбов</p>
                        <p className="aboutSlide__team_job">арт-директор</p>
                    </div>
                    <div className="aboutSlide__team z-up">
                        <p className="aboutSlide__team_name">Павел Кац</p>
                        <p className="aboutSlide__team_job">team lead</p>
                    </div>
                    <div className="aboutSlide__team z-up">
                        <p className="aboutSlide__team_name">Ты</p>
                    </div>
                    <div className="aboutGallery">
                        <div className="aboutGallery__item">
                            <img src={notMarina} alt="not Marina" />
                        </div>
                        <div className="aboutGallery__item">
                            <img src={notAndrew} alt="not Andrew" />
                        </div>
                        <div className="aboutGallery__item">
                            <img src={notPablo} alt="not Pablo" />
                        </div>
                        <div className="aboutGallery__item aboutGallery__item_svg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 645 890" fill="#fefefe">
                                <g>
                                    <path
                                        d="M644.93,343.31C658.25,661.9,405.05,883.82,97.1,890h0C83.29,570.88,336.39,348.53,644.9,342.09v.14h0C644.92,342.59,644.92,343,644.93,343.31Z"
                                        fillRule="evenodd"
                                    />
                                    {/* <path
                                        data-cross-shadow
                                        d="M379.24,624.33h48.42V607.85H379.24V559.42H362.76v48.43H314.33v16.48h48.43v48.43h16.48Z"
                                    /> */}
                                </g>
                            </svg>
                        </div>
                        {/* <svg
                            data-tragectory-path
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="none"
                            fill="none"
                            viewBox="0 0 210.93 439.91">
                            <path
                                id="movePath"
                                d="M141.47.12l67.44,269.76A50.8,50.8,0,0,1,205.06,305L151.88,411.31c-18.9,37.81-73,37.37-91.31-.74L5.51,295.86a50.87,50.87,0,0,1-3.4-34.71L69.47.12"
                            />
                        </svg> */}
                        {/* Path leaf */}
                        {/* <svg
                            data-tragectory-path
                            xmlns="http://www.w3.org/2000/svg"
                            width="423.72"
                            height="459"
                            stroke="#fefefe"
                            fill="none"
                            viewBox="0 0 423.72 459">
                            <path
                                id="movePath"
                                d="M422.25,0C188.91.8,0,190.19,0,423.71Q0,441.55,1.47,459c233.34-.8,422.25-190.18,422.25-423.7Q423.72,17.47,422.25,0Z"
                            />
                        </svg> */}
                        {/* Path round */}
                        {/* <svg
                            data-tragectory-path
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="none"
                            fill="none"
                            viewBox="0 0 539.79 482.82">
                            <path
                                id="movePath"
                                d="M470.66,12.46c-42.17-42.18-178.94,26.2-305.47,152.73S-29.71,428.48,12.46,470.66,347.58,441.54,474.12,315,512.84,54.63,470.66,12.46Z"
                            />
                        </svg> */}
                        {/* <svg
                            data-tragectory-path
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="none"
                            fill="none"
                            viewBox="0 0 508.34 487.06">
                            <path
                                id="movePath"
                                d="M417.65.5v1c27.08,0,49,7.79,65,23.16,13.51,14.46,22.48,32.82,26.64,54.59,4.07,21.3,3.48,45.42-1.75,71.69s-15,54.08-28.95,82.63c-14.31,29.21-32.78,58.59-54.88,87.32-19.72,25.64-45.24,49.85-75.84,72a529.52,529.52,0,0,1-93.25,53.32C192.57,474,126,490.63,76.53,490.63c-23.8,0-42.44-4-53.9-11.45-10.19-6.65-17-21.05-19.78-41.64-4-29.8.93-69.83,13.47-109.81C30.09,283.83,52,243.5,78.11,214.17c55-61.84,116.38-114.87,177.62-153.37,30.14-18.94,59.2-33.65,86.38-43.72C370,6.74,395.43,1.5,417.63,1.5l0-1m0,0c-91,0-228.74,87.53-340.27,213C1.26,299.12-20.65,452.11,22.08,480c12,7.82,30.92,11.61,54.45,11.61,95.16,0,264.89-62.09,348-170.13C514.53,204.5,539,83.38,483.39,24,466.63,7.91,444.12.5,417.63.5Z"
                            />
                        </svg> */}
                    </div>
                </div>
                <AboutStars />
                <About1 />
                <About2 />
                <About3 />
                <About4 />
                <About5 />
                <section className="aboutSlide aboutSlide5 aboutSlide__empty"></section>
                <div className="aboutChicken__zone">
                    <AboutChicken chickenModel={chickenModel} setModelLoaded={(val) => setModelLoaded(val)} />
                    {/* <AboutChicken chickenModel={chickenModel} /> */}
                    <About6 />
                    <About7 />
                </div>
                <About8 />
            </div>
        </div>
    )
}

export default AboutWrapper
