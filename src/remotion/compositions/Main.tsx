import { AbsoluteFill, Artifact, useCurrentFrame, useVideoConfig, Sequence, Audio, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { HeroScene } from "./scenes/HeroScene";
import { StepsScene } from "./scenes/StepsScene";
import { ShowcaseScene } from "./scenes/ShowcaseScene";
import { CtaScene } from "./scenes/CtaScene";
import { GridBackground } from "../library/components/effects/GridBackground";

const { fontFamily } = loadInter("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const WHOOSH_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1771929066670_r7srv8gkvnc_sfx_Soft_futuristic_digital_whoosh.mp3";
const AMBIENT_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1771929069913_9i1ni0eq5pd_sfx_Gentle_ambient_electronic_back.mp3";

// Scene durations (frames at 30fps)
const HERO_DUR = 150;       // 5s
const STEPS_DUR = 150;      // 5s
const SHOWCASE_DUR = 165;   // 5.5s
const CTA_DUR = 120;        // 4s
const TRANSITION_DUR = 20;  // transition overlap

// Total: 150 + 150 + 165 + 120 - 3*20 = 525
const TOTAL_DURATION = HERO_DUR + STEPS_DUR + SHOWCASE_DUR + CTA_DUR - 3 * TRANSITION_DUR;

/** Global ambient background */
const GlobalBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow color shift
  const hue = interpolate(frame, [0, TOTAL_DURATION], [220, 260], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "#0A0A0B" }}>
      {/* Subtle grid */}
      <GridBackground
        cellSize={60}
        color={`rgba(255,255,255,0.025)`}
        backgroundColor="transparent"
        animate
        velocity={12}
        direction="down"
        fadeEdges
        opacity={0.5}
      />

      {/* Ambient gradient that slowly shifts */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 30% 20%, hsla(${hue}, 70%, 50%, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsla(${hue + 40}, 60%, 40%, 0.06) 0%, transparent 50%)`,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* Thumbnail artifact */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <AbsoluteFill style={{ fontFamily, fontWeight: 500 }}>
        {/* Persistent background */}
        <GlobalBackground />

        {/* Scene transitions */}
        <TransitionSeries>
          {/* Scene 1: Hero */}
          <TransitionSeries.Sequence durationInFrames={HERO_DUR}>
            <HeroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 2: Steps */}
          <TransitionSeries.Sequence durationInFrames={STEPS_DUR}>
            <StepsScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 3: Showcase */}
          <TransitionSeries.Sequence durationInFrames={SHOWCASE_DUR}>
            <ShowcaseScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 4: CTA */}
          <TransitionSeries.Sequence durationInFrames={CTA_DUR}>
            <CtaScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Audio layers */}
        <Audio src={AMBIENT_SFX} volume={0.15} loop />

        {/* Whoosh on transitions */}
        <Sequence from={HERO_DUR - TRANSITION_DUR / 2} layout="none">
          <Audio src={WHOOSH_SFX} volume={0.25} />
        </Sequence>
        <Sequence from={HERO_DUR + STEPS_DUR - TRANSITION_DUR - TRANSITION_DUR / 2} layout="none">
          <Audio src={WHOOSH_SFX} volume={0.25} />
        </Sequence>
        <Sequence from={HERO_DUR + STEPS_DUR + SHOWCASE_DUR - 2 * TRANSITION_DUR - TRANSITION_DUR / 2} layout="none">
          <Audio src={WHOOSH_SFX} volume={0.25} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
