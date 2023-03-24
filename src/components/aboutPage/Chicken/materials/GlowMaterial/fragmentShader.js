const fragmentShader = /* glsl */ `
uniform vec2 winResolution;
uniform float uTime;
varying float intensity;

float distCalc(vec2 p0, vec2 pf){
    return sqrt((pf.x-p0.x)*(pf.x-p0.x)+(pf.y-p0.y)*(pf.y-p0.y));
}

float rand(vec2 co) {
	float a = 12.9898;
    float b = 78.233;
    float c = 43758.5453;
    float dt = dot(co.xy, vec2(a,b));
    float sn = mod(dt, 3.14159);
    return fract((sin(sn) * c)+uTime*(2.1875999));
}

float getGlow(float dist, float radius, float intensity){
    return pow(radius/dist, intensity);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * winResolution.xy) / winResolution.y;
    float dist = length(uv);

    // float glow = getGlow(dist, 0.1, 1.3);

    // float alpha = dist;
    // if (dist < 0.38) {
    //     alpha = dist*0.5;
    // } else {
    //     alpha = 1.0 / dist;
    //     alpha *= 0.09;
    //     alpha = pow(alpha, 2.0);
    // }

    vec3 col = vec3(0.1, 0.4, 1.0);
    vec3 glow = col * intensity;

    //White core
    // col += 10.0*vec3(smoothstep(0.006, 0.003, dist));
    //Blue glow
    col += glow * vec3(0.1,0.4,1.0);

    //Tone mapping
    col = 1.0 - exp(-col);

    //Gamma
    // col = pow(col, vec3(0.4545));

    gl_FragColor = vec4(col, intensity);
}
`

export default fragmentShader
