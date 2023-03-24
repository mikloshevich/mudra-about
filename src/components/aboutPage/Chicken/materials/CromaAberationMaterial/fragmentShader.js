const fragmentShader = /* glsl */ `
uniform sampler2D tChromAber;

varying vec2 vUv;

vec3 sat(vec3 rgb, float adjustment) {
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(rgb, W));
    return mix(intensity, rgb, adjustment);
}

void main() {
    float uRedOffset = 0.0;
    float uGreenOffset = 4.0;
    float uRedOffset = 0.0;
    float uIntensity = 1.5;

    float ro = 0.001 * uRedOffset * uIntensity;
    float go = 0.001 * uGreenOffset * uIntensity;
    float bo = 0.001 * uBlueOffset * uIntensity;
    float r = texture(tChromAber, vUv * (1.0 + ro) - (ro / 2.0)).r;
    float g = texture(tChromAber, vUv * (1.0 + go) - (go / 2.0)).g;
    float b = texture(tChromAber, vUv * (1.0 + bo) - (bo / 2.0)).b;
    float a = texture(tChromAber, vUv).a;
    gl_FragColor = vec4(r, g, b, 1.0);
}
`

export default fragmentShader
