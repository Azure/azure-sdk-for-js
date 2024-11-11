// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CommunicationIdentifier } from "@azure/communication-common";

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
  Kind: MediaKind;
  /** Out streaming Audio Data */
  AudioData?: AudioData;
  /** Out streaming Stop Audio Data */
  StopAudio?: StopAudio;
}
