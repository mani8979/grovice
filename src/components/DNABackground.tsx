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

  // Apply premium metallic brown/bronze material to all meshes
  React.useMemo(() => {
    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#7B4F27"), // rich, warm chocolate brown
          roughness: 0.2,
          metalness: 0.8,
        });
      }
    });
  }, [gltf]);

  // Center the model
  const box = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  box.getCenter(center);
  box.getSize(size);
  gltf.scene.position.sub(center);

  // Scale to fit screen vertically from top to bottom, extending beyond the boundaries
  const scale = size.y > 0 ? 13.5 / size.y : 1.5;

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
    <div style={{ position: "absolute", inset: 0, opacity: 0.45 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} color="#ffffff" />
        {/* Warm amber/bronze directional lights */}
        <directionalLight position={[6, 6, 6]} intensity={1.2} color="#D2B48C" />
        <directionalLight position={[-6, -6, -6]} intensity={0.6} color="#8B5A2B" />

        <Environment preset="city" />

        <ContactShadows
          position={[0, -3, 0]}
          opacity={0.3}
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
