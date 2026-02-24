import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
  AbsoluteFill,
} from "remotion";
import { FadeInWords, BlurReveal } from "../../library/components/text/TextAnimation";

const HERO_BG_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/uploads/1771929075674_r4kwn6318oq_typeframes_hero_bg.png";

/** Floating orb for ambient depth */
const FloatingOrb: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  delay: number;
}> = ({ x, y, size, color, speed, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = (frame - delay * fps) / fps;

  const floatY = Math.sin(t * speed) * 18;
  const floatX = Math.cos(t * speed * 0.7) * 12;
  const scale = 0.95 + Math.sin(t * speed * 1.3) * 0.05;

  const fadeIn = interpolate(frame, [delay * fps, delay * fps + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: `translate(${floatX}px, ${floatY}px) scale(${scale})`,
        opacity: fadeIn * 0.6,
        filter: `blur(${size * 0.3}px)`,
      }}
    />
  );
};

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Background image zoom
  const bgScale = interpolate(frame, [0, 120], [1.1, 1.02], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Logo fade & scale
  const logoOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(frame, [8, 28], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.6)),
  });

  // Sparkle icon entrance
  const sparkleOpacity = interpolate(frame, [18, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sparkleRotation = interpolate(frame, [18, 50], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });

  // Subtitle line reveal
  const lineWidth = interpolate(frame, [50, 75], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      {/* Dark BG Image */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          transform: `scale(${bgScale})`,
          opacity: 0.35,
        }}
      >
        <Img
          src={HERO_BG_URL}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(37,99,235,0.15) 0%, transparent 60%), linear-gradient(180deg, rgba(10,10,11,0.3) 0%, rgba(10,10,11,0.9) 100%)",
        }}
      />

      {/* Floating orbs */}
      <FloatingOrb x={150} y={120} size={200} color="#2563EB" speed={0.8} delay={0} />
      <FloatingOrb x={1050} y={80} size={160} color="#8B5CF6" speed={1.1} delay={0.3} />
      <FloatingOrb x={600} y={500} size={120} color="#3B82F6" speed={0.6} delay={0.5} />

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Sparkle + Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <Img
            src="https://api.iconify.design/ph/sparkle-fill.svg?color=%232563EB&width=48"
            style={{
              width: 48,
              height: 48,
              opacity: sparkleOpacity,
              transform: `rotate(${sparkleRotation}deg)`,
              filter: "drop-shadow(0 0 12px rgba(37,99,235,0.6))",
            }}
          />
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              textShadow: "0 4px 30px rgba(37,99,235,0.3)",
            }}
          >
            TypeFrames
          </span>
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 2,
            background: "linear-gradient(90deg, transparent, #2563EB, transparent)",
            borderRadius: 2,
          }}
        />

        {/* Headline */}
        <FadeInWords
          startFrom={25}
          stagger={0.08}
          duration={0.6}
          ease="power3.out"
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.15,
            textWrap: "balance",
          }}
        >
          Studio-grade videos from a single prompt
        </FadeInWords>

        {/* Subheadline */}
        <BlurReveal
          startFrom={45}
          stagger={0.03}
          duration={0.6}
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: 680,
            lineHeight: 1.5,
            textWrap: "balance",
          }}
        >
          Describe your vision and watch it transform into professional-grade video.
          Motion graphics, animations, and effects — all generated in seconds.
        </BlurReveal>
      </div>
    </AbsoluteFill>
  );
};
