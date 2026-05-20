"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";

/* ── Auto-rotating GLB model — front-facing fix ── */
function GroviceModel({ url }: { url: string }) {
  const gltf = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!groupRef.current) return;

    // Compute bounding box and center the model
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    // Translate scene so it is centered at origin
    gltf.scene.position.sub(center);
  }, [gltf.scene]);

  // Slow luxury Y-axis spin — only Y so text stays upright
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group
      ref={groupRef}
      // Rotate on X by 90° to fix the "going into screen" orientation
      rotation={[Math.PI / 2, 0, 0]}
    >
      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.25}>
        <primitive object={gltf.scene} />
      </Float>
    </group>
  );
}

/* ── Spinner while loading ── */
function LoadingRing() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.z += delta * 2;
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.45, 0.035, 16, 60]} />
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
        camera={{ position: [0, 0, 4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Premium tri-colour lighting rig */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight position={[4, 6, 6]} intensity={1.4} color="#00D2FF" castShadow />
        <directionalLight position={[-6, -4, -6]} intensity={0.7} color="#7A5CFF" />
        <pointLight position={[0, 4, 3]} intensity={0.9} color="#FF4FD8" distance={14} />
        <pointLight position={[0, -4, -3]} intensity={0.4} color="#00D2FF" distance={10} />

        {/* HDRI city reflections */}
        <Environment preset="city" />

        {/* Ground contact shadow */}
        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.45}
          scale={8}
          blur={2.5}
          far={3}
          color="#000000"
        />

        <React.Suspense fallback={<LoadingRing />}>
          <GroviceModel url="/untitled.glb" />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/untitled.glb");
