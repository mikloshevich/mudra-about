import { useRef, useState } from 'react'
import LeftMenu from './LeftMenu'
import useClickOutside from '../../hooks/useClickOutside'
import RightMenu from './RightMenu'

const Header = () => {
    const [openLeft, setOpenLeft] = useState(false)
    const [openRight, setOpenRight] = useState(false)
    const menuLeftBtn = useRef()
    const menuRightBtn = useRef()

    useClickOutside(menuLeftBtn, (e) => {
        if (openLeft && !e.target.hasAttribute('data-menu-noclose')) {
            setOpenLeft(false)
        }
    })
    useClickOutside(menuRightBtn, (e) => {
        if (openRight && !e.target.hasAttribute('data-menu-noclose')) {
            setOpenRight(false)
        }
    })
    return (
        <>
            <button
                ref={menuLeftBtn}
                className="mainHeaderLogoLeft mainHeaderLogo"
                data-menu-noclose
                onClick={() => setOpenLeft(true)}
                // style={{ zIndex: openLeft ? '100' : '110' }}
            >
                <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.0037 13.1463L11.0037 10.1531C11.0037 7.77211 9.84726 6.32653 7.9425 6.32653C6.13977 6.32653 4.89828 7.85714 4.89828 10.085C4.89828 12.466 6.07175 13.9456 7.90848 14.0476L7.90848 20C3.12957 19.7619 0.000318704 15.9524 0.000318956 10.1871C0.000319223 4.08163 2.90848 -9.99117e-07 7.41529 -8.02119e-07C10.7826 -6.54927e-07 12.9595 2.36394 13.2996 6.0034L13.4357 6.0034C13.9629 3.0102 16.1228 0.901361 19.099 0.901361C23.1466 0.901361 25.7656 4.4898 25.7656 9.94898C25.7656 15.6463 22.6534 19.4388 17.9255 19.5238L17.9255 13.8776C19.8303 13.8095 21.1228 12.3639 21.1228 10.2211C21.1228 7.97619 20.0173 6.68367 18.2486 6.68367C16.4799 6.68367 15.3064 8.06122 15.3064 10.1701L15.3064 13.1463L11.0037 13.1463Z"
                        fill="#FEFEFE"
                    />
                </svg>
            </button>
            <button
                ref={menuRightBtn}
                className="mainHeaderLogoRight mainHeaderLogo"
                data-menu-noclose
                onClick={() => setOpenRight(true)}
                // style={{ zIndex: openRight ? '100' : '110' }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12Z"
                        fill="#FEFEFE"
                    />
                </svg>
            </button>
            <header className="mainHeader">
                <div className="menuWrapper">
                    <LeftMenu setOpenLeft={setOpenLeft} openLeft={openLeft} />
                    <RightMenu setOpenRight={setOpenRight} openRight={openRight} />
                </div>
            </header>
        </>
    )
}

export default Header
