// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { gunzipSync } from "node:zlib";
import nock from "nock";
import type { Scope } from "nock";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";
import {
  EU_CONNECTION_STRING,
  NON_EU_CONNECTION_STRING,
} from "../../src/export/statsbeat/types.js";
import { successfulBreezeResponse } from "./breezeTestUtils.js";

export type CapturedEnvelope = Envelope & {
  iKey?: string;
};

export interface CapturedTelemetryRequest {
  endpoint: string;
  envelopes: CapturedEnvelope[];
}

export interface TelemetryCapture {
  endpoint: string;
  requests: CapturedTelemetryRequest[];
  scope: Scope;
  envelopes(): CapturedEnvelope[];
}

export interface StatsbeatDestinations {
  eu: TelemetryCapture;
  row: TelemetryCapture;
}

export function getConnectionStringParts(connectionString: string): {
  endpoint: string;
  instrumentationKey: string;
} {
  const endpoint = /(?:^|;)IngestionEndpoint=([^;]+)/i.exec(connectionString)?.[1];
  const instrumentationKey = /(?:^|;)InstrumentationKey=([^;]+)/i.exec(connectionString)?.[1];
  if (!endpoint || !instrumentationKey) {
    throw new Error("Invalid test connection string");
  }
  return { endpoint, instrumentationKey };
}

export const EU_STATSBEAT = getConnectionStringParts(EU_CONNECTION_STRING);
export const ROW_STATSBEAT = getConnectionStringParts(NON_EU_CONNECTION_STRING);

export function decodeTelemetryBody(body: unknown): CapturedEnvelope[] {
  if (Array.isArray(body)) {
    return body as CapturedEnvelope[];
  }

  let text: string;
  if (Buffer.isBuffer(body)) {
    const decoded =
      body.length >= 2 && body[0] === 0x1f && body[1] === 0x8b ? gunzipSync(body) : body;
    text = decoded.toString("utf8");
  } else if (typeof body === "string") {
    text = body;
  } else {
    throw new Error(`Unexpected telemetry body type: ${typeof body}`);
  }

  const parsed = JSON.parse(text) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error("Expected telemetry body to contain an array");
  }
  return parsed as CapturedEnvelope[];
}

export function captureTelemetry(endpoint: string): TelemetryCapture {
  const requests: CapturedTelemetryRequest[] = [];
  const scope = nock(endpoint)
    .post("/v2.1/track", (body: unknown) => {
      requests.push({ endpoint, envelopes: decodeTelemetryBody(body) });
      return true;
    })
    .reply(200, JSON.stringify(successfulBreezeResponse(100)))
    .persist();

  return {
    endpoint,
    requests,
    scope,
    envelopes: () => requests.flatMap((request) => request.envelopes),
  };
}

export function captureStatsbeatDestinations(): StatsbeatDestinations {
  return {
    eu: captureTelemetry(EU_STATSBEAT.endpoint),
    row: captureTelemetry(ROW_STATSBEAT.endpoint),
  };
}

export function redirectTelemetry(
  endpoint: string,
  statusCode: 307 | 308,
  location?: string,
): Scope {
  const headers = location ? { Location: location } : undefined;
  return nock(endpoint).post("/v2.1/track").reply(statusCode, "", headers);
}
