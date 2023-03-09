import { useContext, useLayoutEffect, useRef, useState } from 'react'
import { MenuContext } from '../../context/MenuContext'
import { gsap } from 'gsap'
import { interpolate, toRect, fromRect } from 'flubber'

const RightMenu = ({ openRight, setOpenRight }) => {
    const [lang, setLang] = useState('en')
    const { setSoundMute, soundMute } = useContext(MenuContext)
    const mainSoundPath = useRef()
    const soundOnRef = useRef()
    const soundOffRef = useRef()

    const handleLang = () => {
        if (lang === 'en') {
            setLang('ru')
        } else {
            setLang('en')
        }
    }

    const handleMute = () => {
        const morph = interpolate(soundOnRef.current.getAttribute('d'), soundOffRef.current.getAttribute('d'), {
            maxSegmentLength: 3,
        })

        const val = {
            a: 0,
        }

        // const morph = morphPath(soundOnRef.current.getAttribute('d'), soundOffRef.current.getAttribute('d'))
        if (!soundMute) {
            setSoundMute(true)
            gsap.set(val, { a: 0 })
            gsap.to(val, {
                a: 1,
                duration: 0.3,
                ease: 'none',
                onUpdate: () => {
                    mainSoundPath.current.setAttribute('d', morph(val.a))
                },
            })
        } else {
            setSoundMute(false)
            gsap.set(val, { a: 1 })
            gsap.to(val, {
                a: 0,
                duration: 0.3,
                ease: 'none',
                onUpdate: () => {
                    mainSoundPath.current.setAttribute('d', morph(val.a))
                },
            })
        }
        // setSoundMute((prev) => !prev)
    }

    useLayoutEffect(() => {
        if (!soundMute) {
            mainSoundPath.current.setAttribute('d', soundOnRef.current.getAttribute('d'))
        } else {
            mainSoundPath.current.setAttribute('d', soundOffRef.current.getAttribute('d'))
        }
    }, [])

    return (
        <div
            className="menuContainer rightMenu"
            data-menu-noclose
            style={{ transform: `translateX(${openRight ? '0' : '100%'})` }}
            onClick={(e) => {
                if (e.currentTarget === e.target) setOpenRight(false)
            }}>
            <nav>
                <ul className="navItems">
                    <li className="navItem">
                        <a href="#">
                            <div className="menuIcon">
                                <svg width="31" height="30" viewBox="0 0 31 30" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.5 0C15.5 8.28427 8.78427 15 0.5 15C8.78427 15 15.5 21.7157 15.5 30C15.5 21.7157 22.2157 15 30.5 15C22.2157 15 15.5 8.28427 15.5 0Z"
                                    />
                                </svg>
                            </div>
                            <p>projects</p>
                        </a>
                    </li>
                    <li className="navItem">
                        <a href="#">
                            <div className="menuIcon">
                                <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0.5 0.4021C11.5457 0.4021 20.5 9.3564 20.5 20.4021C9.4543 20.4021 0.5 11.4478 0.5 0.4021Z"
                                    />
                                </svg>
                            </div>
                            <p>services</p>
                        </a>
                    </li>
                    <li className="navItem">
                        <a href="#">
                            <div className="menuIcon">
                                <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M20.5 0.701172C20.5 11.7469 11.5457 20.7012 0.5 20.7012C0.5 9.65548 9.4543 0.701177 20.5 0.701172Z"
                                    />
                                </svg>
                            </div>
                            <p>studio</p>
                        </a>
                    </li>
                    <li className="navItem">
                        <a href="#">
                            <div className="menuIcon">
                                <svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13 1C13 7.62742 7.62742 13 1 13C1 6.37259 6.37258 1.00001 13 1Z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M25 13C25 19.6274 19.6274 25 13 25C13 18.3726 18.3726 13 25 13Z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M13 1C19.6274 1 25 6.37258 25 13C18.3726 13 13 7.62742 13 1Z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M1 13C7.62742 13 13 18.3726 13 25C6.37258 25 1 19.6274 1 13Z"
                                    />
                                </svg>
                            </div>
                            <p>create project</p>
                        </a>
                    </li>
                </ul>
            </nav>
            <button className="rightMenuArrow" data-menu-noclose onClick={() => setOpenRight(false)}>
                <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L11 11L1 21" stroke="#FEFEFE" />
                </svg>
            </button>
            <div className="menuConfig">
                <button className="menuLang menuFlex" data-menu-noclose onClick={handleLang}>
                    <div className="menuIcon menuIconBottom">
                        <div
                            className="jupiterIcon"
                            style={{
                                transform: `rotate(${lang === 'ru' ? '90deg' : '0'})`,
                            }}>
                            <svg
                                // style={{ transform: `rotate(${lang === 'ru' ? '90deg' : '0'})` }}
                                // transform={`rotate(${lang === 'ru' ? '90' : '0'})`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18.9998 0.0245659C19.331 0.0082528 19.6644 0 19.9998 0C19.9998 0.335326 19.9915 0.668724 19.9752 1C19.8918 2.69373 19.5977 4.33206 19.1185 5.88932C19.6847 7.1432 19.9998 8.53474 19.9998 9.99988C19.9998 15.5227 15.5227 19.9998 9.99988 19.9998C8.53474 19.9998 7.1432 19.6847 5.88932 19.1185C4.33206 19.5977 2.69373 19.8918 1 19.9752C0.668724 19.9915 0.335326 19.9998 0 19.9998C0 19.6644 0.0082525 19.331 0.0245655 18.9998C0.107969 17.306 0.402071 15.6677 0.881209 14.1104C0.315092 12.8566 0 11.465 0 9.99988C0 4.4771 4.4771 0 9.99988 0C11.465 0 12.8566 0.315093 14.1104 0.88121C15.6677 0.402072 17.306 0.10797 18.9998 0.0245659ZM1.56657 15.3759C1.27646 16.5362 1.09302 17.7387 1.02729 18.9725C2.26105 18.9067 3.46357 18.7233 4.62383 18.4332C3.39602 17.6489 2.3509 16.6037 1.56657 15.3759ZM18.4332 4.62383C17.6489 3.39602 16.6037 2.35091 15.3759 1.56657C16.5362 1.27646 17.7387 1.09302 18.9725 1.02729C18.9067 2.26105 18.7233 3.46357 18.4332 4.62383Z"
                                    fill="#FEFEFE"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M19.1219 5.87357C16.4458 14.5108 9.21623 18.2025 5.87875 19.1216L4.61328 18.4285L5.61327 18.1575C8.74446 17.2952 15.6241 13.7839 18.1667 5.57762L18.4295 4.6123L19.1219 5.87357Z"
                                    fill="#030303"
                                />
                            </svg>
                        </div>
                    </div>
                    <p>
                        <span style={{ opacity: lang !== 'en' && 0.5 }}>en</span> /{' '}
                        <span style={{ opacity: lang !== 'ru' && 0.5 }}>ru</span>
                    </p>
                </button>
                <button className="menuSound menuFlex" data-menu-noclose onClick={handleMute}>
                    <div className="menuIcon menuIconBottom">
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                ref={mainSoundPath}
                                // d="M22 11C22 12.0256 21.2623 12.7948 20.6115 13.4735C20.241 13.8598 19.8579 14.2592 19.7132 14.6092C19.5801 14.9307 19.5721 15.4633 19.5643 15.9782C19.5498 16.9367 19.5334 18.023 18.7782 18.7782C18.0229 19.5334 16.9366 19.5498 15.9782 19.5643C15.4632 19.5721 14.9306 19.5801 14.6091 19.7132C14.2592 19.8579 13.8597 20.241 13.4735 20.6115C12.7948 21.2623 12.0256 22 11 22C9.97436 22 9.20519 21.2623 8.52652 20.6115C8.14023 20.241 7.7408 19.8579 7.39082 19.7132C7.06937 19.5801 6.53681 19.5721 6.02176 19.5643C5.06331 19.5498 3.97701 19.5334 3.22179 18.7782C2.46658 18.023 2.45018 16.9367 2.43569 15.9782C2.42793 15.4633 2.41987 14.9307 2.28684 14.6092C2.14211 14.2592 1.75904 13.8598 1.38852 13.4735C0.737662 12.7948 0 12.0256 0 11C0 9.97441 0.737662 9.20519 1.38852 8.52652C1.75903 8.14018 2.14211 7.7408 2.28684 7.39082C2.41987 7.06932 2.42793 6.53672 2.43569 6.02176C2.45018 5.06331 2.46658 3.97701 3.22184 3.22179C3.97705 2.46658 5.06336 2.45018 6.02176 2.43569C6.53681 2.42793 7.06942 2.41987 7.39091 2.28684C7.7408 2.14211 8.14028 1.75904 8.52652 1.38852C9.20519 0.737662 9.97441 0 11 0C12.0256 0 12.7948 0.737662 13.4735 1.38852C13.8598 1.75903 14.2592 2.14211 14.6092 2.28684C14.9306 2.41987 15.4632 2.42793 15.9782 2.43569C16.9367 2.45018 18.023 2.46658 18.7782 3.22179C19.5334 3.97701 19.5498 5.06331 19.5643 6.02176C19.5721 6.53672 19.5801 7.06932 19.7132 7.39082C19.8579 7.7408 20.241 8.14018 20.6115 8.52652C21.2623 9.20519 22 9.97441 22 11Z"
                                fill="#FEFEFE"
                            />
                            <path
                                ref={soundOnRef}
                                d="M22 11C22 12.0256 21.2623 12.7948 20.6115 13.4735C20.241 13.8598 19.8579 14.2592 19.7132 14.6092C19.5801 14.9307 19.5721 15.4633 19.5643 15.9782C19.5498 16.9367 19.5334 18.023 18.7782 18.7782C18.0229 19.5334 16.9366 19.5498 15.9782 19.5643C15.4632 19.5721 14.9306 19.5801 14.6091 19.7132C14.2592 19.8579 13.8597 20.241 13.4735 20.6115C12.7948 21.2623 12.0256 22 11 22C9.97436 22 9.20519 21.2623 8.52652 20.6115C8.14023 20.241 7.7408 19.8579 7.39082 19.7132C7.06937 19.5801 6.53681 19.5721 6.02176 19.5643C5.06331 19.5498 3.97701 19.5334 3.22179 18.7782C2.46658 18.023 2.45018 16.9367 2.43569 15.9782C2.42793 15.4633 2.41987 14.9307 2.28684 14.6092C2.14211 14.2592 1.75904 13.8598 1.38852 13.4735C0.737662 12.7948 0 12.0256 0 11C0 9.97441 0.737662 9.20519 1.38852 8.52652C1.75903 8.14018 2.14211 7.7408 2.28684 7.39082C2.41987 7.06932 2.42793 6.53672 2.43569 6.02176C2.45018 5.06331 2.46658 3.97701 3.22184 3.22179C3.97705 2.46658 5.06336 2.45018 6.02176 2.43569C6.53681 2.42793 7.06942 2.41987 7.39091 2.28684C7.7408 2.14211 8.14028 1.75904 8.52652 1.38852C9.20519 0.737662 9.97441 0 11 0C12.0256 0 12.7948 0.737662 13.4735 1.38852C13.8598 1.75903 14.2592 2.14211 14.6092 2.28684C14.9306 2.41987 15.4632 2.42793 15.9782 2.43569C16.9367 2.45018 18.023 2.46658 18.7782 3.22179C19.5334 3.97701 19.5498 5.06331 19.5643 6.02176C19.5721 6.53672 19.5801 7.06932 19.7132 7.39082C19.8579 7.7408 20.241 8.14018 20.6115 8.52652C21.2623 9.20519 22 9.97441 22 11Z"
                                fill="#FEFEFE"
                                style={{ display: 'none' }}
                            />
                            <path
                                ref={soundOffRef}
                                d="M3 3H5H7H9H11H13H15H17H19V5V7V9V11V13V15V17V19H17H15H13H11H9H7H5H3V17V15V13V11V9V7V5V3Z"
                                fill="#FEFEFE"
                                style={{ display: 'none' }}
                            />
                        </svg>
                    </div>
                    <p>sound: {soundMute ? 'off' : 'on'}</p>
                </button>
            </div>
        </div>
    )
}

export default RightMenu
