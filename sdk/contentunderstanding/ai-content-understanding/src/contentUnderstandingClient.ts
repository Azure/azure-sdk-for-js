// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";
import type {
  ContentUnderstandingContext,
  ContentUnderstandingClientOptionalParams,
} from "./api/index.js";
import { createContentUnderstanding } from "./api/index.js";
import {
  updateDefaults,
  updateAnalyzer,
  listAnalyzers,
  grantCopyAuthorization,
  getResultFile,
  // CUSTOMIZATION: EMITTER-FIX: getResult and getOperationStatus are marked as @@access(Access.internal)
  // in TypeSpec but the JS emitter does not respect this. Keeping imports commented for reference.
  // getResult,
  // getOperationStatus,
  getDefaults,
  getAnalyzer,
  deleteResult,
  deleteAnalyzer,
  createAnalyzer,
  copyAnalyzer,
  _analyzeSend,
  _analyzeDeserialize,
  _analyzeBinarySend,
  _analyzeBinaryDeserialize,
  _analyzeInlineSend,
  _analyzeInlineDeserialize,
  _analyzeBinaryInlineSend,
  _analyzeBinaryInlineDeserialize,
} from "./api/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import { RestError } from "@azure/core-rest-pipeline";
import type {
  UpdateDefaultsOptionalParams,
  UpdateAnalyzerOptionalParams,
  ListAnalyzersOptionalParams,
  GrantCopyAuthorizationOptionalParams,
  GetResultFileOptionalParams,
  // CUSTOMIZATION: EMITTER-FIX: Types for internal methods kept commented for reference.
  // GetResultOptionalParams,
  // GetOperationStatusOptionalParams,
  GetDefaultsOptionalParams,
  GetAnalyzerOptionalParams,
  DeleteResultOptionalParams,
  DeleteAnalyzerOptionalParams,
  CreateAnalyzerOptionalParams,
  CopyAnalyzerOptionalParams,
} from "./api/options.js";
import type { OperationOptions } from "@azure-rest/core-client";
import type {
  AnalysisResult,
  // CUSTOMIZATION: EMITTER-FIX: Types for internal methods kept commented for reference.
  // ContentAnalyzerAnalyzeOperationStatus,
  // ContentAnalyzerOperationStatus,
  ContentAnalyzer,
  ContentUnderstandingDefaults,
  CopyAuthorization,
  AnalysisInput,
  UsageDetails,
} from "./models/models.js";
import { usageDetailsDeserializer } from "./models/models.js";
import type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { PollerLike, OperationState } from "@azure/core-lro";
import type { Pipeline } from "@azure/core-rest-pipeline";
import { logger } from "./logger.js";

export type { ContentUnderstandingClientOptionalParams } from "./api/contentUnderstandingContext.js";

import type { ProcessingLocation } from "./models/models.js";
import { KnownVersions } from "./models/index.js";

// CUSTOMIZATION: SDK-IMPROVEMENT: Custom option types that exclude `stringEncoding` from the public API.
// `stringEncoding` is always 'utf16' internally to ensure span offsets align with JavaScript's UTF-16 string operations.
// Defined as explicit interfaces (rather than Omit<> aliases) to keep standard type names
// (AnalyzeOptionalParams, AnalyzeBinaryOptionalParams) and avoid API Extractor warnings.

/** Optional parameters for the analyze operation. */
export interface AnalyzeOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Override default mapping of model names to deployments. */
  modelDeployments?: Record<string, string>;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
  /** Overrides the analyzer's allowInputTruncation setting for this request. */
  allowInputTruncation?: boolean;
}

/** Optional parameters for the analyzeBinary operation. */
export interface AnalyzeBinaryOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * MIME type of the binary input (for example `application/pdf`, `image/jpeg`, `audio/mpeg`).
   * Defaults to `application/octet-stream` when omitted; the service infers the payload
   * format when the default is used.
   */
  contentType?: string;
  /** Range of the input to analyze (ex. `1-3,5,9-`). Document content uses 1-based page numbers, while audio visual content uses integer milliseconds. */
  contentRange?: string;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
  /** Overrides the analyzer's allowInputTruncation setting for this request. */
  allowInputTruncation?: boolean;
}

