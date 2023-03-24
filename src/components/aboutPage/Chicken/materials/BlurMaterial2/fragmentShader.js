const fragmentShader = /* glsl */ `
uniform vec2 winResolution;
// uniform float uBluriness;
uniform vec2 uDirection;
uniform sampler2D tBlur;

varying vec2 vUv;

vec4 blur(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
    vec4 sum = vec4(0.0);

    vec2 texcoord = 1.0 / resolution;

    sum += texture2D(image, uv - 4.0 * texcoord * direction) * 0.051;
    sum += texture2D(image, uv - 3.0 * texcoord * direction) * 0.0918;
    sum += texture2D(image, uv - 2.0 * texcoord * direction) * 0.12245;
    sum += texture2D(image, uv - 1.0 * texcoord * direction) * 0.1531;
    sum += texture2D(image, uv) * 0.1633;
    sum += texture2D(image, uv + 1.0 * texcoord * direction) * 0.1531;
    sum += texture2D(image, uv + 2.0 * texcoord * direction) * 0.12245;
    sum += texture2D(image, uv + 3.0 * texcoord * direction) * 0.0918;
    sum += texture2D(image, uv + 4.0 * texcoord * direction) * 0.051;

    return sum;
}

void main() {
    float uBluriness = 3.5;
    vec4 color = blur(tBlur, vUv, winResolution, uBluriness * uDirection);
    gl_FragColor = color;
}
`

export default fragmentShader

// float gaussianPdf(float x, float sigma) {
//     return 0.39894 * exp(-0.5 * x * x / (sigma * sigma)) / sigma;
// }
// vec4 blur(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
//     vec2 invSize = 1.0 / resolution;
//     float fSigma = float(SIGMA);
//     float weightSum = gaussianPdf(0.0, fSigma);
//     vec3 diffuseSum = texture(image, uv).rgb * weightSum;
//     for (int i = 1; i < KERNEL_RADIUS; i++) {
//         float x = float(i);
//         float w = gaussianPdf(x, fSigma);
//         vec2 uvOffset = direction * invSize * x;
//         vec3 sample1 = texture(image, uv + uvOffset).rgb;
//         vec3 sample2 = texture(image, uv - uvOffset).rgb;
//         diffuseSum += (sample1 + sample2) * w;
//         weightSum += 2.0 * w;
//     }
//     return vec4(diffuseSum / weightSum, 1.0);
// }

// precision highp float;

// uniform sampler2D tMap;
// uniform float uBluriness;
// uniform vec2 uDirection;
// uniform vec2 uResolution;

// in vec2 vUv;

// out vec4 FragColor;

// vec4 blur(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
//     vec4 sum = vec4(0.0);
//     vec2 pixel = 1.0 / resolution;
//     sum += texture(image, uv - 4.0 * pixel * direction) * 0.051;
//     sum += texture(image, uv - 3.0 * pixel * direction) * 0.0918;
//     sum += texture(image, uv - 2.0 * pixel * direction) * 0.12245;
//     sum += texture(image, uv - 1.0 * pixel * direction) * 0.1531;
//     sum += texture(image, uv) * 0.1633;
//     sum += texture(image, uv + 1.0 * pixel * direction) * 0.1531;
//     sum += texture(image, uv + 2.0 * pixel * direction) * 0.12245;
//     sum += texture(image, uv + 3.0 * pixel * direction) * 0.0918;
//     sum += texture(image, uv + 4.0 * pixel * direction) * 0.051;
//     return sum;
// }

// void main() {
//     FragColor = blur(tMap, vUv, uResolution, uBluriness * uDirection);
// }
