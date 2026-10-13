// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Attributes } from "@opentelemetry/api";

export interface BrowserVoiceInput {
  endpoint: string;
  agentName: string;
  token: string;
  expiresOnTimestamp: number;
  contentRecording: boolean;
  output: "audio" | "text";
  tool: boolean;
  audio?: number[];
}

export interface BrowserVoiceSpan {
  name: string;
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  kind: number;
  scope: { name: string; version?: string };
  durationInMs: number;
  statusCode: number;
  attributes: Attributes;
  events: { name: string; timestamp: string; attributes?: Attributes }[];
}

export interface BrowserVoiceResult {
  completed: boolean;
  nativeWebSocket: boolean;
  sentAudioBytes: number;
  receivedAudioBytes: number;
  receivedTextCharacters: number;
  toolRequests: number;
  serverEventCounts: Record<string, number>;
  failure?: { type: string };
  spans: BrowserVoiceSpan[];
}

declare global {
  function runVoiceTelemetryTest(input: BrowserVoiceInput): Promise<BrowserVoiceResult>;
}
