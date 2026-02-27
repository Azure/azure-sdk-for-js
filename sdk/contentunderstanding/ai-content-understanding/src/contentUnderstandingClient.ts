// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PathUncheckedResponse } from "@azure-rest/core-client";
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
} from "./api/operations.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
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
} from "./models/models.js";
import type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { PollerLike, OperationState } from "@azure/core-lro";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ContentUnderstandingClientOptionalParams } from "./api/contentUnderstandingContext.js";

import type { ProcessingLocation } from "./models/models.js";

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
}

/** Optional parameters for the analyzeBinary operation. */
export interface AnalyzeBinaryOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Range of the input to analyze (ex. `1-3,5,9-`). Document content uses 1-based page numbers, while audio visual content uses integer milliseconds. */
  contentRange?: string;
  /** The location where the data may be processed. Defaults to global. */
  processingLocation?: ProcessingLocation;
}

// CUSTOMIZATION: SDK-IMPROVEMENT: Custom poller type that exposes `operationId` for users to call
// `getResult`, `getResultFile`, and `deleteResult` methods.
export interface AnalysisResultPoller extends PollerLike<
  OperationState<AnalysisResult>,
  AnalysisResult
> {
  /** The operation ID */
  operationId?: string;
}

export class ContentUnderstandingClient {
  private _client: ContentUnderstandingContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  // CUSTOMIZATION: EMITTER-FIX: Renamed 'endpointParam' to 'endpoint' for clarity and consistency.
  // The emitter generates 'endpointParam' but 'endpoint' is the standard name.
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: ContentUnderstandingClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createContentUnderstanding(endpoint, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
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

  // CUSTOMIZATION: SDK-IMPROVEMENT: Custom `analyzeBinary` method with:
  // 1. `contentType` has default "application/octet-stream" (EMITTER-FIX: TypeSpec defines this default but emitter doesn't generate it)
  // 2. Uses custom option type that hides `stringEncoding`
  // 3. Always passes `stringEncoding: "utf16"` internally for JavaScript string compatibility
  // 4. Exposes `operationId` on the returned poller for result retrieval
  /** Extract content and fields from input. */
  analyzeBinary(
    analyzerId: string,
    binaryInput: Uint8Array,
    contentType: string = "application/octet-stream",
    options: AnalyzeBinaryOptionalParams = { requestOptions: {} },
  ): AnalysisResultPoller {
    let operationId: string | undefined;
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

    const poller = getLongRunningPoller(
      this._client,
      _analyzeBinaryDeserialize,
      ["202", "200", "201"],
      {
        // CUSTOMIZATION: SDK-IMPROVEMENT: Default polling interval to 3 seconds for
        // Content Understanding operations (generated code defaults to 2 seconds).
        updateIntervalInMs: options?.updateIntervalInMs ?? 3000,
        abortSignal: options?.abortSignal,
        getInitialResponse,
        resourceLocationConfig: "operation-location",
      },
    ) as AnalysisResultPoller;

    Object.defineProperty(poller, "operationId", {
      get: () => operationId,
      enumerable: true,
      configurable: true,
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

    const poller = getLongRunningPoller(this._client, _analyzeDeserialize, ["202", "200", "201"], {
      // CUSTOMIZATION: SDK-IMPROVEMENT: Default polling interval to 3 seconds for
      // Content Understanding operations (generated code defaults to 2 seconds).
      updateIntervalInMs: options?.updateIntervalInMs ?? 3000,
      abortSignal: options?.abortSignal,
      getInitialResponse,
      resourceLocationConfig: "operation-location",
    }) as AnalysisResultPoller;

    Object.defineProperty(poller, "operationId", {
      get: () => operationId,
      enumerable: true,
      configurable: true,
    });

    return poller;
  }
}
