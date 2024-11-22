// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier } from "@azure/communication-common";

import { TranscriptionResultState } from "../generated/src";

/**
 * Audio streaming data.
 */
export interface AudioData {
  /** Audio streaming data.*/
  data: string;
  /** Audio streaming timestamp.*/
  timestamp?: Date;
  /** Audio streaming is silent.*/
  isSilent?: boolean;
  /** The identified speaker based on participant raw ID. */
  participant?: CommunicationIdentifier | undefined;
}

/**
 * Audio streaming metadata.
 */
export interface AudioMetadata {
  /** Audio streaming subscription id.*/
  subscriptionId: string;
  /** Audio streaming encoding.*/
  encoding: string;
  /** Audio streaming sample rate.*/
  sampleRate: number;
  /** Audio streaming channels*/
  channels: number;
  /** Audio streaming length.*/
  length: number;
}

export enum MediaKind {
  /** Audio data.*/
  AudioData = "audioData",
  /** stop audio data*/
  StopAudio = "stopAudio",
}

export interface StopAudio {}

export interface OutStreamingData {
  /** Out streaming data kind ex. StopAudio, AudioData*/
  kind: MediaKind;
  /** Out streaming Audio Data */
  audioData?: AudioData;
  /** Out streaming Stop Audio Data */
  stopAudio?: StopAudio;
}

/**
 * The format of transcription text.
 */
export enum TextFormat {
  /** Formatted recognize text with punctuations.*/
  Display = "display",
}

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
  /** Transcription Subscription Id.*/
  subscriptionId: string;
  /** The target locale in which the translated text needs to be.*/
  locale: string;
  /** call connection Id.*/
  callConnectionId: string;
  /** correlation Id.*/
  correlationId: string;
}

/**
 * Streaming Transcription.
 */
export interface TranscriptionData {
  /** The display form of the recognized word.*/
  text: string;
  /** The format of text.*/
  format: TextFormat;
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

// StreamingDataResult type  | TranscriptionMetadata| TranscriptionData| AudioData| AudioMetadata;
export type StreamingDataResult =
  | TranscriptionMetadata
  | TranscriptionData
  | AudioData
  | AudioMetadata;

// Enum for different kinds of streaming data in a call automation system
export enum StreamingDataKind {
  // Audio data type
  AudioData = "AudioData",
  // Audio metadata type
  AudioMetadata = "AudioMetadata",
  // Transcription data type
  TranscriptionData = "TranscriptionData",
  // Transcription metadata type
  TranscriptionMetadata = "TranscriptionMetadata",
}
