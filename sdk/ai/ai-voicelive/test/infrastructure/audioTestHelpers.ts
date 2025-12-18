// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

/**
 * Generates test audio data for the given text.
 * In a real implementation, this would use text-to-speech synthesis.
 * For testing purposes, this creates mock PCM audio data.
 */
export function generateTestAudio(text: string): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const endpoint = process.env.VOICELIVE_ENDPOINT || process.env.AI_SERVICES_ENDPOINT;
    const apiKey = process.env.VOICELIVE_API_KEY || process.env.AI_SERVICES_KEY;
    const speechConfg = SpeechSDK.SpeechConfig.fromEndpoint(new URL(endpoint!), apiKey!);
    speechConfg.speechSynthesisOutputFormat = SpeechSDK.SpeechSynthesisOutputFormat.Raw16Khz16BitMonoPcm;

    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfg);
    synthesizer.speakTextAsync(text,
      (synthesisResult) => {
        if (synthesisResult.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
          const audioData = synthesisResult.audioData;
          resolve(audioData);
        } else {
          reject(new Error(`Speech synthesis failed: ${synthesisResult.errorDetails}`));
        }
      },
      (error) => {
        reject(new Error(`Speech synthesis error: ${error}`));
      }
    );
  });
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
