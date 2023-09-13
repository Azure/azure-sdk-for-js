// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export type AudioResultFormat =
  /** This format will return an JSON structure containing a single \"text\" with the transcription. */
  | "json"
  /** This format will return an JSON structure containing an enriched structure with the transcription. */
  | "verbose_json"
  /** This will make the response return the transcription as plain/text. */
  | "text"
  /** The transcription will be provided in SRT format (SubRip Text) in the form of plain/text. */
  | "srt"
  /** The transcription will be provided in VTT format (Web Video Text Tracks) in the form of plain/text. */
  | "vtt";

/** Lorem ipsum */
export interface AudioResultSimpleJson {
  /** Transcribed text. */
  text: string;
}

/** Transcription response. */
export interface AudioResultVerboseJson extends AudioResultSimpleJson {
  /** Audio transcription task. */
  task: AudioTranscriptionTask;
  /** Language detected in the source audio file. */
  language: string;
  /** Duration. */
  duration: string;
  /** Segments. */
  segments: AudioSegment[];
}

/** Audio transcription task type */
/** "transcribe", "translate" */
export type AudioTranscriptionTask = string;

/** Transcription segment. */
export interface AudioSegment {
  /** Segment identifier. */
  id: number;
  /** Segment start offset. */
  start: number;
  /** Segment end offset. */
  end: number;
  /** Segment text. */
  text: string;
  /** Temperature. */
  temperature: number;
  /** Average log probability. */
  averageLogProb: number;
  /** Compression ratio. */
  compressionRatio: number;
  /** Probability of 'no speech'. */
  noSpeechProb: number;
  /** Tokens in this segment */
  tokens: number[];
  /** TODO */
  seek: number;
}

export interface GetAudioTranscriptionOptions extends OperationOptions {
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /** The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency. */
  language?: string;
  /** (non-Azure) ID of the model to use. Only whisper-1 is currently available. */
  model?: string;
}

export interface GetAudioTranslationOptions extends OperationOptions {
  /** An optional text to guide the model's style or continue a previous audio segment. The prompt should match the audio language. */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /** (non-Azure) ID of the model to use. Only whisper-1 is currently available. */
  model?: string;
}

/** The type of the result of the transcription based on the requested response format */
export type AudioResult<ResponseFormat extends AudioResultFormat> = {
  json: AudioResultSimpleJson;
  verbose_json: AudioResultVerboseJson;
  vtt: string;
  srt: string;
  text: string;
}[ResponseFormat];
