# Test Assets

This directory contains audio files used by the transcription SDK tests.

## Files

The following audio files are included in this directory for tests:

| File | Description |
| ---- | ----------- |
| `sample-whatstheweatherlike-en.mp3` | English audio sample ("What's the weather like") |
| `sample-profanity.wav` | Audio sample containing profanity (for profanity filter tests) |
| `sample-audio.wav` | General audio sample |
| `sample-howstheweather-cn.wav` | Chinese audio sample |
| `sample-SheWillStopTheAspirin.wav` | Audio sample ("She will stop the aspirin") |

## Usage

Tests reference these files via the `ASSET_PATH` constant from `test/public/utils/recordedClient.ts`:

```typescript
import { ASSET_PATH } from "./utils/recordedClient.js";
import { join } from "node:path";
import { readFileSync } from "node:fs";

const audioBuffer = readFileSync(join(ASSET_PATH, "sample-whatstheweatherlike-en.mp3"));
```
