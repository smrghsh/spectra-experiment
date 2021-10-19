varying vec3 vPosition;

float sq(float x) {
    return x*x;
}

float drawCircle(float x, float y, float r, float x1, float y1) {
    float distX = abs(x - x1);
    float distY = abs(y - y1);
    float dist = sqrt(sq(distX) + sq(distY));
    float distRadius = max(r-dist, 0.0);
    float val = 1.0 - exp(-1.0 * distRadius);
    return val;
}

float drawCircleOutline(float x, float y, float r, float x1, float y1, float blur) {
    float distX = abs(x - x1);
    float distY = abs(y - y1);
    float dist = sqrt(sq(distX) + sq(distY));
    float distRadius = abs(r-dist);
    float val = exp(-1.0 * pow(distRadius, 1.0/blur));
    return val;
}

vec3 color1 = vec3(0.035, 0.659, 0.224); //green
vec3 color2 = vec3(0.016, 0.945, 0.643); //teal
vec3 color3 = vec3(0.059, 0.282, 0.267); //forest
vec3 color4 = vec3(0.031, 0.898, 0.196); //lime
vec3 color5 = vec3(0.027, 0.145, 0.698); //blue

void main() {
    //define objects
    float circleRadius = 5.0;
    float c1 = drawCircle(-10.0, 0.0, circleRadius + circleRadius, vPosition.x, vPosition.y);
    float c2 = drawCircle(-5.0, 0.0, circleRadius, vPosition.x, vPosition.y);
    float c3 = drawCircle(0.0, 0.0, circleRadius + circleRadius, vPosition.x, vPosition.y);
    float c4 = drawCircle(5.0, 0.0, circleRadius, vPosition.x, vPosition.y);
    float c5 = drawCircle(10.0, 0.0, circleRadius + circleRadius, vPosition.x, vPosition.y);

    float co1 = drawCircleOutline(0.0, 0.0, 20.0, vPosition.x, vPosition.y, 2.0);
    //define colors (in order) - can do += to overlap colors
    vec3 color = c1*color5 + c2*color4 + c3*color5 + c4*color4 + c5*color5;

    gl_FragColor = vec4(color, 1.0);
}