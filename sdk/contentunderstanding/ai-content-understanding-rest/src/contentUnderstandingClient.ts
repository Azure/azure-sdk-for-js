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
  getResult,
  getOperationStatus,
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
  GetResultOptionalParams,
  GetOperationStatusOptionalParams,
  GetDefaultsOptionalParams,
  GetAnalyzerOptionalParams,
  DeleteResultOptionalParams,
  DeleteAnalyzerOptionalParams,
  CreateAnalyzerOptionalParams,
  CopyAnalyzerOptionalParams,
  AnalyzeBinaryOptionalParams,
  AnalyzeOptionalParams,
} from "./api/options.js";
import type {
  AnalyzeResult,
  ContentAnalyzerAnalyzeOperationStatus,
  ContentAnalyzer,
  ContentAnalyzerOperationStatus,
  ContentUnderstandingDefaults,
  CopyAuthorization,
  AnalyzeInput,
} from "./models/models.js";
import type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import type { PollerLike, OperationState } from "@azure/core-lro";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { ContentUnderstandingClientOptionalParams } from "./api/contentUnderstandingContext.js";

/** Optional parameters for the analyze operation, excluding inputs and stringEncoding. */
export type ContentUnderstandingAnalyzeOptionalParams = Omit<
  AnalyzeOptionalParams,
  "inputs" | "stringEncoding"
>;

/** Optional parameters for the analyzeBinary operation, excluding stringEncoding. */
export type ContentUnderstandingAnalyzeBinaryOptionalParams = Omit<
  AnalyzeBinaryOptionalParams,
  "stringEncoding"
>;

export interface AnalyzeResultPoller extends PollerLike<
  OperationState<AnalyzeResult>,
  AnalyzeResult
> {
  /** The operation ID */
  operationId?: string;
}

export class ContentUnderstandingClient {
  private _client: ContentUnderstandingContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: ContentUnderstandingClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createContentUnderstanding(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Return default settings for this Content Understanding resource. */
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

  /** Get the result of an analysis operation. */
  getResult(
    operationId: string,
    options: GetResultOptionalParams = { requestOptions: {} },
  ): Promise<ContentAnalyzerAnalyzeOperationStatus> {
    return getResult(this._client, operationId, options);
  }

  /** Get the status of an analyzer creation operation. */
  getOperationStatus(
    analyzerId: string,
    operationId: string,
    options: GetOperationStatusOptionalParams = { requestOptions: {} },
  ): Promise<ContentAnalyzerOperationStatus> {
    return getOperationStatus(this._client, analyzerId, operationId, options);
  }

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

  /** Extract content and fields from input. */
  analyzeBinary(
    analyzerId: string,
    binaryInput: Uint8Array,
    contentType: string = "application/octet-stream",
    options: ContentUnderstandingAnalyzeBinaryOptionalParams = { requestOptions: {} },
  ): AnalyzeResultPoller {
    let operationId: string | undefined;
    const getInitialResponse = async (): Promise<PathUncheckedResponse> => {
      const res = await _analyzeBinarySend(this._client, analyzerId, contentType, binaryInput, {
        ...options,
        stringEncoding: "utf16",
      });
      const operationLocation = res.headers["operation-location"];
      if (operationLocation) {
        const lastSegment = operationLocation
          .split("?")[0]
          .split("/")
          .filter((x) => x)
          .pop();
        operationId = lastSegment;
      }
      return res;
    };

    const poller = getLongRunningPoller(
      this._client,
      _analyzeBinaryDeserialize,
      ["202", "200", "201"],
      {
        updateIntervalInMs: options?.updateIntervalInMs,
        abortSignal: options?.abortSignal,
        getInitialResponse,
        resourceLocationConfig: "operation-location",
      },
    ) as AnalyzeResultPoller;

    Object.defineProperty(poller, "operationId", {
      get: () => operationId,
      enumerable: true,
      configurable: true,
    });

    return poller;
  }

  /** Extract content and fields from input. */
  analyze(
    analyzerId: string,
    inputs: AnalyzeInput[],
    options: ContentUnderstandingAnalyzeOptionalParams = { requestOptions: {} },
  ): AnalyzeResultPoller {
    let operationId: string | undefined;
    const getInitialResponse = async (): Promise<PathUncheckedResponse> => {
      const res = await _analyzeSend(this._client, analyzerId, {
        ...options,
        inputs,
        stringEncoding: "utf16",
      });
      const operationLocation = res.headers["operation-location"];
      if (operationLocation) {
        const lastSegment = operationLocation
          .split("?")[0]
          .split("/")
          .filter((x) => x)
          .pop();
        operationId = lastSegment;
      }
      return res;
    };

    const poller = getLongRunningPoller(this._client, _analyzeDeserialize, ["202", "200", "201"], {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse,
      resourceLocationConfig: "operation-location",
    }) as AnalyzeResultPoller;

    Object.defineProperty(poller, "operationId", {
      get: () => operationId,
      enumerable: true,
      configurable: true,
    });

    return poller;
  }
}
