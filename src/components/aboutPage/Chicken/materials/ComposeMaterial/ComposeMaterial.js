import * as THREE from 'three'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

class ComposeMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                tOriginal: {
                    value: null,
                },
                tFirst: {
                    value: null,
                },
                tBright: {
                    value: null,
                },
                tBlur: {
                    value: null,
                },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.NoBlending,
            // transparent: true,
            // depthTest: false,
            // depthWrite: false,
        })
    }
}

export default ComposeMaterial

function getFullscreenTriangle() {
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute([-1, -1, 3, -1, -1, 3], 2))
    geometry.setAttribute('uv', new Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2))

    return geometry
}
