const fragmentShader = /* glsl */ `
uniform vec2 winResolution;
uniform sampler2D uBlurTex;
uniform mat3 uKernel;
uniform bool horizontal;
uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;

const float weight[5] = float[] (0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);

vec4 blur(sampler2D image, vec2 uv, vec2 resolution) {
    float Pi = 6.28318530718; // Pi*2
    float directions = 10.0;
    float quality = 8.0;
    float size = 18.0;
    vec2 radius = size/resolution.xy;
    vec4 color = texture2D(image, uv);
    color.rgb *= vec3(2.0);

    for( float d= 0.0; d < Pi; d += Pi / directions) {
		for(float i = 1.0 / quality; i <= 1.0; i += 1.0 / quality) {
			color += texture2D( image, uv + vec2(cos(d), sin(d)) * radius * i);
        }
    }

    color /= quality * directions - 9.0;
    return color;
}

vec3 sat(vec3 rgb, float adjustment) {
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(rgb, W));
    return mix(intensity, rgb, adjustment);
}

void main() {
    ivec2 tex_offset = 1 / textureSize(uBlurTex, 0);
    vec2 texel = vec2(1.0, 1.0) / winResolution.xy;
    vec2 uv = gl_FragCoord.xy / winResolution.xy;

    // vec4 color = texture2D(uBlurTex, uv);

    // for (int i=0; i<=2; i++) {
    //     for (int j=0; j<=2; j++) {
    //         vec2 offset = uv + vec2(i-1, j-1)*texel;
    //         color += uKernel[i][j]*texture2D(uBlurTex, offset);
    //     }
    // }

    // if (horizontal) {
    //     for(int i = 1; i < 5; ++i) {
    //         color += texture2D(uBlurTex, uv + vec2(tex_offset.x * i, 0.0)).rgb * weight[i];
    //         color += texture2D(uBlurTex, uv - vec2(tex_offset.x * i, 0.0)).rgb * weight[i];
    //     }
    // } else {
    //     for(int i = 1; i < 5; ++i) {
    //         color += texture2D(uBlurTex, uv + vec2(0.0, tex_offset.y * i)).rgb * weight[i];
    //         color += texture2D(uBlurTex, uv - vec2(0.0, tex_offset.y * i)).rgb * weight[i];
    //     }
    // }

    vec4 color = blur(uBlurTex, uv, winResolution );
    // color = vec4(sat(color.rgb, 3.5), color.a) * vec4(1.2);
    // vec3 col = texture2D(uBlurTex, 0.5 * uv + vec2(0.2)).rgb;
    // vec3 col = texture2D(uBlurTex, 5.0 * vUv - vec2(2.0)).rgb;
    // float dist = length(col);
    // col +=  dist;
    // gl_FragColor = col;
    // color = mix(color, vec4(1.2), color.a);
    gl_FragColor = color * vec4(1.0);
    // gl_FragColor = color;
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
