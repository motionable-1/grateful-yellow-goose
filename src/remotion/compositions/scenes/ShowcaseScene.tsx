import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  AbsoluteFill,
} from "remotion";
import { BrowserMockup } from "../../library/components/mockups/BrowserMockup";
import { Cursor } from "../../library/components/ui/Cursor";
import {
  FadeInWords,
  TypewriterText,
} from "../../library/components/text/TextAnimation";

/** Simulated Typeframes UI inside browser */
const TypeframesUI: React.FC = () => {
  const frame = useCurrentFrame();

  // Progress bar animation
  const progressWidth = interpolate(frame, [50, 100], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Render status text
  const showRender = frame > 50;
  const renderDone = frame > 100;

  // Video preview appear
  const previewOpacity = interpolate(frame, [105, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const previewScale = interpolate(frame, [105, 118], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.5)),
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0A0A0B",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Prompt area */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 20px",
          flex: "0 0 auto",
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            marginBottom: 8,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Your Prompt
        </div>
        <div style={{ fontSize: 15, color: "#ffffff", lineHeight: 1.5 }}>
          <TypewriterText speed={0.04} cursorColor="#2563EB">
            Create a product launch video with smooth transitions and bold typography
          </TypewriterText>
        </div>
      </div>

      {/* Generation area */}
      <div
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.02)",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Progress bar */}
        {showRender && !renderDone && (
          <div style={{ width: "60%", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                fontWeight: 500,
              }}
            >
              Generating your video...
            </div>
            <div
              style={{
                width: "100%",
                height: 4,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progressWidth}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #2563EB, #8B5CF6)",
                  borderRadius: 2,
                  boxShadow: "0 0 12px rgba(37,99,235,0.5)",
                }}
              />
            </div>
          </div>
        )}

        {/* Completed state */}
        {renderDone && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              opacity: previewOpacity,
              transform: `scale(${previewScale})`,
            }}
          >
            {/* Video preview placeholder */}
            <div
              style={{
                width: 320,
                height: 180,
                borderRadius: 10,
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Play button */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(37,99,235,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "14px solid white",
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    marginLeft: 3,
                  }}
                />
              </div>
              {/* Duration badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  background: "rgba(0,0,0,0.7)",
                  padding: "3px 8px",
                  borderRadius: 4,
                  fontSize: 11,
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 500,
                }}
              >
                0:30
              </div>
            </div>

            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#10B981",
                  boxShadow: "0 0 8px #10B981",
                }}
              />
              <span style={{ fontSize: 13, color: "#10B981", fontWeight: 600 }}>
                Rendering Complete · 4K · High Fidelity
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ShowcaseScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Browser entrance
  const browserOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const browserY = interpolate(frame, [0, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const browserScale = interpolate(frame, [0, 20], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.2)),
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
          gap: 28,
          padding: "0 80px",
        }}
      >
        {/* Section label */}
        <FadeInWords
          startFrom={0}
          stagger={0.06}
          duration={0.5}
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#8B5CF6",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          See It In Action
        </FadeInWords>

        {/* Browser mockup */}
        <div
          style={{
            opacity: browserOpacity,
            transform: `translateY(${browserY}px) scale(${browserScale})`,
            position: "relative",
          }}
        >
          <BrowserMockup
            browser="chrome"
            theme="dark"
            url="https://typeframes.com"
            tabTitle="TypeFrames - AI Video Creation"
            width={900}
            height={480}
            borderRadius={16}
          >
            <TypeframesUI />
          </BrowserMockup>

          {/* Cursor interaction */}
          <Cursor
            size={22}
            color="#000"
            rippleColor="rgba(37,99,235,0.6)"
            path={[
              { x: 200, y: 80, frame: 10, cursor: "default" },
              { x: 450, y: 120, frame: 30, cursor: "text", ease: "smooth" },
              { x: 450, y: 120, frame: 40, click: true },
              { x: 500, y: 340, frame: 70, cursor: "pointer", ease: "smooth" },
              { x: 500, y: 340, frame: 80, click: true },
              { x: 560, y: 380, frame: 120, cursor: "default", ease: "slow" },
            ]}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
