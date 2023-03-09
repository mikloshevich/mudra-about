export function degToRad(deg) {
    return deg * (Math.PI / 180)
}

export function lerp(start, end, t) {
    return start * (1 - t) + end * t
}
