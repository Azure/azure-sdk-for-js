// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosClientOptions } from "../CosmosClientOptions.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import type { PartitionKeyInternal } from "../documents/index.js";
import { Constants } from "../common/constants.js";
import type { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders.js";
import { ErrorResponse } from "../request/ErrorResponse.js";
import type { RequestOptions } from "../request/RequestOptions.js";
import type { Response } from "../request/Response.js";
import { getNativeReadClientFactory } from "../utils/nativeReadClient.js";
import { getExperimentalReadProfiling } from "../utils/envUtils.js";
import type {
  NativeReadClient,
  NativeReadClientFactory,
  NativeReadDiagnostics,
  NativeReadResponse,
  RustReadProfile,
} from "./NativeReadClient.js";

function configurationError(options: CosmosClientOptions): string | undefined {
  const allowed = new Set([
    "endpoint",
    "key",
    "connectionString",
    "connectionPolicy",
    "diagnosticLevel",
  ]);
  for (const name of Object.keys(options)) {
    if (!allowed.has(name)) return `client option '${name}'`;
  }
  for (const [name, value] of Object.entries(options.connectionPolicy ?? {})) {
    if (name !== "enableBackgroundEndpointRefreshing" || value !== false) {
      return `connection policy '${name}'`;
    }
  }
  if (!options.key?.trim()) return "authentication other than an account key";
  return undefined;
}

function validateDiagnostics(value: NativeReadDiagnostics): void {
  if (
    !value ||
    !Number.isInteger(value.requestCount) ||
    !Number.isInteger(value.retainedRequestCount) ||
    value.requestCount < 0 ||
    !Array.isArray(value.requests) ||
    value.retainedRequestCount !== value.requests.length ||
    value.requestCount < value.retainedRequestCount ||
    value.requests.some(
      (request) =>
        (request.pipeline !== "metadata" && request.pipeline !== "data_plane") ||
        (request.transport !== "gateway" && request.transport !== "gateway_v2") ||
        !Number.isInteger(request.statusCode),
    )
  ) {
    throw new Error("The Rust binding returned invalid request diagnostics.");
  }
}

const responseHeaderFields = [
  [Constants.HttpHeaders.RequestCharge, "requestCharge"],
  [Constants.HttpHeaders.ActivityId, "activityId"],
  [Constants.HttpHeaders.ETag, "etag"],
  [Constants.HttpHeaders.SessionToken, "sessionToken"],
  [Constants.HttpHeaders.RetryAfterInMilliseconds, "retryAfterMs"],
] as const;

function responseHeaders(response: NativeReadResponse): CosmosHeaders {
  const headers: CosmosHeaders = {};
  for (const [name, field] of responseHeaderFields) {
    const value = response[field];
    if (value !== undefined && value !== null) headers[name] = String(value);
  }
  return headers;
}

function isNativeFailure(error: unknown): error is Error & {
  statusCode: number;
  subStatusCode?: number;
  stage: string;
  fromWire: boolean;
  response?: NativeReadResponse;
  diagnostics?: NativeReadDiagnostics;
} {
  return (
    error instanceof Error &&
    "statusCode" in error &&
    Number.isInteger(error.statusCode) &&
    "stage" in error &&
    (error.stage === "readItem" || error.stage === "resolveContainer") &&
    "fromWire" in error &&
    typeof error.fromWire === "boolean"
  );
}

/** @internal */
export class RustReadAdapter {
  private readonly endpoint: string;
  private readonly key: string;
  private readonly unsupportedConfiguration?: string;
  private readonly factory: NativeReadClientFactory;
  private readonly decoder = new TextDecoder("utf-8", { fatal: true });
  private readonly profileReads: boolean;
  private initialization?: Promise<NativeReadClient>;
  private native?: NativeReadClient;
  private disposed = false;
  private activeReads = 0;

  constructor(options: CosmosClientOptions) {
    // Capture caller configuration before CosmosClient adds JavaScript defaults.
    this.endpoint = options.endpoint;
    this.key = options.key;
    this.unsupportedConfiguration = configurationError(options);
    this.factory = getNativeReadClientFactory();
    this.profileReads = getExperimentalReadProfiling();
  }

  public async read<T>(
    database: string,
    container: string,
    itemId: string,
    partitionKey: PartitionKeyInternal,
    options: RequestOptions,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<Response<T>> {
    const profile: RustReadProfile | undefined = this.profileReads ? {} : undefined;
    const started = profile ? performance.now() : 0;
    diagnosticNode.markRustRead(undefined, profile);
    if (this.disposed) throw new Error("The experimental Rust read client is disposed.");
    if (this.unsupportedConfiguration) {
      throw new Error(`Experimental Rust reads do not support ${this.unsupportedConfiguration}.`);
    }
    if (Reflect.ownKeys(options).length !== 0) {
      throw new Error("Experimental Rust reads do not support request options yet.");
    }
    if (
      !Array.isArray(partitionKey) ||
      partitionKey.length !== 1 ||
      typeof partitionKey[0] !== "string"
    ) {
      throw new Error("Experimental Rust reads require an explicit single string partition key.");
    }
    if (!database || !container || !itemId) {
      throw new Error("Experimental Rust reads require non-empty resource identifiers.");
    }
    this.activeReads++;
    try {
      let native = this.native;
      if (!native) {
        this.initialization ??= this.factory(this.endpoint, this.key).then((initialized) => {
          this.native = initialized;
          return initialized;
        });
        native = await this.initialization;
      }
      let result: NativeReadResponse;
      try {
        if (profile) profile.nativeCallStartMs = performance.now() - started;
        try {
          result = profile
            ? await native.readItem(database, container, itemId, partitionKey[0], true)
            : await native.readItem(database, container, itemId, partitionKey[0]);
        } finally {
          if (profile) profile.nativeCallEndMs = performance.now() - started;
        }
      } catch (error: unknown) {
        if (!isNativeFailure(error)) throw error;
        const diagnostics = error.diagnostics ?? error.response?.diagnostics;
        if (diagnostics) {
          validateDiagnostics(diagnostics);
          diagnosticNode.markRustRead(diagnostics, profile);
        }
        const headers = error.response ? responseHeaders(error.response) : {};
        if (error.statusCode === 404 && error.fromWire) {
          return {
            result: undefined,
            code: 404,
            substatus: error.subStatusCode,
            headers,
          };
        }
        const converted = new ErrorResponse(error.message);
        converted.cause = error;
        converted.code = error.statusCode;
        converted.substatus = error.subStatusCode;
        converted.headers = headers;
        converted.activityId = error.response?.activityId;
        converted.requestCharge = error.response?.requestCharge;
        const retryAfter = error.response?.retryAfterMs;
        if (retryAfter !== undefined) {
          const milliseconds = Number(retryAfter);
          if (!Number.isFinite(milliseconds) || milliseconds < 0) {
            throw new Error("The Rust binding returned an invalid retry-after value.", {
              cause: error,
            });
          }
          converted.retryAfterInMs = milliseconds;
          converted.retryAfterInMilliseconds = milliseconds;
        }
        throw converted;
      }
      validateDiagnostics(result.diagnostics);
      diagnosticNode.markRustRead(result.diagnostics, profile);
      if (profile) {
        const timing = result.profile;
        if (
          !timing ||
          [
            timing.dispatchMs,
            timing.resolveContainerMs,
            timing.driverOperationMs,
            timing.responsePreparationMs,
            timing.completionMs,
            timing.elapsedMs,
          ].some((value) => !Number.isFinite(value) || value < 0) ||
          Math.abs(
            timing.dispatchMs +
              timing.resolveContainerMs +
              timing.driverOperationMs +
              timing.responsePreparationMs +
              timing.completionMs -
              timing.elapsedMs,
          ) > 1e-6
        ) {
          throw new Error("The Rust binding returned missing or invalid read profiling.");
        }
        profile.native = timing;
      } else if (result.profile !== undefined && result.profile !== null) {
        throw new Error("The Rust binding returned profiling for an unprofiled read.");
      }
      if (result.statusCode !== 200 || !(result.body instanceof Uint8Array)) {
        throw new Error("The Rust binding returned an invalid successful item response.");
      }
      const text = this.decoder.decode(result.body);
      if (profile) profile.decodedAtMs = performance.now() - started;
      const resource: unknown = JSON.parse(text);
      if (profile) profile.parsedAtMs = performance.now() - started;
      if (
        resource === null ||
        typeof resource !== "object" ||
        Array.isArray(resource) ||
        !("id" in resource) ||
        resource.id !== itemId
      ) {
        throw new Error("The Rust binding returned an invalid item body.");
      }
      if (
        typeof result.requestCharge !== "number" ||
        !Number.isFinite(result.requestCharge) ||
        result.requestCharge < 0
      ) {
        throw new Error("The Rust binding returned an invalid request charge.");
      }
      const headers = responseHeaders(result);
      if (profile) profile.responseReadyAtMs = performance.now() - started;
      return {
        result: resource as T,
        headers,
        code: result.statusCode,
        substatus: result.subStatusCode,
      };
    } finally {
      this.activeReads--;
      this.closeIfIdle();
      if (profile) profile.adapterEndMs = performance.now() - started;
    }
  }

  public dispose(): void {
    this.disposed = true;
    this.closeIfIdle();
  }

  private closeIfIdle(): void {
    if (this.disposed && this.activeReads === 0 && this.native) {
      const native = this.native;
      this.native = undefined;
      native.close();
    }
  }
}
