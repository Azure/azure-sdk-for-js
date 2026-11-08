// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @internal */
export interface NativeReadProfile {
  dispatchMs: number;
  resolveContainerMs: number;
  driverOperationMs: number;
  responsePreparationMs: number;
  completionMs: number;
  elapsedMs: number;
}

/** @internal */
export interface RustReadProfile {
  nativeCallStartMs?: number;
  nativeCallEndMs?: number;
  decodedAtMs?: number;
  parsedAtMs?: number;
  responseReadyAtMs?: number;
  adapterEndMs?: number;
  native?: NativeReadProfile;
}

/** @internal */
export interface NativeReadDiagnostics {
  requestCount: number;
  retainedRequestCount: number;
  requests: {
    pipeline: "metadata" | "data_plane";
    transport: "gateway" | "gateway_v2";
    statusCode: number;
    subStatusCode?: number;
  }[];
}

/** @internal */
export interface NativeReadResponse {
  statusCode: number;
  subStatusCode?: number;
  body?: Uint8Array;
  requestCharge?: number;
  activityId?: string;
  etag?: string;
  sessionToken?: string;
  retryAfterMs?: string;
  diagnostics: NativeReadDiagnostics;
  profile?: NativeReadProfile | null;
}

/** @internal */
export interface NativeReadClient {
  readItem(
    database: string,
    container: string,
    itemId: string,
    partitionKey: string,
    profile?: boolean,
  ): Promise<NativeReadResponse>;
  close(): void;
}

/** @internal */
export type NativeReadClientFactory = (endpoint: string, key: string) => Promise<NativeReadClient>;