// CUSTOMIZATION: SDK-IMPROVEMENT: Public option types for the inline analyze operations.
// Same shape as the LRO variants above, minus `updateIntervalInMs` (inline is synchronous — no polling).
// `stringEncoding` is intentionally omitted from the public API; the client always injects "utf16".

/** Optional parameters for the analyzeInline operation. */
export interface AnalyzeInlineOptionalParams extends OperationOptions {
  /** Override default mapping of model names to deployments. */
  modelDeployments?: Record<string, string>;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
  /** Overrides the analyzer's allowInputTruncation setting for this request. */
  allowInputTruncation?: boolean;
}

/** Optional parameters for the analyzeBinaryInline operation. */
export interface AnalyzeBinaryInlineOptionalParams extends OperationOptions {
  /**
   * MIME type of the binary input (for example `application/pdf`, `image/jpeg`, `audio/mpeg`).
   * Defaults to `application/octet-stream` when omitted; the service infers the payload
   * format when the default is used.
   */
  contentType?: string;
  /** Range of the input to analyze (ex. `1-3,5,9-`). Document content uses 1-based page numbers, while audio visual content uses integer milliseconds. */
  contentRange?: string;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
  /** Overrides the analyzer's allowInputTruncation setting for this input. */
  allowInputTruncation?: boolean;
}

// CUSTOMIZATION: SDK-IMPROVEMENT: Custom operation state and poller types.
// AnalysisOperationState extends the standard OperationState with operation metadata
// (operationId for result retrieval, usage for billing/metering details).
// This follows the same pattern as Form Recognizer's DocumentAnalysisPollOperationState
// and Storage Blob's BlobBeginCopyFromUrlPollState.

/** Metadata from an analysis operation, available after the operation completes. */
export interface AnalysisOperationMetadata {
  /** Usage details of the analyze operation. */
  readonly usage?: UsageDetails;
  /** The operation ID, used with `getResultFile` and `deleteResult`. */
  readonly operationId?: string;
}

/** The state of an analysis operation, extending the standard OperationState with analysis metadata. */
export interface AnalysisOperationState
  extends OperationState<AnalysisResult>, AnalysisOperationMetadata {}

/** A poller for an analysis operation. */
export interface AnalysisResultPoller extends PollerLike<AnalysisOperationState, AnalysisResult> {
  /**
   * The operation ID.
   * @deprecated Use `operationState?.operationId` instead.
   */
  readonly operationId?: string;
}

