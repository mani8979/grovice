"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

/* ── DNA mesh that reads scroll rotation ── */
function DNAMesh({ rotationY }: { rotationY: number }) {
  const gltf = useGLTF("/dna.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Center the model
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  box.getCenter(center);
  box.getSize(size);
  gltf.scene.position.sub(center);

  // Scale to fill screen nicely
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim > 0 ? 5 / maxDim : 1;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationY;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={gltf.scene} />
    </group>
  );
}

interface DNABackgroundProps {
  rotation: MotionValue<number>;
}

export default function DNABackground({ rotation }: DNABackgroundProps) {
  const [rotY, setRotY] = React.useState(0);

  // Subscribe to framer-motion value
  React.useEffect(() => {
    const unsubscribe = rotation.on("change", (v: number) => {
      setRotY((v * Math.PI) / 180);
    });
    return unsubscribe;
  }, [rotation]);

  return (
    <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#00D2FF" />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#7A5CFF" />

        <Environment preset="city" />

        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.2}
          scale={12}
          blur={3}
          far={5}
          color="#000000"
        />

        <React.Suspense fallback={null}>
          <DNAMesh rotationY={rotY} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/dna.glb");
