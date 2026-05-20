"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function Scene() {
  const { size } = useThree();
  const [scale, setScale] = useState(1.0);
  const textRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const torusRef2 = useRef<THREE.Mesh>(null);

  // Responsive scale calculations
  useEffect(() => {
    const width = size.width;
    if (width < 640) {
      setScale(0.55); // Mobile
    } else if (width < 1024) {
      setScale(0.8);  // Tablet
    } else {
      setScale(1.15);  // Desktop
    }
  }, [size.width]);

  // Interactivity: mouse movement rotates the text slightly
  useFrame((state) => {
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    if (textRef.current) {
      textRef.current.rotation.y = THREE.MathUtils.lerp(
        textRef.current.rotation.y,
        pointerX * 0.25,
        0.05
      );
      textRef.current.rotation.x = THREE.MathUtils.lerp(
        textRef.current.rotation.x,
        -pointerY * 0.2,
        0.05
      );
    }

    if (torusRef.current) {
      torusRef.current.rotation.z += 0.003;
      torusRef.current.rotation.x = THREE.MathUtils.lerp(
        torusRef.current.rotation.x,
        pointerY * 0.3,
        0.05
      );
    }
    if (torusRef2.current) {
      torusRef2.current.rotation.z -= 0.002;
      torusRef2.current.rotation.y = THREE.MathUtils.lerp(
        torusRef2.current.rotation.y,
        pointerX * 0.3,
        0.05
      );
    }
  });

  return (
    <>
      {/* Lights - Coastal Luxury sunset mood */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -5, -5]} intensity={1.0} color="#00E5FF" />
      <pointLight position={[5, -10, 8]} intensity={1.2} color="#8B5CF6" />

      {/* Floating 3D Text & Shapes */}
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <group ref={textRef} scale={[scale, scale, scale]}>
          
          {/* Main "GROVICE" Text with metallic blue sheen */}
          <Text
            font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFJVnZa3Frea92bOfOedqKbA.woff"
            fontSize={0.9}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            position={[0, 0.15, 0]}
            letterSpacing={0.06}
          >
            GROVICE
            <meshPhysicalMaterial
              metalness={0.9}
              roughness={0.15}
              color="#dbeafe"
              clearcoat={1.0}
              clearcoatRoughness={0.1}
            />
          </Text>

          {/* "2.0" Text in glowing cyan-blue */}
          <Text
            font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFJVnZa3Frea92bOfOedqKbA.woff"
            fontSize={1.0}
            color="#00E5FF"
            anchorX="center"
            anchorY="middle"
            position={[0, -0.65, 0.15]}
            letterSpacing={0.1}
          >
            2.0
            <meshStandardMaterial
              color="#00E5FF"
              roughness={0.1}
              metalness={0.8}
              emissive="#00b4d8"
              emissiveIntensity={0.5}
            />
          </Text>

          {/* Subtitle */}
          <Text
            font="https://fonts.gstatic.com/s/outfit/v11/q35yFy1g9eR3_3850qDA.woff"
            fontSize={0.2}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            position={[0, -1.15, 0.1]}
            letterSpacing={0.08}
          >
            BUSINESS OPERATING SYSTEM
          </Text>
        </group>
      </Float>

      {/* Outer Floating Rings (Engine A & B visual representations) */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.4}>
        <group scale={[scale, scale, scale]}>
          {/* Engine A Ring: Glassy and Tech Teal */}
          <mesh ref={torusRef} position={[0, -0.3, -0.5]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
            <torusGeometry args={[1.8, 0.04, 16, 100]} />
            <meshPhysicalMaterial
              color="#00E5FF"
              metalness={0.3}
              roughness={0.1}
              transparent
              opacity={0.4}
              transmission={0.6}
              thickness={0.5}
            />
          </mesh>

          {/* Engine B Ring: Metallic Creative Purple */}
          <mesh ref={torusRef2} position={[0, -0.3, -0.6]} rotation={[-Math.PI / 3, -Math.PI / 6, 0]}>
            <torusGeometry args={[2.0, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#8B5CF6"
              metalness={0.9}
              roughness={0.2}
              emissive="#5b21b6"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      </Float>

      {/* Subtle background space stars */}
      <Stars radius={100} depth={50} count={120} factor={4} saturation={0.5} fade speed={1.5} />
    </>
  );
}

export default function ThreeCanvasInner() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
