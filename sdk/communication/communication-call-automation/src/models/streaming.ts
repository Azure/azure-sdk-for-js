// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationIdentifier } from "@azure/communication-common";
import type { TranscriptionResultState } from "../generated/src/index.js";

/**
 * Audio streaming data.
 */
export interface AudioData {
  kind: 'AudioData',
  /** A unique identifier for the media subscription.*/
  data: string;
  /** The timestamp indicating when the media content was received by the bot,
          or if the bot is sending media, the timestamp of when the media was sourced.
          The format is ISO 8601 (yyyy-mm-ddThh:mm).*/
  timestamp?: Date;
  /** Indicates whether the received audio buffer contains only silence..*/
  isSilent?: boolean;
  /** The identified speaker based on participant raw ID. */
  participant?: CommunicationIdentifier | undefined;
}

/**
 * Audio streaming metadata.
 */
export interface AudioMetadata {
  kind: 'AudioMetadata',
  /** Audio streaming subscription id.*/
  subscriptionId: string;
  /** The format used to encode the audio. Currently, only "pcm" (Pulse Code Modulation) is supported.*/
  encoding: string;
  /** The number of samples per second in the audio. Supported values are 16kHz or 24kHz.*/
  sampleRate: number;
  /** Specifies the number of audio channels in the audio configuration.
          Currently, only "mono" (single channel) is supported.*/
  channels: Channel;
}

/**
 * Streaming media kind.
 */
export type MediaKind = "audioData" | "stopAudio";

// Out streaming Stop Audio Data
export interface StopAudio {}

/**
 * Text in the phrase.
 */
export interface WordData {
  /** Text in the phrase.*/
  text: string;
  /** The word's position within the phrase.*/
  offsetInTicks: number;
  /** Duration in ticks. 1 tick = 100 nanoseconds.*/
  durationInTicks: number;
}

/**
 * Metadata for Transcription Streaming.
 */
export interface TranscriptionMetadata {
  kind: 'TranscriptionMetadata',
  /** Transcription Subscription Id.*/
  subscriptionId: string;
  /** The target locale in which the translated text needs to be.*/
  locale: string;
  /** call connection Id.*/
  callConnectionId: string;
  /** correlation Id.*/
  correlationId: string;
  /** The custom speech recognition model endpoint id.*/
  speechRecognitionModelEndpointId: string;
}

/**
 * Streaming Transcription.
 */
export interface TranscriptionData {
  kind: 'TranscriptionData',
  /** The display form of the recognized word.*/
  text: string;
  /** The format of text.*/
  format: string;
  /** Confidence of recognition of the whole phrase, from 0.0 (no confidence) to 1.0 (full confidence). */
  confidence: number;
  /** The position of this payload. 1 tick = 100 nanoseconds. */
  offsetInTicks: number;
  /** Duration in ticks. 1 tick = 100 nanoseconds. */
  durationInTicks: number;
  /** The result for each word of the phrase. */
  words: WordData[];
  /** The identified speaker based on participant raw ID. */
  participant: CommunicationIdentifier;
  /** State of the result of transcription. */
  resultState: TranscriptionResultState;
}

/**
 * Dtmf streaming data.
 */
export interface DtmfData {
  kind: 'DtmfData',
  /** A unique identifier for the media subscription.*/
  data: string;
}

// StreamingDataResult type  | TranscriptionMetadata| TranscriptionData| AudioData| AudioMetadata;
export type StreamingDataResult =
  | TranscriptionMetadata
  | TranscriptionData
  | AudioData
  | AudioMetadata
  | DtmfData;

// Enum for different kinds of streaming data in a call automation system
export type StreamingDataKind =
  | "AudioData"
  | "AudioMetadata"
  | "TranscriptionData"
  | "TranscriptionMetadata"
  | "DtmfData";

// Enum for channel.
export enum Channel {
  Unknown = 0,
  Mono = 1,
}

/**
 * OutboundStreamingAudioData interface for outbound audio streaming payload.
 */
export interface OutStreamingData {
  /** Out streaming data kind ex. StopAudio, AudioData*/
  kind: MediaKind;
  /** Out streaming Audio Data */
  audioData?: AudioData;
  /** Out streaming Stop Audio Data */
  stopAudio?: StopAudio;
}

/**
 * Helper function to create outbound audio data payload.
 */
export function createOutboundAudioData(data: string): string {
  const outStreamingData: OutStreamingData = {
    kind: "audioData",
    audioData: {
      data: data,
      timestamp: undefined,
      participant: undefined,
      isSilent: false,
    },
    stopAudio: {},
  };

  const json = JSON.stringify(outStreamingData);
  return json;
}

/**
 * Helper function to create outbound stop audio data payload.
 */
export function createOutboundStopAudioData(): string {
  const outStreamingData: OutStreamingData = {
    kind: "stopAudio",
    audioData: undefined,
    stopAudio: {},
  };
  const json = JSON.stringify(outStreamingData);
  return json;
}
