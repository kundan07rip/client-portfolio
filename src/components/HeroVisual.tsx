"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function OilBlob() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.15;
            meshRef.current.rotation.y = t * 0.1;
            meshRef.current.rotation.z = Math.cos(t * 0.12) * 0.1;
        }
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.8}
            floatingRange={[-0.15, 0.15]}
        >
            <mesh ref={meshRef} scale={2.4}>
                <icosahedronGeometry args={[1, 64]} />
                <MeshDistortMaterial
                    color="#0d9488"
                    roughness={0.08}
                    metalness={1}
                    distort={0.4}
                    speed={2}
                    envMapIntensity={3}
                />
            </mesh>
        </Float>
    );
}

function InnerRing() {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI * 0.5 + Math.sin(t * 0.2) * 0.15;
            ringRef.current.rotation.z = t * 0.15;
        }
    });

    return (
        <mesh ref={ringRef}>
            <torusGeometry args={[2.8, 0.015, 32, 128]} />
            <meshBasicMaterial color="#0d9488" transparent opacity={0.3} />
        </mesh>
    );
}

function OuterRing() {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.PI * 0.4 + Math.cos(t * 0.18) * 0.1;
            ringRef.current.rotation.y = t * -0.08;
            ringRef.current.rotation.z = Math.sin(t * 0.1) * 0.2;
        }
    });

    return (
        <mesh ref={ringRef}>
            <torusGeometry args={[3.2, 0.008, 32, 128]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
        </mesh>
    );
}

function Particles() {
    const count = 80;
    const pointsRef = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 3 + Math.random() * 1.5;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
            pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                color="#06b6d4"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

export default function HeroVisual() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Canvas
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                style={{ background: "transparent" }}
                dpr={[1, 1.5]}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1} color="#f1f5f9" />
                <directionalLight position={[-3, 2, -5]} intensity={0.6} color="#0d9488" />
                <pointLight position={[0, 3, 2]} intensity={0.8} color="#a855f7" />
                <pointLight position={[-2, -3, 3]} intensity={0.5} color="#d97706" />

                <OilBlob />
                <InnerRing />
                <OuterRing />
                <Particles />

                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
