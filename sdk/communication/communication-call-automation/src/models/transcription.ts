// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CommunicationIdentifier } from "@azure/communication-common";

/**
 * The status of the result of transcription.
 */
export enum ResultStatus {
  /** Intermediate result.*/
  Intermediate = "intermediate",
  /** Final result.*/
  Final = "final",
}

/**
 * The format of transcription text.
 */
export enum TextFormat {
  /** Formatted recognize text with punctuations.*/
  Disply = "display",
}

/**
 * Text in the phrase.
 */
export interface WordData {
  /** Text in the phrase.*/
  text: string;
  /** The word's position within the phrase.*/
  offset: number;
  /** Duration in ticks. 1 tick = 100 nanoseconds.*/
  duration: number;
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
  /** The position of this payload. */
  offset: number;
  /** Duration in ticks. 1 tick = 100 nanoseconds. */
  duration: number;
  /** The result for each word of the phrase. */
  words: WordData[];
  /** The identified speaker based on participant raw ID. */
  participant: CommunicationIdentifier;
  /** Status of the result of transcription. */
  resultStatus: ResultStatus;
}
