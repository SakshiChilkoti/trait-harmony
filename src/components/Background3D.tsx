import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color="#f8b7d3"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function BackgroundShapes() {
  return (
    <>
      {/* Multiple floating shapes */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6} position={[-3, 2, -2]}>
        <mesh scale={[0.8, 0.8, 0.8]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <MeshDistortMaterial
            color="#d8b4fe"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1} position={[3, -1, -1]}>
        <mesh scale={[0.6, 0.6, 0.6]}>
          <octahedronGeometry args={[0.8]} />
          <MeshDistortMaterial
            color="#fbbf24"
            attach="material"
            distort={0.2}
            speed={1.8}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.9} position={[0, -2, -3]}>
        <mesh scale={[0.7, 0.7, 0.7]}>
          <torusGeometry args={[0.6, 0.25, 16, 32]} />
          <MeshDistortMaterial
            color="#c084fc"
            attach="material"
            distort={0.5}
            speed={1.2}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      </Float>
    </>
  );
}

export function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Ambient lighting */}
        <ambientLight intensity={0.6} />
        
        {/* Directional lights */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8} 
          color="#fdf2f8" 
        />
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={0.4} 
          color="#e0e7ff" 
        />
        
        {/* Point lights for extra glow */}
        <pointLight position={[0, 0, 2]} intensity={0.5} color="#f8b7d3" />
        <pointLight position={[2, 2, 0]} intensity={0.3} color="#d8b4fe" />
        
        {/* Main floating geometry */}
        <FloatingGeometry />
        
        {/* Background shapes */}
        <BackgroundShapes />
      </Canvas>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-yellow-50/70 pointer-events-none" />
    </div>
  );
}