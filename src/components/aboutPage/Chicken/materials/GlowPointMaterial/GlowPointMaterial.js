import * as THREE from 'three'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

class GlowPointMaterial extends THREE.ShaderMaterial {
    constructor(uniforms) {
        super({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            // blending: THREE.AdditiveBlending,
        })
    }
}

export default GlowPointMaterial
