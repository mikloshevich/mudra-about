import { createContext, useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useStorage'

const defaultVal = {
    soundMute: window.localStorage.getItem('soundMute') || false,
    setSoundMute: () => {},
}

export const MenuContext = createContext({
    defaultVal,
})

const MenuContextProvider = (props) => {
    const [local, setLocal, removeLocal] = useLocalStorage('soundMute', defaultVal.soundMute)
    const [soundMute, setSoundMute] = useState(local)
    useEffect(() => {
        setLocal(soundMute)
    }, [soundMute])

    return <MenuContext.Provider value={{ soundMute, setSoundMute }}>{props.children}</MenuContext.Provider>
}

export default MenuContextProvider
