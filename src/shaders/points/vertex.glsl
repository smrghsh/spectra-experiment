attribute vec3 coordinates;

void main() {
    gl_Position = vec4(coordinates, 1.0);
    gl_PointSize = 0.5;
}