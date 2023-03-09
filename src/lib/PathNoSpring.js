import { lerp } from '../utils/functions'

export class Path {
    constructor(d, { x, y, width, height, hide }) {
        this.d = d
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.pos = { x: 0, y: 0 }
        this.acc = { x: 0, y: 0 }
        this.vel = { x: 0, y: 0 }

        this.delta = { x: 0, y: 0 }
        this.dist = 0

        this.springForce = { x: 0, y: 0 }
        this.dampingForce = { x: 0, y: 0 }

        this.alpha = 1
        this.color = `hsla(0, 0%, 100%, ${this.alpha})`
        this.hide = hide
        this.moveRadius = -70
        this.maxDist = 70
    }

    draw(ctx) {
        const path1 = new Path2D(this.d)
        const path2 = new Path2D()
        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        path2.addPath(path1, new DOMMatrix(`translate(${this.pos.x}px, ${this.pos.y}px)`))
        ctx.fill(path2)
        ctx.stroke(path2)
    }

    update(ctx, mouse) {
        let deltaX = mouse.x - (this.x + this.width / 2)
        let deltaY = mouse.y - (this.y + this.height / 2)

        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        let forceX = deltaX / distance
        let forceY = deltaY / distance

        // const maxDist = 50
        // let force = Math.max(0, (maxDist - distance) / maxDist)
        // let dirX = forceX * force * -50
        // let dirY = forceY * force * -50

        // if (distance < 30) {
        //     ctx.shadowColor = `hsla(0, 0%, 0%, 0.3)`
        //     ctx.shadowBlur = 10
        // }

        // if (distance < 30 && this.pos.x !== 0 && this.pos.y !== 0) {
        //     ctx.shadowColor = `hsla(0, 0%, 0%, 0.2)`
        //     ctx.shadowBlur = 8
        // } else {
        //     ctx.shadowColor = `hsla(0, 0%, 0%, 0)`
        //     ctx.shadowBlur = 0
        // }

        if (distance < 60) {
            this.pos.x = forceX * -50 // lerp(this.pos.x, forceX * -50, 0.2) // forceX * -60
            this.pos.y = forceY * -50 // lerp(this.pos.y, forceY * -50, 0.2) // forceY * -60
            // if (this.hide) {
            //     this.alpha = 0
            //     this.color = `hsla(0, 0%, 100%, ${this.alpha})`
            // }
        } else {
            if (this.pos.x !== 0) {
                this.pos.x = 0 // lerp(this.pos.x, 0, 0.2)
            }
            if (this.pos.y !== 0) {
                this.pos.y = 0 // lerp(this.pos.y, 0, 0.2)
            }

            // if (Math.abs(this.pos.x) <= 0.5 && Math.abs(this.pos.y) <= 0.5) {
            //     this.pos.x = 0
            //     this.pos.y = 0
            // }

            if (this.hide && this.pos.x === 0 && this.pos.y === 0) {
                this.alpha = lerp(this.alpha, 1, 0.7)
                this.color = `hsla(0, 0%, 100%, ${this.alpha})`
            }
        }
    }

    createSpringPosition(ctx, mouse, delta, { stiffness = 60, mass = 1.8, damping = 20 } = {}) {
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

        const dt = Math.max(Math.min(delta, 40), 1) / 1000
        let springForce, dampingForce, acc
        let targetPos = { x: 0, y: 0 }

        let deltaX = mouse.x - (this.x + this.width / 2)
        let deltaY = mouse.y - (this.y + this.height / 2)
        let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        let forceX = deltaX / distance
        let forceY = deltaY / distance

        if (Math.abs(this.pos.x) <= 0.5 && Math.abs(this.pos.y) <= 0.5) {
            if (this.hide) {
                this.alpha = lerp(this.alpha, 1, 0.25)
                this.color = `hsla(0, 0%, 100%, ${this.alpha})`
            }
            // ctx.shadowColor = `hsla(0, 0%, 0%, 0)`
            // ctx.shadowBlur = 0
        }

        if (distance < this.maxDist) {
            targetPos = { x: forceX * this.moveRadius, y: forceY * this.moveRadius }
            if (this.hide) {
                this.alpha = 0
                this.color = `hsla(0, 0%, 100%, ${this.alpha})`
            }
        }
        springForce = { x: k * (this.pos.x - targetPos.x), y: k * (this.pos.y - targetPos.y) }
        dampingForce = { x: d * this.vel.x, y: d * this.vel.y }

        acc = { x: (springForce.x + dampingForce.x) / mass, y: (springForce.y + dampingForce.y) / mass }
        this.vel.x += acc.x * dt
        this.vel.y += acc.y * dt
        this.pos.x += this.vel.x * dt
        this.pos.y += this.vel.y * dt

        // if (distance < 30 && Math.abs(this.pos.x) >= 0.5 && Math.abs(this.pos.y) >= 0.5) {
        //     ctx.shadowColor = `hsla(0, 0%, 0%, 0.1)`
        //     ctx.shadowBlur = 3
        // }
    }
}
