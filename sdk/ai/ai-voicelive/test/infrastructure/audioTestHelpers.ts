// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceLiveSession } from "../../src/index.js";

// Import Speech SDK with proper browser-compatible syntax
let SpeechSDK: any;

// Try different import methods depending on environment
if (typeof self === "undefined") {
  // Node.js environment - use require
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  SpeechSDK = require("microsoft-cognitiveservices-speech-sdk");
} else {
  // Browser environment - use dynamic import with proper syntax
  // The Speech SDK might be available as a global or need dynamic import
  if (typeof self !== "undefined" && (self as any).SpeechSDK) {
    // Available as global (e.g., from CDN)
    SpeechSDK = (self as any).SpeechSDK;
  } else {
    // Try dynamic import - this will be resolved at build time by bundler
    import("microsoft-cognitiveservices-speech-sdk")
      .then((module) => {
        // Handle both default and named exports
        SpeechSDK = module.default || module;
        return;
      })
      .catch(() => {
        // Fallback handled below
      });
  }
}

/**
 * Generates test audio data for the given text.
 * In a real implementation, this would use text-to-speech synthesis.
 * For testing purposes, this creates mock PCM audio data.
 */
export function generateTestAudio(text: string): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    // Use real Speech SDK in Node.js environment
    try {
      const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
      const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;

      if (!endpoint || !apiKey) {
        // Fallback to mock audio if credentials not available
        reject(new Error("Speech synthesis credentials are not set in environment variables."));
        return;
      }

      const speechConfig = SpeechSDK.SpeechConfig.fromEndpoint(new URL(endpoint), apiKey);
      speechConfig.speechSynthesisOutputFormat =
        SpeechSDK.SpeechSynthesisOutputFormat.Raw16Khz16BitMonoPcm;

      const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
      synthesizer.speakTextAsync(
        text,
        (synthesisResult: any) => {
          if (synthesisResult.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
            const audioData = synthesisResult.audioData;
            resolve(audioData);
          } else {
            reject(new Error(`Speech synthesis failed: ${synthesisResult.errorDetails}`));
          }
        },
        (error: any) => {
          reject(new Error(`Speech synthesis error: ${error}`));
        },
      );
    } catch (error) {
      // Fallback to mock audio if Speech SDK fails
      resolve(generateMockAudio(text));
    }
  });
}

export async function sendTestAudio(session: VoiceLiveSession, text: string): Promise<void> {
  const audioData = await generateTestAudio(text);
  await session.sendAudio(audioData);
  await session.sendAudio(generateSilentAudio(1000)); // Send 500ms of silence after
}

/**
 * Generates mock audio data for testing purposes
 */
function generateMockAudio(text: string): ArrayBuffer {
  const sampleRate = 16000;
  const durationSeconds = Math.max(0.5, text.length * 0.1);
  const numSamples = Math.floor(sampleRate * durationSeconds);
  const audioBuffer = new ArrayBuffer(numSamples * 2);
  const audioView = new Int16Array(audioBuffer);

  // Generate simple sine wave
  const frequency = 440;
  for (let i = 0; i < numSamples; i++) {
    const sample = Math.sin((2 * Math.PI * frequency * i) / sampleRate) * 0.1;
    audioView[i] = Math.floor(sample * 32767);
  }

  return audioBuffer;
}

/**
 * Generates silent audio data of the specified duration
 */
export function generateSilentAudio(durationMs: number): ArrayBuffer {
  const sampleRate = 16000;
  const numSamples = Math.floor((sampleRate * durationMs) / 1000);

  // Create silent 16-bit PCM audio
  const buffer = new ArrayBuffer(numSamples * 2);
  // ArrayBuffer is already initialized with zeros (silence)

  return buffer;
}

/**
 * Converts a text string to a reasonable audio duration estimate
 */
export function estimateAudioDuration(text: string): number {
  // Rough estimate: average speaking rate is about 150-160 words per minute
  const wordsPerMinute = 150;
  const words = text.split(/\s+/).length;
  const durationMinutes = words / wordsPerMinute;
  const durationMs = durationMinutes * 60 * 1000;

  // Ensure minimum duration of 500ms
  return Math.max(500, durationMs);
}
