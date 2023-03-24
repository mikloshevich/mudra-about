const fragmentShader = /* glsl */ `
uniform sampler2D tOriginal;
uniform sampler2D tFirst;
uniform sampler2D tBright;
uniform sampler2D tBlur;
// uniform vec2 winResolution;
// uniform float uTime;

varying vec2 vUv;

vec3 sat(vec3 rgb, float adjustment) {
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(rgb, W));
    return mix(intensity, rgb, adjustment);
}

void main() {
    float uMinBright = 0.1;
    float uBlurBright = 2.2;

    vec4 originalTexture = texture2D(tOriginal, vUv);
    vec4 firstTexture = texture2D(tFirst, vUv);
    vec4 brightTexture = texture2D(tBright, vUv);
    vec4 blurTexture = texture2D(tBlur, vUv);
    // firstTexture.rgb -= vec3(0.1);
    // brightTexture.rgb *= vec3(1.8);

    vec3 bloom = blurTexture.rgb;
    bloom.x = max(0.0, bloom.x - uMinBright);
    bloom.y = max(0.0, bloom.y - uMinBright);
    bloom.z = max(0.0, bloom.z - uMinBright);
    bloom *= uBlurBright;
    blurTexture = vec4(bloom, blurTexture.a);

    // originalTexture + blurTexture + firstTexture + brightTexture;
    vec4 color = originalTexture + blurTexture + firstTexture + brightTexture;

	gl_FragColor = color;
}
`

export default fragmentShader
