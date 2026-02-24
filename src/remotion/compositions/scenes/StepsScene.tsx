import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
  AbsoluteFill,
} from "remotion";
import {
  FadeInWords,
  FadeInChars,
} from "../../library/components/text/TextAnimation";

interface StepData {
  number: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const STEPS: StepData[] = [
  {
    number: "01",
    title: "Share Your Vision",
    description: "Describe the vibe, message, and visual style in plain English.",
    icon: "https://api.iconify.design/ph/pencil-simple-line-fill.svg?color=%232563EB&width=40",
    color: "#2563EB",
  },
  {
    number: "02",
    title: "AI Generation",
    description: "Our engine builds scenes, animations, and transitions automatically.",
    icon: "https://api.iconify.design/ph/sparkle-fill.svg?color=%238B5CF6&width=40",
    color: "#8B5CF6",
  },
  {
    number: "03",
    title: "Export & Reuse",
    description: "Get high-quality exports or reuse creations as templates.",
    icon: "https://api.iconify.design/ph/rocket-launch-fill.svg?color=%2310B981&width=40",
    color: "#10B981",
  },
];

const StepCard: React.FC<{
  step: StepData;
  index: number;
  delayFrames: number;
}> = ({ step, index, delayFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entryProgress = interpolate(
    frame,
    [delayFrames, delayFrames + 18],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) }
  );

  const yOffset = interpolate(
    frame,
    [delayFrames, delayFrames + 18],
    [60, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  // Subtle hover float
  const t = (frame - delayFrames) / fps;
  const floatY = entryProgress > 0.9 ? Math.sin(t * 1.5 + index) * 4 : 0;

  // Icon pulse
  const iconScale = entryProgress > 0.9
    ? 1 + Math.sin(t * 2.5 + index * 0.5) * 0.05
    : interpolate(frame, [delayFrames + 5, delayFrames + 22], [0.5, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.back(2)),
      });

  // Glow intensity
  const glowOpacity = entryProgress > 0.9
    ? 0.15 + Math.sin(t * 2 + index) * 0.05
    : 0;

  return (
    <div
      style={{
        position: "relative",
        width: 340,
        padding: "36px 28px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.04)",
        border: `1px solid rgba(255,255,255,0.08)`,
        backdropFilter: "blur(20px)",
        opacity: entryProgress,
        transform: `translateY(${yOffset + floatY}px)`,
        overflow: "hidden",
      }}
    >
      {/* Glow accent */}
      <div
        style={{
          position: "absolute",
          top: -40,
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          height: 100,
          borderRadius: "50%",
          background: step.color,
          filter: "blur(50px)",
          opacity: glowOpacity,
        }}
      />

      {/* Step number */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: step.color,
          letterSpacing: "0.15em",
          marginBottom: 16,
          textTransform: "uppercase",
        }}
      >
        Step {step.number}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: `${step.color}15`,
          border: `1px solid ${step.color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          transform: `scale(${iconScale})`,
        }}
      >
        <Img src={step.icon} style={{ width: 32, height: 32 }} />
      </div>

      {/* Title */}
      <FadeInChars
        startFrom={delayFrames + 8}
        stagger={0.02}
        duration={0.4}
        ease="power2.out"
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: 10,
        }}
      >
        {step.title}
      </FadeInChars>

      {/* Description */}
      <FadeInWords
        startFrom={delayFrames + 14}
        stagger={0.04}
        duration={0.4}
        ease="power2.out"
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.5,
        }}
      >
        {step.description}
      </FadeInWords>
    </div>
  );
};

export const StepsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section header
  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Connecting line between cards
  const lineProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          padding: "0 60px",
        }}
      >
        {/* Section label */}
        <div style={{ textAlign: "center", opacity: headerOpacity }}>
          <FadeInWords
            startFrom={0}
            stagger={0.06}
            duration={0.5}
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#2563EB",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            How It Works
          </FadeInWords>
          <FadeInWords
            startFrom={8}
            stagger={0.06}
            duration={0.5}
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#ffffff",
              textWrap: "balance",
            }}
          >
            From Prompt to Production
          </FadeInWords>
        </div>

        {/* Steps row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 32,
            position: "relative",
          }}
        >
          {STEPS.map((step, i) => (
            <StepCard
              key={i}
              step={step}
              index={i}
              delayFrames={18 + i * 14}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
