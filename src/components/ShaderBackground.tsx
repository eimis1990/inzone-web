"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform float u_time;

  // Create diagonal lines pattern
  float diagonalLines(vec2 uv, float time) {
    // Rotate UV for diagonal direction (top-right to bottom-left)
    float angle = 0.785398; // 45 degrees
    vec2 rotatedUV;
    rotatedUV.x = uv.x * cos(angle) - uv.y * sin(angle);
    rotatedUV.y = uv.x * sin(angle) + uv.y * cos(angle);

    // Create moving lines
    float lineSpacing = 0.035;
    float linePos = rotatedUV.x + time * 0.015;
    float line = fract(linePos / lineSpacing);

    // Sharp thin lines
    float lineWidth = 0.015;
    float lineMask = smoothstep(0.0, lineWidth, line) * smoothstep(lineWidth * 2.0, lineWidth, line);

    return lineMask;
  }

  // Glow function for a single point
  float getGlow(vec2 uv, vec2 center, float radius) {
    float dist = length(uv - center);
    float falloff = smoothstep(radius, 0.0, dist);
    return pow(falloff, 2.5);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 uvAspect = vec2(uv.x * aspect, uv.y);

    float time = u_time;

    // Base dark color
    vec3 baseColor = vec3(0.02, 0.02, 0.025);

    // Diagonal lines
    float lines = diagonalLines(uvAspect, time);
    float baseLineStrength = 0.08;

    // Fixed glow positions (exactly at corners)
    vec2 topLeft = vec2(0.0, 1.0);                // Top-left corner
    vec2 bottomRight = vec2(aspect, 0.0);         // Bottom-right corner

    float glowRadius = 0.9;

    // Get glow intensities for each corner
    float glowTL = getGlow(uvAspect, topLeft, glowRadius);
    float glowBR = getGlow(uvAspect, bottomRight, glowRadius);

    // Direction vectors for chromatic aberration
    vec2 dirTL = normalize(uvAspect - topLeft + 0.0001);
    vec2 dirBR = normalize(uvAspect - bottomRight + 0.0001);

    // Aberration strength
    float aberrationTL = glowTL * 0.12;
    float aberrationBR = glowBR * 0.12;

    // Sample lines with chromatic offset for top-left glow
    // Using violet/magenta colors (#6A4CF5 / #D44DF0)
    vec2 uvTL_R = uvAspect + dirTL * aberrationTL * 1.8;
    vec2 uvTL_B = uvAspect - dirTL * aberrationTL * 1.8;
    float linesTL_R = diagonalLines(uvTL_R, time);
    float linesTL_G = diagonalLines(uvAspect, time);
    float linesTL_B = diagonalLines(uvTL_B, time);

    // Sample lines with chromatic offset for bottom-right glow
    // Using blue/cyan colors (#0099FF)
    vec2 uvBR_R = uvAspect + dirBR * aberrationBR * 1.8;
    vec2 uvBR_B = uvAspect - dirBR * aberrationBR * 1.8;
    float linesBR_R = diagonalLines(uvBR_R, time);
    float linesBR_G = diagonalLines(uvAspect, time);
    float linesBR_B = diagonalLines(uvBR_B, time);

    // Base lines (visible gray)
    vec3 lineColor = vec3(lines * baseLineStrength);

    // Core glow for soft center light
    float coreTL = pow(getGlow(uvAspect, topLeft, glowRadius), 3.0);
    float coreBR = pow(getGlow(uvAspect, bottomRight, glowRadius), 3.0);

    // Accent color: #E4D947 (yellow) = rgb(228, 217, 71) = (0.894, 0.851, 0.278)
    vec3 accentYellow = vec3(0.894, 0.851, 0.278);

    // Top-left glow: Violet/Magenta core with yellow accent lines
    vec3 glowColorTL = vec3(0.0);
    // Lines in accent yellow - apply yellow color directly
    float lineIntensityTL = (linesTL_R + linesTL_G + linesTL_B) / 3.0;
    glowColorTL += accentYellow * lineIntensityTL * glowTL * 1.5;
    // Core glow in violet/magenta
    glowColorTL.r += coreTL * 0.55;
    glowColorTL.g += coreTL * 0.2;
    glowColorTL.b += coreTL * 0.65;

    // Bottom-right glow: Blue core with yellow accent lines
    vec3 glowColorBR = vec3(0.0);
    // Lines in accent yellow - apply yellow color directly
    float lineIntensityBR = (linesBR_R + linesBR_G + linesBR_B) / 3.0;
    glowColorBR += accentYellow * lineIntensityBR * glowBR * 1.5;
    // Core glow in blue
    glowColorBR.r += coreBR * 0.1;
    glowColorBR.g += coreBR * 0.45;
    glowColorBR.b += coreBR * 0.7;

    // Combine everything
    vec3 finalColor = baseColor + lineColor + glowColorTL + glowColorBR;

    // Boost line visibility near glows
    finalColor += vec3(lines) * (glowTL + glowBR) * 0.2;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const programRef = useRef<WebGLProgram | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      console.warn("WebGL not supported");
      return;
    }
    glRef.current = gl;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;
    programRef.current = program;

    gl.useProgram(program);

    // Set up geometry (full-screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5); // Cap DPR for performance
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Animation loop
    const startTime = Date.now();

    const render = () => {
      const time = (Date.now() - startTime) / 1000;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        opacity: 1,
        mixBlendMode: "normal",
      }}
    />
  );
}
