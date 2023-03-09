import { useContext, useEffect, useRef, useState } from 'react'
import audioFile from '../assets/homePage/another_pad3.5.mp3'
import { MenuContext } from '../context/MenuContext'
import Sound from '../lib/Sound'
import useEventListener from './useEventListener'
import { gsap } from 'gsap'

export default function useAudioContext(playMusic, { volume = 0.5, loop = true, autoplay = true } = {}) {
    const { soundMute } = useContext(MenuContext)
    const audioRef = useRef()
    const soundRef = useRef()

    useEventListener(
        'click',
        () => {
            if (!soundRef.current) {
                audioRef.current = new Audio(audioFile)
                soundRef.current = new Sound(audioRef.current)
                audioRef.current.volume = 0
                audioRef.current.loop = loop
                audioRef.current.autoplay = autoplay
            }
        },
        document
    )

    useEffect(() => {
        if (audioRef.current) {
            if (playMusic) {
                soundRef.current.resume()
                if (!soundMute) {
                    audioRef.current.volume = volume
                    audioRef.current.play()
                } else {
                    audioRef.current.volume = 0
                    audioRef.current.pause()
                }
            }
        }
    }, [playMusic])

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (audioRef.current) {
                if (soundMute) {
                    gsap.set(audioRef.current, { volume: volume })
                    gsap.to(audioRef.current, {
                        duration: 1,
                        volume: 0.0,
                    }).then(() => {
                        audioRef.current.pause()
                    })
                } else {
                    audioRef.current.play()
                    gsap.set(audioRef.current, { volume: 0.0 })
                    gsap.to(audioRef.current, { duration: 1, volume: volume, ease: 'power2.in' })
                }
            }
        })

        return () => {
            ctx.revert()
        }
    }, [soundMute])

    return { soundRef }
}