export class ContentUnderstandingClient {
  private _client: ContentUnderstandingContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  // CUSTOMIZATION: EMITTER-FIX: Renamed 'endpointParam' to 'endpoint' for clarity and consistency
  // with the rest of the SDK. The emitter generates 'endpointParam' but 'endpoint' is the
  // standard name across other Azure SDK client constructors.
  // CUSTOMIZATION: DEFAULT-API-VERSION: Default the client context's `apiVersion` to the
  // preview version. The generated `operations.ts` also falls back to the same value on the
  // wire, but explicitly setting it on the context means `client._client.apiVersion` reflects
  // the actual version in effect at construction time — useful for tests, logging, and
  // per-request version routing.
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: ContentUnderstandingClientOptionalParams = {},
  ) {
    this._client = createContentUnderstanding(endpoint, credential, {
      ...options,
      apiVersion: options?.apiVersion ?? KnownVersions.V20260601Preview,
    });
    this.pipeline = this._client.pipeline;
  }

  /** Update default settings for this Content Understanding resource. */
  updateDefaults(
    options: UpdateDefaultsOptionalParams = { requestOptions: {} },
  ): Promise<ContentUnderstandingDefaults> {
    return updateDefaults(this._client, options);
  }

  /** Update analyzer properties. */
  updateAnalyzer(
    analyzerId: string,
    resource: ContentAnalyzer,
    options: UpdateAnalyzerOptionalParams = { requestOptions: {} },
  ): Promise<ContentAnalyzer> {
    return updateAnalyzer(this._client, analyzerId, resource, options);
  }

  /** List analyzers. */
  listAnalyzers(
    options: ListAnalyzersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ContentAnalyzer> {
    return listAnalyzers(this._client, options);
  }

  /** Get authorization for copying this analyzer to another location. */
  grantCopyAuthorization(
    analyzerId: string,
    targetAzureResourceId: string,
    options: GrantCopyAuthorizationOptionalParams = { requestOptions: {} },
  ): Promise<CopyAuthorization> {
    return grantCopyAuthorization(this._client, analyzerId, targetAzureResourceId, options);
  }

  /** Get a file associated with the result of an analysis operation. */
  getResultFile(
    operationId: string,
    path: string,
    options: GetResultFileOptionalParams = { requestOptions: {} },
  ): Promise<Uint8Array> {
    return getResultFile(this._client, operationId, path, options);
  }

  // CUSTOMIZATION: EMITTER-FIX: Commented out `getResult` method - it is marked as
  // @@access(Access.internal) in TypeSpec, but the JS emitter does not respect this decorator.
  // The poller handles result retrieval internally.
  // /** Get the result of an analysis operation. */
  // getResult(
  //   operationId: string,
  //   options: GetResultOptionalParams = { requestOptions: {} },
  // ): Promise<ContentAnalyzerAnalyzeOperationStatus> {
  //   return getResult(this._client, operationId, options);
  // }

  // CUSTOMIZATION: EMITTER-FIX: Commented out `getOperationStatus` method - it is marked as
  // @@access(Access.internal) in TypeSpec, but the JS emitter does not respect this decorator.
  // The poller handles operation status internally.
  // /** Get the status of an analyzer creation operation. */
  // getOperationStatus(
  //   analyzerId: string,
  //   operationId: string,
  //   options: GetOperationStatusOptionalParams = { requestOptions: {} },
  // ): Promise<ContentAnalyzerOperationStatus> {
  //   return getOperationStatus(this._client, analyzerId, operationId, options);
  // }

  /** Return default settings for this Content Understanding resource. */
  getDefaults(
    options: GetDefaultsOptionalParams = { requestOptions: {} },
  ): Promise<ContentUnderstandingDefaults> {
    return getDefaults(this._client, options);
  }

  /** Get analyzer properties. */
  getAnalyzer(
    analyzerId: string,
    options: GetAnalyzerOptionalParams = { requestOptions: {} },
  ): Promise<ContentAnalyzer> {
    return getAnalyzer(this._client, analyzerId, options);
  }

  /** Mark the result of an analysis operation for deletion. */
  deleteResult(
    operationId: string,
    options: DeleteResultOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteResult(this._client, operationId, options);
  }

  /** Delete analyzer. */
  deleteAnalyzer(
    analyzerId: string,
    options: DeleteAnalyzerOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteAnalyzer(this._client, analyzerId, options);
  }

  /** Create a new analyzer asynchronously. */
  createAnalyzer(
    analyzerId: string,
    resource: ContentAnalyzer,
    options: CreateAnalyzerOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<ContentAnalyzer>, ContentAnalyzer> {
    return createAnalyzer(this._client, analyzerId, resource, options);
  }

  /** Create a copy of the source analyzer to the current location. */
  copyAnalyzer(
    analyzerId: string,
    sourceAnalyzerId: string,
    options: CopyAnalyzerOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<ContentAnalyzer>, ContentAnalyzer> {
    return copyAnalyzer(this._client, analyzerId, sourceAnalyzerId, options);
  }

  // CUSTOMIZATION: SDK-IMPROVEMENT: Redesigned `analyzeBinary` public shape.
  // Prior stable design was `(analyzerId, binaryInput, contentType?, options?)`, which
  // forced callers to pass `undefined` positionally just to reach the options bag and was
  // inconsistent with `analyze` / `analyzeInline` / `analyzeBinaryInline`. The preferred
  // shape is now `(analyzerId, binaryInput, options?)` with `contentType?` inside
  // `AnalyzeBinaryOptionalParams`, matching the other three convenience methods.
  //
  // Because `analyzeBinary` was released in the stable GA surface, the prior positional
  // form is preserved as a `@deprecated` public overload for backward compatibility. The
  // single runtime implementation contains an adapter branch that recognizes the deprecated
  // call shape, validates it (throws `TypeError` on conflicting `contentType` values), and
  // normalizes it into the preferred shape by recursing.
  //
  // Additional customizations preserved from the previous design:
  //   1. `contentType` has default "application/octet-stream" (EMITTER-FIX: TypeSpec defines
  //      this default but the emitter does not generate it).
  //   2. Uses public option types that hide `stringEncoding`.
  //   3. Always passes `stringEncoding: "utf16"` internally for JavaScript string compatibility.
  //   4. Exposes `operationId` on the returned poller for result retrieval.

  /**
   * Extract content and fields from binary input.
   *
   * @param analyzerId - The analyzer to use (e.g. `"prebuilt-documentSearch"`).
   * @param binaryInput - The raw bytes to analyze.
   * @param options - Optional operation parameters, including `contentType` (MIME type),
   *                  `contentRange`, `allowInputTruncation`, `updateIntervalInMs`, etc.
   */
  analyzeBinary(
    analyzerId: string,
    binaryInput: Uint8Array,
    options?: AnalyzeBinaryOptionalParams,
  ): AnalysisResultPoller;
  /**
   * Extract content and fields from binary input (deprecated positional shape).
   *
   * @deprecated Prefer the options-bag overload
   *   `analyzeBinary(analyzerId, binaryInput, { contentType, ... })`. When both this
   *   positional argument and `options.contentType` are provided with different values,
   *   a `TypeError` is thrown before any request is sent.
   */
  analyzeBinary(
    analyzerId: string,
    binaryInput: Uint8Array,
    contentType: string | undefined,
    options?: AnalyzeBinaryOptionalParams,
  ): AnalysisResultPoller;
  analyzeBinary(
    analyzerId: string,
    binaryInput: Uint8Array,
    optionsOrContentType?: AnalyzeBinaryOptionalParams | string,
    legacyOptions?: AnalyzeBinaryOptionalParams,
  ): AnalysisResultPoller {
    // Adapter branch: detect the deprecated positional call shape, validate it, and
    // normalize to the preferred options-bag shape by recursing. The recursion terminates
    // because the recursive call passes an object as argument three and no argument four,
    // so it re-enters the canonical path below.
    const usesDeprecatedOverload =
      typeof optionsOrContentType === "string" || legacyOptions !== undefined;

    if (usesDeprecatedOverload) {
      const positionalContentType =
        typeof optionsOrContentType === "string" ? optionsOrContentType : undefined;

      if (
        positionalContentType !== undefined &&
        legacyOptions?.contentType !== undefined &&
        positionalContentType !== legacyOptions.contentType
      ) {
        throw new TypeError(
          `analyzeBinary received conflicting \`contentType\` values: positional ` +
            `${JSON.stringify(positionalContentType)} vs. options.contentType ` +
            `${JSON.stringify(legacyOptions.contentType)}. Pass \`contentType\` in the ` +
            `options bag only.`,
        );
      }

      return this.analyzeBinary(analyzerId, binaryInput, {
        ...legacyOptions,
        contentType: legacyOptions?.contentType ?? positionalContentType,
      });
    }

    // Canonical path: only the preferred options-bag design below.
    const options: AnalyzeBinaryOptionalParams = (optionsOrContentType as
      AnalyzeBinaryOptionalParams | undefined) ?? {
      requestOptions: {},
    };
    const contentType = options.contentType ?? "application/octet-stream";

    let operationId: string | undefined;
    let usage: UsageDetails | undefined;
    const getInitialResponse = async (): Promise<PathUncheckedResponse> => {
      const res = await _analyzeBinarySend(this._client, analyzerId, binaryInput, contentType, {
        ...options,
        stringEncoding: "utf16",
      });
      const operationLocation = res.headers["operation-location"];
      if (operationLocation) {
        operationId = operationLocation.match(/\/analyzerResults\/([^?/]+)/)?.[1];
      }
      return res;
    };

    // CUSTOMIZATION: SDK-IMPROVEMENT: Wrap deserializer to capture `usage` from the operation
    // status envelope before extracting the `result` field.
    // Usage deserialization is guarded with try/catch so a malformed usage field
    // doesn't prevent the user from getting their AnalysisResult.
    const deserializeWithUsage = async (result: PathUncheckedResponse): Promise<AnalysisResult> => {
      if (result?.body?.usage) {
        try {
          usage = usageDetailsDeserializer(result.body.usage);
        } catch (e) {
          logger.warning("Failed to deserialize usage details from analyze response", e);
        }
      }
      const analysisResult = await _analyzeBinaryDeserialize(result);
      // CUSTOMIZATION: SDK-IMPROVEMENT: Also attach usage on the AnalysisResult so
      // callers get uniform access via `result.usage`
      // AnalyzeOperationExtensions.GetUsageDetails()). Kept in addition to the
      // AnalysisOperationState.usage getter for backward compatibility.
      if (usage) {
        analysisResult.usage = usage;
      }
      return analysisResult;
    };

    const poller = getLongRunningPoller(this._client, deserializeWithUsage, ["202", "200", "201"], {
      // CUSTOMIZATION: SDK-IMPROVEMENT: Default polling interval to 3 seconds for
      // Content Understanding operations (generated code defaults to 2 seconds).
      updateIntervalInMs: options?.updateIntervalInMs ?? 3000,
      abortSignal: options?.abortSignal,
      getInitialResponse,
      resourceLocationConfig: "operation-location",
    }) as unknown as AnalysisResultPoller;

    // CUSTOMIZATION: SDK-IMPROVEMENT: Override operationState getter to augment the base
    // OperationState with operationId and usage metadata, following the pattern used by
    // Form Recognizer (DocumentAnalysisPollOperationState) and Storage Blob (BlobBeginCopyFromUrlPollState).
    const baseOperationStateDescriptor = Object.getOwnPropertyDescriptor(poller, "operationState");
    Object.defineProperty(poller, "operationState", {
      get(): AnalysisOperationState | undefined {
        const baseState = baseOperationStateDescriptor?.get?.call(poller);
        if (!baseState) return undefined;
        return {
          ...baseState,
          operationId,
          usage,
        };
      },
      enumerable: true,
      configurable: false,
    });

    // Backward compatibility: keep operationId directly on the poller (deprecated).
    Object.defineProperty(poller, "operationId", {
      get: () => operationId,
      enumerable: true,
      configurable: false,
    });

    return poller;
  }

  // CUSTOMIZATION: SDK-IMPROVEMENT: Custom `analyze` method with:
  // 1. Uses custom option type that hides `stringEncoding`
  // 2. Always passes `stringEncoding: "utf16"` internally for JavaScript string compatibility
  // 3. Exposes `operationId` on the returned poller for result retrieval
  /** Extract content and fields from input. */
  analyze(
    analyzerId: string,
    inputs: AnalysisInput[],
    options: AnalyzeOptionalParams = { requestOptions: {} },
  ): AnalysisResultPoller {
    let operationId: string | undefined;
    let usage: UsageDetails | undefined;
    const getInitialResponse = async (): Promise<PathUncheckedResponse> => {
      const res = await _analyzeSend(this._client, analyzerId, inputs, {
        ...options,
        stringEncoding: "utf16",
      });
      const operationLocation = res.headers["operation-location"];
      if (operationLocation) {
        operationId = operationLocation.match(/\/analyzerResults\/([^?/]+)/)?.[1];
      }
      return res;
    };

    // CUSTOMIZATION: SDK-IMPROVEMENT: Wrap deserializer to capture `usage` from the operation
    // status envelope before extracting the `result` field.
    // Usage deserialization is guarded with try/catch so a malformed usage field
    // doesn't prevent the user from getting their AnalysisResult.
    const deserializeWithUsage = async (result: PathUncheckedResponse): Promise<AnalysisResult> => {
      if (result?.body?.usage) {
        try {
          usage = usageDetailsDeserializer(result.body.usage);
        } catch (e) {
          logger.warning("Failed to deserialize usage details from analyze response", e);
        }
      }
      const analysisResult = await _analyzeDeserialize(result);
      // CUSTOMIZATION: SDK-IMPROVEMENT: Also attach usage on the AnalysisResult so
      // callers get uniform access via `result.usage`
      // AnalyzeOperationExtensions.GetUsageDetails()). Kept in addition to the
      // AnalysisOperationState.usage getter for backward compatibility.
      if (usage) {
        analysisResult.usage = usage;
      }
      return analysisResult;
    };

    const poller = getLongRunningPoller(this._client, deserializeWithUsage, ["202", "200", "201"], {
      // CUSTOMIZATION: SDK-IMPROVEMENT: Default polling interval to 3 seconds for
      // Content Understanding operations (generated code defaults to 2 seconds).
      updateIntervalInMs: options?.updateIntervalInMs ?? 3000,
      abortSignal: options?.abortSignal,
      getInitialResponse,
      resourceLocationConfig: "operation-location",
    }) as unknown as AnalysisResultPoller;

    // CUSTOMIZATION: SDK-IMPROVEMENT: Override operationState getter to augment the base
    // OperationState with operationId and usage metadata.
    const baseOperationStateDescriptor = Object.getOwnPropertyDescriptor(poller, "operationState");
    Object.defineProperty(poller, "operationState", {
      get(): AnalysisOperationState | undefined {
        const baseState = baseOperationStateDescriptor?.get?.call(poller);
        if (!baseState) return undefined;
        return {
          ...baseState,
          operationId,
          usage,
        };
      },
      enumerable: true,
      configurable: false,
    });

    // Backward compatibility: keep operationId directly on the poller (deprecated).
    Object.defineProperty(poller, "operationId", {
      get: () => operationId,
      enumerable: true,
      configurable: false,
    });

    return poller;
  }

  // CUSTOMIZATION: SDK-IMPROVEMENT: Custom `analyzeInline` method.
  // Mirrors `analyze`, but the service returns the AnalysisResult inline in the response body
  // (HTTP 200) instead of starting a long-running operation. No poller is returned.
  // As with `analyze`, `stringEncoding: "utf16"` is always injected internally to ensure
  // span offsets align with JavaScript's UTF-16 string operations.
  // Envelope unwrap: the envelope is unwrapped so callers receive `AnalysisResult` directly —
  // matching the LRO pattern (poller.pollUntilDone() also returns AnalysisResult). The full
  // ContentAnalyzerInlineResponse envelope is still available via the api-layer
  // `analyzeInline` helper for advanced use.
  //
  // Fail-fast: the service returns HTTP 200 even when the inline operation ends in
  // Failed/Canceled state, so we check `envelope.status` here and throw a `RestError`
  // rather than silently returning a partial `AnalysisResult`.
  /**
   * Extract content and fields from input inline (synchronous, no polling).
   *
   * @param analyzerId - The analyzer to use (e.g. `"prebuilt-layout"`).
   * @param inputs - The URL-based inputs to analyze.
   * @param options - Optional operation parameters.
   * @returns The analysis result returned directly by the service.
   *
   * @remarks Available only when the client is configured for service API version `2026-06-01-preview`.
   */
  async analyzeInline(
    analyzerId: string,
    inputs: AnalysisInput[],
    options: AnalyzeInlineOptionalParams = { requestOptions: {} },
  ): Promise<AnalysisResult> {
    const response = await _analyzeInlineSend(this._client, analyzerId, inputs, {
      ...options,
      stringEncoding: "utf16",
    });
    // Deserializer guard: The generated `contentAnalyzerInlineResponseDeserializer` eagerly
    // deserializes `body.result` even when it is missing (which is the case on a
    // Failed/Canceled inline operation). Check the raw envelope's status FIRST so we
    // can throw a well-formed `RestError` before the deserializer crashes on a null
    // `result`. Only when the operation truly succeeded do we run the deserializer.
    //
    // HTTP-status check: Before checking the envelope-level `body.status`, check the HTTP status
    // code. A 4xx/5xx response body is a service error envelope (`{ error: {...} }`),
    // not the inline analyze envelope, so `body.status` would be `undefined` and we
    // would mislabel the failure as "InlineAnalyzeOperationFailed" while dropping the
    // real HTTP status and service error code. `createRestError` produces a `RestError`
    // that carries `statusCode`, the service `code`, and the parsed error body —
    // matching what customers get from the LRO analyze convenience method.
    if (response.status !== "200") {
      throw createRestError(response);
    }
    const bodyStatus = (response.body as { status?: string } | undefined)?.status;
    if (bodyStatus !== "Succeeded") {
      throw new RestError(
        `Inline analyze operation did not succeed. Operation state: ${bodyStatus}.`,
        { code: "InlineAnalyzeOperationFailed" },
      );
    }
    const envelope = await _analyzeInlineDeserialize(response);
    // CUSTOMIZATION: SDK-IMPROVEMENT: Attach envelope-level `usage` onto the result so
    // callers get uniform access via `result.usage`
    // AnalyzeOperationExtensions.GetUsageDetails() on Response<AnalysisResult>).
    if (envelope.usage) {
      envelope.result.usage = envelope.usage;
    }
    return envelope.result;
  }

  // CUSTOMIZATION: SDK-IMPROVEMENT: Custom `analyzeBinaryInline`
  // method. Mirrors `analyzeBinary`, but the service returns the AnalysisResult inline in
  // the response body (HTTP 200) instead of starting a long-running operation. No poller
  // is returned.
  //
  // Options-bag-only shape: `analyzeBinaryInline` is new in the `2026-06-01-preview` surface and has no
  // stable-compatibility constraint, so it exposes only the preferred options-bag shape
  // `(analyzerId, binaryInput, options?)`. There is no deprecated positional overload:
  // `contentType?` lives inside `AnalyzeBinaryInlineOptionalParams` from day one, matching
  // `analyze` / `analyzeInline` and the preferred overload of `analyzeBinary`.
  //
  // As with `analyzeBinary`, `stringEncoding: "utf16"` is always injected internally, and
  // `contentType` has a default of "application/octet-stream" (EMITTER-FIX parity).
  // Envelope unwrap: envelope is unwrapped — see analyzeInline above for rationale.
  //
  // Fail-fast: same reasoning as `analyzeInline` — throw a `RestError` when the inline
  // operation state is not Succeeded rather than returning a partial `AnalysisResult`.
  /**
   * Extract content and fields from binary input inline (synchronous, no polling).
   *
   * @param analyzerId - The analyzer to use (e.g. `"prebuilt-layout"`).
   * @param binaryInput - The raw bytes to analyze.
   * @param options - Optional operation parameters, including `contentType` (MIME type),
   *                  `contentRange`, `allowInputTruncation`, etc.
   * @returns The analysis result returned directly by the service.
   *
   * @remarks Available only when the client is configured for service API version `2026-06-01-preview`.
   */
  async analyzeBinaryInline(
    analyzerId: string,
    binaryInput: Uint8Array,
    options: AnalyzeBinaryInlineOptionalParams = { requestOptions: {} },
  ): Promise<AnalysisResult> {
    const contentType = options.contentType ?? "application/octet-stream";
    const response = await _analyzeBinaryInlineSend(
      this._client,
      analyzerId,
      binaryInput,
      contentType,
      {
        ...options,
        stringEncoding: "utf16",
      },
    );
    // Deserializer guard: See analyzeInline above — status check must happen against the
    // raw envelope BEFORE deserialization to avoid TypeError on a missing `result`
    // field when the operation ends in Failed/Canceled.
    //
    // HTTP-status check: Also see analyzeInline. If the service returns 4xx/5xx (for example a
    // 400 InvalidRequest with `innererror.code = "InputPageCountExceeded"` when the
    // inline 5-page limit is exceeded), the response body is an error envelope, not
    // the inline analyze envelope. Delegate to `createRestError` so the caller
    // receives a `RestError` with the real HTTP status code and service error code
    // instead of a generic "InlineAnalyzeOperationFailed" wrapper.
    if (response.status !== "200") {
      throw createRestError(response);
    }
    const bodyStatus = (response.body as { status?: string } | undefined)?.status;
    if (bodyStatus !== "Succeeded") {
      throw new RestError(
        `Inline analyze operation did not succeed. Operation state: ${bodyStatus}.`,
        { code: "InlineAnalyzeOperationFailed" },
      );
    }
    const envelope = await _analyzeBinaryInlineDeserialize(response);
    // CUSTOMIZATION: SDK-IMPROVEMENT: Attach envelope-level `usage` onto the result so
    // callers get uniform access via `result.usage`
    // AnalyzeOperationExtensions.GetUsageDetails() on Response<AnalysisResult>).
    if (envelope.usage) {
      envelope.result.usage = envelope.usage;
    }
    return envelope.result;
  }
}
