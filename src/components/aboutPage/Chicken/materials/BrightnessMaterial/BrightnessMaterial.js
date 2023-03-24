import * as THREE from 'three'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

class BrightnessMaterial extends THREE.ShaderMaterial {
    constructor(uniforms) {
        super({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            // transparent: true,
            // blending: THREE.NoBlending,
            // blending: THREE.AdditiveBlending,
            blending: THREE.NoBlending,
        })
    }
}

export default BrightnessMaterial
