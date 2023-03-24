const fragmentShader = /* glsl */ `
uniform vec2 winResolution;
uniform float uTime;

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

void main() {
    // vec2 Position = vec2(0.0,0.0);
    // float Radius = 0.005;

    // float aa = 2.0 / winResolution.y;
    // float width = 0.8 + aa;

	// vec2 uv = (gl_FragCoord.xy - 0.5 * winResolution.xy) / winResolution.y;

    // float dist = length(uv);
    // dist = pow(dist, 2.0);

    // float colorVal = 1.0 - length(uv / width * 2.0) + (Radius * 2.0 / width);

    // vec3 col = vec3(colorVal);
    // col = col * vec3(0.7, 0.7, 0.9);

    // vec2 position = ( gl_FragCoord.xy / winResolution.xy );
    // vec2 pos = vec2(position.x, position.y);
    // vec3 noise = vec3(rand(pos), rand(pos + 1.0), rand(pos + 2.0));

    // float alpha = 1.0;
    // if (dist < 0.1) {
    //     alpha = dist;
    // } else {
    //     alpha = colorVal;
    // }

	// // gl_FragColor = vec4(col, colorVal * 0.5);
	// gl_FragColor = vec4(noise, colorVal);

    vec3 col = vec3(0.0);
    vec2 uv = (gl_FragCoord.xy - 0.5 * winResolution.xy) / winResolution.y;

    vec2 position = ( gl_FragCoord.xy / winResolution.xy );
    vec2 pos = vec2(position.x, position.y);
    vec3 noise = vec3(rand(pos), rand(pos + 1.0), rand(pos + 2.0));

    float dist = length(uv);
    // float distToCenter = distance(uv, vec2(0.5)) * 1.0;
    float distToCenter = distance(winResolution.xy * 0.5, gl_FragCoord.xy);
    // float d = distCalc(winResolution.xy * 0.5, gl_FragCoord.xy) * 0.01;
    float d = distCalc(winResolution.xy*0.5,gl_FragCoord.xy)*(sin(1.0)+1.5)*0.0005;

    col += 1.0 / dist;

    // dist = 0.2 / dist;
    // dist *= 0.5;
    // dist = pow(dist, 2.5);

    float alpha = 1.0;
    if (dist < 0.25) {
        alpha = pow(dist, 2.5);
    } else {
        alpha = dist;
        alpha = 0.2 / alpha;
        alpha *= 0.5;
        alpha = pow(alpha, 3.5);
    }

	gl_FragColor = vec4(col, alpha);
	// gl_FragColor = mix(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0 ), d);
    // gl_FragColor.a = 0.005 / d;
    gl_FragColor.a *= 0.8;
}
`

export default fragmentShader
