import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

const AboutStars = () => {
    const starsRef = useRef()
    const top = (index) => {
        if (index === 0) return 100
        if (index === 1) return window.innerHeight * 0.5
        if (index === 2) return window.innerHeight - 100
    }
    const left = (index) => {
        if (index === 0) return window.innerWidth * 0.5
        if (index === 1) return 100
        if (index === 2) return window.innerWidth - 100
    }

    useLayoutEffect(() => {
        const gCtx = gsap.context(() => {
            const stars = gsap.utils.toArray('.aboutStars__star')
            gsap.set(stars, { scale: 0 })

            gsap.to('.aboutStars__arrow', { yoyo: true, repeat: -1, scaleY: 0.8, opacity: 0.5, duration: 0.5 })
            stars.forEach((star, i) => {
                gsap.to(star, { scale: 1, yoyo: true, repeat: -1, duration: 1 + i * 0.5 })
            })
        }, starsRef.current)

        return () => gCtx.revert()
    }, [])
    return (
        <div ref={starsRef} className="aboutStars__container">
            <div className="aboutStars__studio">
                <p>студия</p>
            </div>
            <div className="aboutStars__arrow">
                <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.58955 0.364057C7.24134 0.0112865 6.67149 0.00915603 6.31677 0.359299L0.536185 6.0652C0.18146 6.41535 0.17618 6.98517 0.524394 7.33794C0.872607 7.69071 1.44245 7.69284 1.79718 7.3427L6.93547 2.27078L11.9794 7.38077C12.3277 7.73354 12.8975 7.73567 13.2522 7.38553C13.607 7.03538 13.6122 6.46556 13.264 6.11279L7.58955 0.364057ZM6.0826 25.6362C6.43081 25.989 7.00065 25.9911 7.35538 25.641L13.136 19.9351C13.4907 19.5849 13.496 19.0151 13.1478 18.6623C12.7995 18.3096 12.2297 18.3074 11.875 18.6576L6.73667 23.7295L1.6927 18.6195C1.34449 18.2667 0.774647 18.2646 0.419922 18.6147C0.0651964 18.9649 0.0599174 19.5347 0.408131 19.8875L6.0826 25.6362ZM6.04727 0.994682L5.82489 24.9989L7.62488 25.0056L7.84726 1.00141L6.04727 0.994682Z"
                        fill="#666666"
                    />
                </svg>
            </div>
            {Array.from({ length: 3 }, (_, i) => {
                return (
                    <div
                        key={'star' + i}
                        className="aboutStars__star"
                        style={{ top: top(i), left: left(i), width: 10 + i * 5 }}>
                        <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.25094 4.0918C7.82284 2.92575 8.10906 1.64034 8.08594 0.341797C8.06281 1.64034 8.34903 2.92575 8.92094 4.0918C9.60756 5.39988 10.7259 6.42988 12.0859 7.0068C13.1864 7.51254 14.3757 7.79629 15.5859 7.8418C14.3757 7.88731 13.1864 8.17105 12.0859 8.6768C10.7259 9.25371 9.60756 10.2837 8.92094 11.5918C8.34903 12.7578 8.06281 14.0433 8.08594 15.3418C8.10906 14.0433 7.82284 12.7578 7.25094 11.5918C6.56431 10.2837 5.44597 9.25371 4.08594 8.6768C2.98552 8.17105 1.79616 7.88731 0.585938 7.8418C1.79616 7.79629 2.98552 7.51254 4.08594 7.0068C5.44597 6.42988 6.56431 5.39988 7.25094 4.0918Z"
                                fill="#D1D1D1"
                            />
                        </svg>
                    </div>
                )
            })}
        </div>
    )
}

export default AboutStars
