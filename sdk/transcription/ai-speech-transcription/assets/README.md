# Test Assets

This directory contains audio files used by the transcription SDK tests.

## Required Files

The following audio files are needed for tests. Copy them from the C# SDK repo
([azure-sdk-for-net/sdk/transcription/Azure.AI.Speech.Transcription/samples/assets/](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/transcription/Azure.AI.Speech.Transcription/samples/assets)):

| File | Description |
| ---- | ----------- |
| `sample-whatstheweatherlike-en.mp3` | English audio sample ("What's the weather like") |
| `sample-profanity.wav` | Audio sample containing profanity (for profanity filter tests) |
| `sample-audio.wav` | General audio sample |
| `sample-howstheweather-cn.wav` | Chinese audio sample |

## Usage

Tests reference these files via the `ASSET_PATH` constant from `test/public/utils/recordedClient.ts`:

```typescript
import { ASSET_PATH } from "./utils/recordedClient.js";
import { join } from "node:path";
import { readFileSync } from "node:fs";

const audioBuffer = readFileSync(join(ASSET_PATH, "sample-whatstheweatherlike-en.mp3"));
```
