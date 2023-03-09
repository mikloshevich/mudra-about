import { useCallback, useEffect, useState } from 'react'

export function useLocalStorage(key, initValue) {
    return useStorage(key, initValue, window.localStorage)
}

export function useSessionStorage(key, initValue) {
    return useStorage(key, initValue, window.sessionStorage)
}

/**
 *
 * @param {string} key
 * @param {any} initValue
 * @param {Storage} storageType
 */

function useStorage(key, initValue, storageType) {
    const getValue = useCallback(() => {
        try {
            if (!key) {
                throw new Error('Please Povide Key as first parameter')
            }
            if (typeof window === 'undefined') {
                return initialValue
            }
            const item = storageType.getItem(key)
            return item ? JSON.parse(item) : initValue
        } catch (err) {
            console.warn(`ERROR__GET. KEY: "${key}".`, err)
            return initValue
        }
    }, [key, initValue])

    const [storeValue, setStoreValue] = useState(getValue)

    const setNewValue = useCallback(
        (value) => {
            try {
                const newValue = value instanceof Function ? value(storeValue) : value
                storageType.setItem(key, JSON.stringify(newValue))
                setStoreValue(newValue)
            } catch (err) {
                console.warn(`ERROR__SET. KEY: "${key}".`, err)
            }
        },
        [key]
    )

    useEffect(() => {
        setNewValue(() => getValue())
    }, [])

    const remove = useCallback(() => {
        try {
            storageType.removeItem(key)
            setStoreValue(undefined)
        } catch (err) {
            console.warn(`ERROR__DELETE. KEY: "${key}".`, err)
        }
    }, [key])

    return [storeValue, setNewValue, remove]
}
