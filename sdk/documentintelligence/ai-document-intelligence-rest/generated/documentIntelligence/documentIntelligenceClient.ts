// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DocumentIntelligenceContext,
  DocumentIntelligenceClientOptionalParams,
  createDocumentIntelligence,
} from "./api/index.js";
import {
  AnalyzeDocumentRequest,
  AnalyzeResult,
  AnalyzeBatchDocumentsRequest,
  AnalyzeBatchResult,
  AnalyzeBatchOperation,
  ClassifyDocumentRequest,
  GetAnalyzeResultFigureResponse,
  GetAnalyzeResultPdfResponse,
} from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  classifyDocument,
  getAnalyzeBatchResult,
  deleteAnalyzeBatchResult,
  listAnalyzeBatchResults,
  analyzeBatchDocuments,
  deleteAnalyzeResult,
  getAnalyzeResultFigure,
  getAnalyzeResultPdf,
  analyzeDocument,
} from "./api/operations.js";
import {
  ClassifyDocumentOptionalParams,
  GetAnalyzeBatchResultOptionalParams,
  DeleteAnalyzeBatchResultOptionalParams,
  ListAnalyzeBatchResultsOptionalParams,
  AnalyzeBatchDocumentsOptionalParams,
  DeleteAnalyzeResultOptionalParams,
  GetAnalyzeResultFigureOptionalParams,
  GetAnalyzeResultPdfOptionalParams,
  AnalyzeDocumentOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PollerLike, OperationState } from "@azure/core-lro";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DocumentIntelligenceClientOptionalParams } from "./api/documentIntelligenceContext.js";

export class DocumentIntelligenceClient {
  private _client: DocumentIntelligenceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: DocumentIntelligenceClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDocumentIntelligence(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Classifies document with document classifier. */
  classifyDocument(
    classifierId: string,
    classifyRequest: ClassifyDocumentRequest,
    options: ClassifyDocumentOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<AnalyzeResult>, AnalyzeResult> {
    return classifyDocument(this._client, classifierId, classifyRequest, options);
  }

  /** Gets the result of batch document analysis. */
  getAnalyzeBatchResult(
    modelId: string,
    resultId: string,
    options: GetAnalyzeBatchResultOptionalParams = { requestOptions: {} },
  ): Promise<AnalyzeBatchOperation> {
    return getAnalyzeBatchResult(this._client, modelId, resultId, options);
  }

  /** Mark the batch document analysis result for deletion. */
  deleteAnalyzeBatchResult(
    modelId: string,
    resultId: string,
    options: DeleteAnalyzeBatchResultOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteAnalyzeBatchResult(this._client, modelId, resultId, options);
  }

  /** List batch document analysis results. */
  listAnalyzeBatchResults(
    modelId: string,
    options: ListAnalyzeBatchResultsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<AnalyzeBatchOperation> {
    return listAnalyzeBatchResults(this._client, modelId, options);
  }

  /** Analyzes batch documents with document model. */
  analyzeBatchDocuments(
    modelId: string,
    analyzeBatchRequest: AnalyzeBatchDocumentsRequest,
    options: AnalyzeBatchDocumentsOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<AnalyzeBatchResult>, AnalyzeBatchResult> {
    return analyzeBatchDocuments(this._client, modelId, analyzeBatchRequest, options);
  }

  /** Mark the result of document analysis for deletion. */
  deleteAnalyzeResult(
    modelId: string,
    resultId: string,
    options: DeleteAnalyzeResultOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteAnalyzeResult(this._client, modelId, resultId, options);
  }

  /** Gets the generated cropped image of specified figure from document analysis. */
  getAnalyzeResultFigure(
    modelId: string,
    resultId: string,
    figureId: string,
    options: GetAnalyzeResultFigureOptionalParams = { requestOptions: {} },
  ): Promise<GetAnalyzeResultFigureResponse> {
    return getAnalyzeResultFigure(this._client, modelId, resultId, figureId, options);
  }

  /** Gets the generated searchable PDF output from document analysis. */
  getAnalyzeResultPdf(
    modelId: string,
    resultId: string,
    options: GetAnalyzeResultPdfOptionalParams = { requestOptions: {} },
  ): Promise<GetAnalyzeResultPdfResponse> {
    return getAnalyzeResultPdf(this._client, modelId, resultId, options);
  }

  /** Analyzes document with document model. */
  analyzeDocument(
    modelId: string,
    analyzeRequest: AnalyzeDocumentRequest,
    options: AnalyzeDocumentOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<AnalyzeResult>, AnalyzeResult> {
    return analyzeDocument(this._client, modelId, analyzeRequest, options);
  }
}
