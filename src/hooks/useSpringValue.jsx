import { useRef, useState } from 'react'
import useRafCallback from './useRafCallback'

export default function useSpringValue(targetValue, { stiffness = 130, mass = 1.5, damping = 10 } = {}) {
    const [springValue, setSpringValue] = useState(0)
    const pos = useRef(0)
    const vel = useRef(0)

    useRafCallback(({ delta }) => {
        const dt = Math.max(Math.min(delta, 40), 1) / 1000

        /**
         * F - Force
         * a - acceleration
         * k - Stiffnes
         * m - Mass
         * t - time interval (1/60 = 0.01666)
         *
         * F = -k*x
         * F = m*a
         *
         * m*a = -k*x
         * a = -k *x / m - Acceleration
         *
         * vel2 = vel1 + a*t - Velocity
         * pos2 =  pos1 + v*t - Position
         */

        // Stiffnes
        let k = -stiffness
        // Damping
        let d = -damping

        const springForce = k * (pos.current - targetValue)
        const dampingForce = d * vel.current
        const acc = (springForce + dampingForce) / mass

        vel.current += acc * dt
        pos.current += vel.current * dt

        setSpringValue(pos.current)
    })

    return springValue
}
