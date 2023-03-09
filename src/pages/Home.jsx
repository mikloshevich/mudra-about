import { useLayoutEffect, useRef, useState } from 'react'
import Loading from '../components/Loading'
import { gsap } from 'gsap'
import Noise from '../components/Noise'
import PathCanvas from '../components/homePage/PathCanvas'
import SoundCanvas from '../components/homePage/SoundCanvas'

const Home = () => {
    const [showSound, setShowSound] = useState(true)
    const [startScale, setStartScale] = useState(false)
    const [playMusic, setPlayMusic] = useState(false)
    const homePageRef = useRef()

    useLayoutEffect(() => {
        if (!homePageRef.current) return
        const ctx = gsap.context(() => {
            gsap.set(homePageRef.current, { pointerEvents: 'none' })
            gsap.set('.homePage__center', { opacity: 0 })
            if (startScale) {
                gsap.to('.homePage__center', {
                    duration: 1,
                    opacity: 1,
                    ease: 'none',
                }).then(() => {
                    gsap.to(homePageRef.current, { pointerEvents: 'auto' })
                })
            }
        }, homePageRef.current)
        return () => {
            ctx.revert()
        }
    }, [startScale])

    return (
        <>
            <Noise />
            <Loading setStartScale={(val) => setStartScale(val)} setPlayMusic={(val) => setPlayMusic(val)} />
            <div ref={homePageRef} className="homePage">
                <div className="homePage__center">
                    <SoundCanvas playMusic={playMusic} showSound={showSound} />
                    <PathCanvas setShowSound={(val) => setShowSound(val)} />
                </div>
            </div>
        </>
    )
}

export default Home
