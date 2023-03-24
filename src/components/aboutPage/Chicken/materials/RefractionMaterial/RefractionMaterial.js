import * as THREE from 'three'
import vertexShader from './vertexShader'
import fragmentShader from './fragmentShader'

class RefractionMaterial extends THREE.ShaderMaterial {
    constructor(uniforms) {
        super({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            blending: THREE.NoBlending,
            // blending: THREE.AdditiveBlending,
            // transparent: true,
            // side: THREE.DoubleSide,
        })
    }
}

export default RefractionMaterial
