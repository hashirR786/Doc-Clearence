# Background videos

Two scroll-scrubbed videos back the homepage:

| File           | Where it plays                          | Treatment                        |
|----------------|-----------------------------------------|----------------------------------|
| `hero.mp4`     | Hero + trust strip + brand statement     | Navy veil, light text over it    |
| `services.mp4` | "What we do" services grid               | Cream veil, dark text over it    |

Current footage: an aerial UAE skyline at sunset for the hero, and navy
passports and documents falling into a neat stack for the services grid.

Both are registered in `content/site.ts` under `video`, together with their
posters. Set `enabled: false` on either to fall back to its poster with no
video request at all.

## Requirements

| Setting      | Target                                                           |
|--------------|------------------------------------------------------------------|
| Duration     | 8–15 seconds                                                      |
| Resolution   | 1920×1080                                                         |
| File size    | **Under 6MB** each                                                |
| Audio        | None (the element is muted; strip the track to save bytes)        |
| Keyframes    | Every 4 frames (`-g 4`)                                           |

### Why `-g 4` and not `-g 2`

Seeking costs the browser one decode from the nearest preceding keyframe, so
dense keyframes are what make scrubbing smooth. But an almost all-intra stream
burns the entire bitrate budget on keyframes, which forces the resolution down.

`-g 4` is the sweet spot: at most three frames to decode per seek, which
measures at roughly **25ms per seek (~40 effective fps)** at 1080p — above the
24fps source, so every frame can be displayed — while leaving enough bitrate
for full 1080p inside the 6MB budget. Going to `-g 2` costs about a third of
the bitrate for no measurable gain in scrub smoothness.

To re-measure after swapping footage, step a video's `currentTime` forward one
frame at a time and time the `seeked` event. Median comfortably under ~30ms is
smooth.

Dark footage goes behind the navy veil, light footage behind the cream veil.
Swapping one for the other will wreck the text contrast, so change the
`overlay` prop on the matching `<ScrollVideoScene>` in `app/[locale]/page.tsx`
if you do.

## Encoding

Dense keyframes are the part people forget. Without them the browser decodes
from the previous keyframe on every seek and the scrub stutters badly.

```bash
# Detailed live footage — scale down, it is behind a veil
ffmpeg -i source.mp4 -an -vf "scale=1440:-2" \
  -c:v libx264 -crf 30 -preset slow -g 2 -keyint_min 2 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart hero.mp4

# Flat motion graphics compress far better — keep full resolution
ffmpeg -i source.mp4 -an \
  -c:v libx264 -crf 26 -preset slow -g 2 -keyint_min 2 -sc_threshold 0 \
  -pix_fmt yuv420p -movflags +faststart services.mp4
```

WebM is deliberately not used: at all-keyframe settings VP9 came out *larger*
than H.264 for this footage, so MP4 alone is the better trade.

## Posters

`hero-poster.jpg` and `services-poster.jpg` in `public/images/` are frame 0 of
each video, shown before load, on mobile, on slow connections and whenever
`prefers-reduced-motion` is set. Regenerate them whenever you swap a video:

```bash
ffmpeg -i hero.mp4 -frames:v 1 -q:v 4 ../images/hero-poster.jpg
```

Keep the hero poster under ~70KB — it is the page's LCP element.

## How long the animation runs

The scrub is mapped across the **whole scene**, not a fixed scroll distance:
first frame when the scene's top reaches the top of the viewport, last frame
when its bottom reaches the bottom. To make a video play out over more
scrolling, make its scene taller — the hero scene gets its length from the
hero, trust strip and statement sections stacked inside it.
