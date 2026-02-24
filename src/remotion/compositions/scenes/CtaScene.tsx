import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
  AbsoluteFill,
} from "remotion";
import { FadeInWords, BounceChars } from "../../library/components/text/TextAnimation";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central glow pulse
  const glowScale = 1 + Math.sin((frame / fps) * 1.5) * 0.08;
  const glowOpacity = 0.2 + Math.sin((frame / fps) * 1.5) * 0.05;

  // Button entrance
  const btnOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const btnY = interpolate(frame, [35, 50], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });

  // Button glow pulse
  const btnGlow = 0.3 + Math.sin((frame / fps) * 3) * 0.15;

  // Floating badges
  const badges = [
    { text: "No credit card required", delay: 55, x: -140 },
    { text: "Free to get started", delay: 62, x: 140 },
  ];

  return (
    <AbsoluteFill>
      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 600,
          height: 600,
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)",
          opacity: glowOpacity,
          filter: "blur(60px)",
        }}
      />

      {/* Content */}
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
        {/* Sparkle icon */}
        <div
          style={{
            opacity: interpolate(frame, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            transform: `scale(${interpolate(frame, [0, 15], [0.5, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(2)),
            })})`,
          }}
        >
          <Img
            src="https://api.iconify.design/ph/sparkle-fill.svg?color=%232563EB&width=56"
            style={{
              width: 56,
              height: 56,
              filter: "drop-shadow(0 0 20px rgba(37,99,235,0.5))",
            }}
          />
        </div>

        {/* CTA headline */}
        <BounceChars
          startFrom={5}
          stagger={0.03}
          duration={0.7}
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            textWrap: "balance",
            maxWidth: 1000,
            wordBreak: "keep-all",
          }}
        >
          Ready to animate your imagination?
        </BounceChars>

        {/* Subtext */}
        <FadeInWords
          startFrom={22}
          stagger={0.05}
          duration={0.5}
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.5,
            textWrap: "balance",
          }}
        >
          Join thousands of founders and creators building high-quality video content
        </FadeInWords>

        {/* CTA Button */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `translateY(${btnY}px)`,
          }}
        >
          <div
            style={{
              padding: "16px 40px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #2563EB, #3B82F6)",
              color: "#ffffff",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.01em",
              boxShadow: `0 0 30px rgba(37,99,235,${btnGlow}), 0 4px 20px rgba(0,0,0,0.3)`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span>Create Your First Video</span>
            <Img
              src="https://api.iconify.design/heroicons/arrow-right-solid.svg?color=%23ffffff&width=20"
              style={{ width: 20, height: 20 }}
            />
          </div>
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 8,
          }}
        >
          {badges.map((badge, i) => {
            const badgeOpacity = interpolate(
              frame,
              [badge.delay, badge.delay + 12],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const badgeY = interpolate(
              frame,
              [badge.delay, badge.delay + 12],
              [10, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              }
            );
            return (
              <div
                key={i}
                style={{
                  opacity: badgeOpacity,
                  transform: `translateY(${badgeY}px)`,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#10B981",
                  }}
                />
                {badge.text}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
