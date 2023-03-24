const fragmentShader = /* glsl */ `
uniform sampler2D uTexture;
uniform vec2 winResolution;
uniform bool flatShading;
uniform int uRefractStage;

varying vec3 vViewPosition;
varying vec3 worldNormal;
varying vec3 eyeVector;
varying vec3 fresnelEyeVector;

const int LOOP = 16;

vec3 sat(vec3 rgb, float adjustment) {
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(rgb, W));
    return mix(intensity, rgb, adjustment);
}

vec3 Fresnel(vec3 viewDirection, vec3 worldNormal, vec3 baseColor) {
    float fresnelPower = 5.4;
    float fresnelFactor = abs(dot(viewDirection, worldNormal));
    float inversefresnelFactor = 1.0 - fresnelFactor;

    fresnelFactor = pow(fresnelFactor, fresnelPower);
    inversefresnelFactor = pow(inversefresnelFactor, fresnelPower);
    vec3 fresnelColor = vec3(0.78, 0.85, 0.98);

	return fresnelFactor * baseColor + inversefresnelFactor * fresnelColor;
}

void main() {
    float iorRatio = 1.0/1.1;
    float iorRatioRed = 1.0/1.275;
    float iorRatioGreen = 1.0/1.23;
    float iorRatioBlue = 1.0/1.276;

    float chromaticAberration = 0.5;
    float refractPower = 1.0;
    float saturation = 0.88;

    float iorBooster = 1.0;
    int addToLoop = 8;

    vec3 fBaseColor = vec3(0.005, 0.005, 0.005);

    if (uRefractStage == 1) {
        iorRatioRed = 1.0/1.266;
        iorRatioGreen = 1.0/1.23;
        iorRatioBlue = 1.0/1.265;

        iorRatioRed *= iorBooster;
        iorRatioGreen *= iorBooster;
        iorRatioBlue *= iorBooster;

        chromaticAberration = 0.4;
        refractPower = 0.5;
        saturation = 1.0;
        addToLoop = 2;
        fBaseColor = vec3(0.0, 0.0, 0.0);
    }

    vec2 uv = gl_FragCoord.xy / winResolution.xy;

//    FLAT SAHADING:
    vec3 normal;
    if (flatShading) {
        normal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));
    } else {
        normal = worldNormal;
    }

    vec3 refractVecR = refract(eyeVector, normal, iorRatioRed);
    vec3 refractVecG = refract(eyeVector, normal, iorRatioGreen);
    vec3 refractVecB = refract(eyeVector, normal, iorRatioBlue);
    // uv += refractVecR.xy * 0.1;

    //    COLOR ABERRATION:
    vec3 color = vec3(1.0);
    for ( int i = 0; i < LOOP + addToLoop; i ++ ) {
        float slide = float(i) / float(LOOP) * 0.6;

        color.r += texture2D(uTexture, uv + refractVecR.xy * (refractPower + slide * 1.0) * chromaticAberration).r;
        color.g += texture2D(uTexture, uv + refractVecG.xy * (refractPower + slide * 2.0) * chromaticAberration).g;
        color.b += texture2D(uTexture, uv + refractVecB.xy * (refractPower + slide * 3.0) * chromaticAberration).b;

        color = sat(color, saturation);
    }

    // vec3 refracted = refract(eyeVector, normal, iorRatio);
    // uv += refracted.xy;
    // vec3 texture = texture2D(uTexture, uv + refracted.xy).rgb;
    // vec3 color = texture;

    // if (color.r == color.g && color.g == color.b) {
    //     color.r = 0.14;
    //     color.g = 0.14;
    //     color.b = 0.14;
    // }

    color /= float(LOOP);
    color *= vec3(1.2);

    vec3 f = Fresnel(fresnelEyeVector, normal, fBaseColor);
    // color = mix(color, vec3(0.98, 0.98, 0.99), f);
    // color *= vec3(1.2);

    if (uRefractStage == 1) {
        color += f;
        // color *= vec3(1.0);
    }

    gl_FragColor = vec4(color, 1.0);
}
`

export default fragmentShader
