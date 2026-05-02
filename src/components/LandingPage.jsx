import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei';

// A highly premium looking floating 3D abstract shape
const FloatingShape = () => {
    const mesh = useRef();

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.y += delta * 0.2;
            mesh.current.rotation.x += delta * 0.1;
        }
    });

    return (
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2.5}>
            <mesh ref={mesh} scale={2}>
                <icosahedronGeometry args={[1, 0]} />
                <meshPhysicalMaterial
                    color="#3b82f6"
                    roughness={0.2}
                    metalness={0.8}
                    wireframe={true}
                    emissive="#1d4ed8"
                    emissiveIntensity={0.8}
                />
            </mesh>
            <mesh scale={1.8}>
                <icosahedronGeometry args={[1, 1]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transmission={1}
                    opacity={1}
                    metalness={0.1}
                    roughness={0}
                    ior={1.5}
                    thickness={2}
                />
            </mesh>
        </Float>
    );
};

const LandingPage = () => {
    return (
        <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">

            {/* Real Background Image with Dark Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"
                    alt="Premium Gaming Background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 h-screen flex flex-col lg:flex-row items-center pt-20">

                {/* Text and Call To Action */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-8 mt-12 lg:mt-0">
                    <div className="space-y-4">
                        <h2 className="text-blue-400 font-bold tracking-widest uppercase">Welcome to the future</h2>
                        <h1 className="text-5xl lg:text-7xl font-akira font-black tracking-wider leading-tight text-white drop-shadow-2xl">
                            NEXT GEN <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                PLAYGTV.
                            </span>
                        </h1>
                    </div>

                    <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
                        Experience gaming without limits. High fidelity visuals, incredible performance, and a completely immersive interactive experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 mt-4">
                        <Link to="/popular" className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] font-akira tracking-wider text-sm">
                            ENTER ARCADE
                        </Link>
                        <Link to="/popular" className="px-8 py-4 border-2 border-slate-700 hover:border-slate-400 text-white font-bold rounded-lg transition-all hover:bg-white/5 font-akira tracking-wider text-sm backdrop-blur-sm">
                            EXPLORE
                        </Link>
                    </div>
                </div>

                {/* 3D Canvas rendering our Model */}
                <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative z-20 cursor-grab active:cursor-grabbing">
                    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                        <PresentationControls
                            global
                            config={{ mass: 2, tension: 500 }}
                            snap={{ mass: 4, tension: 1500 }}
                            rotation={[0, 0.3, 0]}
                            polar={[-Math.PI / 3, Math.PI / 3]}
                            azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
                            <FloatingShape />
                        </PresentationControls>
                        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#3b82f6" />
                        <Environment preset="city" />
                    </Canvas>
                </div>

            </div>
        </div>
    );
};

export default LandingPage;
