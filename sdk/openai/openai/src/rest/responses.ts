// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  AudioTranscriptionOutput,
  AudioTranslationOutput,
  CompletionsOutput,
  ChatCompletionsOutput,
  ImageGenerationsOutput,
  EmbeddingsOutput,
} from "./outputModels.js";

export interface GetAudioTranscriptionAsPlainText200Headers {
  /** The content type 'text/plain' for the audio text response. */
  "content-type": "text/plain";
}

/** The request has succeeded. */
export interface GetAudioTranscriptionAsPlainText200Response
  extends HttpResponse {
  status: "200";
  body: string;
  headers: RawHttpHeaders & GetAudioTranscriptionAsPlainText200Headers;
}

export interface GetAudioTranscriptionAsPlainTextDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranscriptionAsPlainTextDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranscriptionAsPlainTextDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranscriptionAsResponseObject200Response
  extends HttpResponse {
  status: "200";
  body: AudioTranscriptionOutput;
}

export interface GetAudioTranscriptionAsResponseObjectDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranscriptionAsResponseObjectDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranscriptionAsResponseObjectDefaultHeaders;
}

export interface GetAudioTranslationAsPlainText200Headers {
  /** The content type 'text/plain' for the audio text response. */
  "content-type": "text/plain";
}

/** The request has succeeded. */
export interface GetAudioTranslationAsPlainText200Response
  extends HttpResponse {
  status: "200";
  body: string;
  headers: RawHttpHeaders & GetAudioTranslationAsPlainText200Headers;
}

export interface GetAudioTranslationAsPlainTextDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranslationAsPlainTextDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranslationAsPlainTextDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranslationAsResponseObject200Response
  extends HttpResponse {
  status: "200";
  body: AudioTranslationOutput;
}

export interface GetAudioTranslationAsResponseObjectDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranslationAsResponseObjectDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranslationAsResponseObjectDefaultHeaders;
}

/** The request has succeeded. */
export interface GetCompletions200Response extends HttpResponse {
  status: "200";
  body: CompletionsOutput;
}

export interface GetCompletionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCompletionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCompletionsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetChatCompletions200Response extends HttpResponse {
  status: "200";
  body: ChatCompletionsOutput;
}

export interface GetChatCompletionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetChatCompletionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetChatCompletionsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetImageGenerations200Response extends HttpResponse {
  status: "200";
  body: ImageGenerationsOutput;
}

export interface GetImageGenerationsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetImageGenerationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetImageGenerationsDefaultHeaders;
}

export interface GenerateSpeechFromText200Headers {
  /** The content type of the response. Always application/octet-stream for audio/speech responses. */
  "content-type": "application/octet-stream";
}

/** The request has succeeded. */
export interface GenerateSpeechFromText200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GenerateSpeechFromText200Headers;
}

export interface GenerateSpeechFromTextDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GenerateSpeechFromTextDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GenerateSpeechFromTextDefaultHeaders;
}

/** The request has succeeded. */
export interface GetEmbeddings200Response extends HttpResponse {
  status: "200";
  body: EmbeddingsOutput;
}

export interface GetEmbeddingsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetEmbeddingsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetEmbeddingsDefaultHeaders;
}
