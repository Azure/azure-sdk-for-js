// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createContentUnderstanding,
  ContentUnderstandingContext,
  ContentUnderstandingClientOptionalParams,
} from "./api/index.js";
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
  analyzeBinary,
  analyze,
} from "./api/operations.js";
import {
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
import {
  AnalysisInput,
  ContentAnalyzerAnalyzeOperationStatus,
  AnalysisResult,
  ContentAnalyzer,
  ContentAnalyzerOperationStatus,
  ContentUnderstandingDefaults,
  CopyAuthorization,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Pipeline } from "@azure/core-rest-pipeline";

export { ContentUnderstandingClientOptionalParams } from "./api/contentUnderstandingContext.js";

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
    input: Uint8Array,
    stringEncoding: string,
    contentType: string,
    options: AnalyzeBinaryOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<AnalysisResult>, AnalysisResult> {
    return analyzeBinary(this._client, analyzerId, input, stringEncoding, contentType, options);
  }

  /** Extract content and fields from input. */
  analyze(
    analyzerId: string,
    inputs: AnalysisInput[],
    stringEncoding: string,
    options: AnalyzeOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<AnalysisResult>, AnalysisResult> {
    return analyze(this._client, analyzerId, inputs, stringEncoding, options);
  }
}
