"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Auto-rotating GLB model ── */
function GroviceModel({ url }: { url: string }) {
  const gltf = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4; // slow luxury spin
    }
  });

  // Center the model based on its bounding box
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  box.getCenter(center);
  gltf.scene.position.sub(center);

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <primitive object={gltf.scene} />
      </Float>
    </group>
  );
}

/* ── Loading fallback ring spinner ── */
function LoadingRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.z += delta * 2;
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.5, 0.04, 16, 60]} />
      <meshBasicMaterial color="#00D2FF" transparent opacity={0.7} />
    </mesh>
  );
}

interface ModelViewerProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ModelViewer({ className = "", style }: ModelViewerProps) {
  return (
    <div className={className} style={style}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Luxury lighting rig */}
        <ambientLight intensity={0.3} color="#ffffff" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#00D2FF"
          castShadow
        />
        <directionalLight
          position={[-5, -3, -5]}
          intensity={0.6}
          color="#7A5CFF"
        />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#FF4FD8" distance={12} />

        {/* HDRI environment for reflections */}
        <Environment preset="city" />

        {/* Contact shadow beneath the model */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={8}
          blur={2.5}
          far={3}
          color="#000000"
        />

        {/* The GLB model with Suspense fallback */}
        <Suspense fallback={<LoadingRing />}>
          <GroviceModel url="/untitled.glb" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/untitled.glb");
