const fragmentShader = /* glsl */ `
uniform sampler2D uBrightTex;
uniform vec2 winResolution;
uniform float uTime;

varying vec2 vUv;

vec3 sat(vec3 rgb, float adjustment) {
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    vec3 intensity = vec3(dot(rgb, W));
    return mix(intensity, rgb, adjustment);
}

void main() {
    float uThreshold = 0.75;
    float uSmoothing = 0.5;

    vec4 texel = texture(uBrightTex, vUv);
    // texel.rgb += vec3(0.6);
    texel.rgb *= vec3(1.8);
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float v = dot(texel.xyz, luma);
    float alpha = smoothstep(uThreshold, uThreshold + uSmoothing, v);
    gl_FragColor = mix(vec4(0), texel, alpha);

    // vec2 uv = gl_FragCoord.xy / winResolution.xy;
    // vec4 color = texture2D(uBrightTex, uv);
    // color.rgb *= vec3(1.1);
    // // color = vec4(sat(color.rgb, 1.5), 1.0) * vec4(1.0);
    // float brightness = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
    // vec4 brightColor = color;
    // if(brightness > 0.7) {
    //     brightColor = vec4(color);
    //     brightColor.rgb *= vec3(1.8);
    //     brightColor = vec4(sat(brightColor.rgb, 1.5), 1.0);
    // } else {
    //     brightColor = vec4(0.0, 0.0, 0.0, 0.0);
    // }

    // // brightColor.rgb *= vec3(1.5);
    // // brightColor = vec4(sat(brightColor.rgb, 1.5), brightColor.a);

	// gl_FragColor = brightColor;
	// // gl_FragColor = vec4(vec3(1.0), 1.0);
}
`
export default fragmentShader
