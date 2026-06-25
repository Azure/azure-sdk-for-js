// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DocumentIntelligenceContext as Client } from "./index.js";
import {
  AnalyzeDocumentRequest,
  analyzeDocumentRequestSerializer,
  documentIntelligenceErrorResponseDeserializer,
  AnalyzeResult,
  analyzeResultDeserializer,
  AnalyzeBatchDocumentsRequest,
  analyzeBatchDocumentsRequestSerializer,
  AnalyzeBatchResult,
  analyzeBatchResultDeserializer,
  AnalyzeBatchOperation,
  analyzeBatchOperationDeserializer,
  _PagedAnalyzeBatchOperation,
  _pagedAnalyzeBatchOperationDeserializer,
  ClassifyDocumentRequest,
  classifyDocumentRequestSerializer,
  GetAnalyzeResultFigureResponse,
  GetAnalyzeResultPdfResponse,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { getBinaryStreamResponse } from "../../static-helpers/serialization/get-binary-stream-response.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _classifyDocumentSend(
  context: Client,
  classifierId: string,
  classifyRequest: ClassifyDocumentRequest,
  options: ClassifyDocumentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentClassifiers/{classifierId}:analyze{?api%2Dversion,stringIndexType,split,pages}",
    {
      classifierId: classifierId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
      stringIndexType: options?.stringIndexType,
      split: options?.split,
      pages: options?.pages,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: classifyDocumentRequestSerializer(classifyRequest),
    });
}

export async function _classifyDocumentDeserialize(
  result: PathUncheckedResponse,
): Promise<AnalyzeResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (result?.body?.analyzeResult === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.analyzeResult"`,
      result,
    );
  }

  return analyzeResultDeserializer(result.body.analyzeResult);
}

/** Classifies document with document classifier. */
export function classifyDocument(
  context: Client,
  classifierId: string,
  classifyRequest: ClassifyDocumentRequest,
  options: ClassifyDocumentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AnalyzeResult>, AnalyzeResult> {
  return getLongRunningPoller(context, _classifyDocumentDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _classifyDocumentSend(context, classifierId, classifyRequest, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2024-11-30",
  }) as PollerLike<OperationState<AnalyzeResult>, AnalyzeResult>;
}

export function _getAnalyzeBatchResultSend(
  context: Client,
  modelId: string,
  resultId: string,
  options: GetAnalyzeBatchResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}/analyzeBatchResults/{resultId}{?api%2Dversion}",
    {
      modelId: modelId,
      resultId: resultId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getAnalyzeBatchResultDeserialize(
  result: PathUncheckedResponse,
): Promise<AnalyzeBatchOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return analyzeBatchOperationDeserializer(result.body);
}

/** Gets the result of batch document analysis. */
export async function getAnalyzeBatchResult(
  context: Client,
  modelId: string,
  resultId: string,
  options: GetAnalyzeBatchResultOptionalParams = { requestOptions: {} },
): Promise<AnalyzeBatchOperation> {
  const result = await _getAnalyzeBatchResultSend(context, modelId, resultId, options);
  return _getAnalyzeBatchResultDeserialize(result);
}

export function _deleteAnalyzeBatchResultSend(
  context: Client,
  modelId: string,
  resultId: string,
  options: DeleteAnalyzeBatchResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}/analyzeBatchResults/{resultId}{?api%2Dversion}",
    {
      modelId: modelId,
      resultId: resultId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAnalyzeBatchResultDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Mark the batch document analysis result for deletion. */
export async function deleteAnalyzeBatchResult(
  context: Client,
  modelId: string,
  resultId: string,
  options: DeleteAnalyzeBatchResultOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAnalyzeBatchResultSend(context, modelId, resultId, options);
  return _deleteAnalyzeBatchResultDeserialize(result);
}

export function _listAnalyzeBatchResultsSend(
  context: Client,
  modelId: string,
  options: ListAnalyzeBatchResultsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}/analyzeBatchResults{?api%2Dversion}",
    {
      modelId: modelId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listAnalyzeBatchResultsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedAnalyzeBatchOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pagedAnalyzeBatchOperationDeserializer(result.body);
}

/** List batch document analysis results. */
export function listAnalyzeBatchResults(
  context: Client,
  modelId: string,
  options: ListAnalyzeBatchResultsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AnalyzeBatchOperation> {
  return buildPagedAsyncIterator(
    context,
    () => _listAnalyzeBatchResultsSend(context, modelId, options),
    _listAnalyzeBatchResultsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-30" },
  );
}

export function _analyzeBatchDocumentsSend(
  context: Client,
  modelId: string,
  analyzeBatchRequest: AnalyzeBatchDocumentsRequest,
  options: AnalyzeBatchDocumentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}:analyzeBatch{?api%2Dversion,pages,locale,stringIndexType,features,queryFields,outputContentFormat,output}",
    {
      modelId: modelId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
      pages: options?.pages,
      locale: options?.locale,
      stringIndexType: options?.stringIndexType,
      features: !options?.features
        ? options?.features
        : options?.features.map((p: any) => {
            return p;
          }),
      queryFields: !options?.queryFields
        ? options?.queryFields
        : options?.queryFields.map((p: any) => {
            return p;
          }),
      outputContentFormat: options?.outputContentFormat,
      output: !options?.output
        ? options?.output
        : options?.output.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: analyzeBatchDocumentsRequestSerializer(analyzeBatchRequest),
    });
}

export async function _analyzeBatchDocumentsDeserialize(
  result: PathUncheckedResponse,
): Promise<AnalyzeBatchResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (result?.body?.result === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.result"`,
      result,
    );
  }

  return analyzeBatchResultDeserializer(result.body.result);
}

/** Analyzes batch documents with document model. */
export function analyzeBatchDocuments(
  context: Client,
  modelId: string,
  analyzeBatchRequest: AnalyzeBatchDocumentsRequest,
  options: AnalyzeBatchDocumentsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AnalyzeBatchResult>, AnalyzeBatchResult> {
  return getLongRunningPoller(context, _analyzeBatchDocumentsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _analyzeBatchDocumentsSend(context, modelId, analyzeBatchRequest, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2024-11-30",
  }) as PollerLike<OperationState<AnalyzeBatchResult>, AnalyzeBatchResult>;
}

export function _deleteAnalyzeResultSend(
  context: Client,
  modelId: string,
  resultId: string,
  options: DeleteAnalyzeResultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}/analyzeResults/{resultId}{?api%2Dversion}",
    {
      modelId: modelId,
      resultId: resultId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAnalyzeResultDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Mark the result of document analysis for deletion. */
export async function deleteAnalyzeResult(
  context: Client,
  modelId: string,
  resultId: string,
  options: DeleteAnalyzeResultOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAnalyzeResultSend(context, modelId, resultId, options);
  return _deleteAnalyzeResultDeserialize(result);
}

export function _getAnalyzeResultFigureSend(
  context: Client,
  modelId: string,
  resultId: string,
  figureId: string,
  options: GetAnalyzeResultFigureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}/analyzeResults/{resultId}/figures/{figureId}{?api%2Dversion}",
    {
      modelId: modelId,
      resultId: resultId,
      figureId: figureId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "image/png", ...options.requestOptions?.headers },
    });
}

export async function _getAnalyzeResultFigureDeserialize(
  result: PathUncheckedResponse & GetAnalyzeResultFigureResponse,
): Promise<GetAnalyzeResultFigureResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Gets the generated cropped image of specified figure from document analysis. */
export async function getAnalyzeResultFigure(
  context: Client,
  modelId: string,
  resultId: string,
  figureId: string,
  options: GetAnalyzeResultFigureOptionalParams = { requestOptions: {} },
): Promise<GetAnalyzeResultFigureResponse> {
  const streamableMethod = _getAnalyzeResultFigureSend(
    context,
    modelId,
    resultId,
    figureId,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getAnalyzeResultFigureDeserialize(result);
}

export function _getAnalyzeResultPdfSend(
  context: Client,
  modelId: string,
  resultId: string,
  options: GetAnalyzeResultPdfOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}/analyzeResults/{resultId}/pdf{?api%2Dversion}",
    {
      modelId: modelId,
      resultId: resultId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/pdf", ...options.requestOptions?.headers },
    });
}

export async function _getAnalyzeResultPdfDeserialize(
  result: PathUncheckedResponse & GetAnalyzeResultPdfResponse,
): Promise<GetAnalyzeResultPdfResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/** Gets the generated searchable PDF output from document analysis. */
export async function getAnalyzeResultPdf(
  context: Client,
  modelId: string,
  resultId: string,
  options: GetAnalyzeResultPdfOptionalParams = { requestOptions: {} },
): Promise<GetAnalyzeResultPdfResponse> {
  const streamableMethod = _getAnalyzeResultPdfSend(context, modelId, resultId, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getAnalyzeResultPdfDeserialize(result);
}

export function _analyzeDocumentSend(
  context: Client,
  modelId: string,
  analyzeRequest: AnalyzeDocumentRequest,
  options: AnalyzeDocumentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}:analyze{?api%2Dversion,pages,locale,stringIndexType,features,queryFields,outputContentFormat,output}",
    {
      modelId: modelId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
      pages: options?.pages,
      locale: options?.locale,
      stringIndexType: options?.stringIndexType,
      features: !options?.features
        ? options?.features
        : options?.features.map((p: any) => {
            return p;
          }),
      queryFields: !options?.queryFields
        ? options?.queryFields
        : options?.queryFields.map((p: any) => {
            return p;
          }),
      outputContentFormat: options?.outputContentFormat,
      output: !options?.output
        ? options?.output
        : options?.output.map((p: any) => {
            return p;
          }),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: analyzeDocumentRequestSerializer(analyzeRequest),
    });
}

export async function _analyzeDocumentDeserialize(
  result: PathUncheckedResponse,
): Promise<AnalyzeResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  if (result?.body?.analyzeResult === undefined) {
    throw createRestError(
      `Expected a result in the response at position "result.body.analyzeResult"`,
      result,
    );
  }

  return analyzeResultDeserializer(result.body.analyzeResult);
}

/** Analyzes document with document model. */
export function analyzeDocument(
  context: Client,
  modelId: string,
  analyzeRequest: AnalyzeDocumentRequest,
  options: AnalyzeDocumentOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AnalyzeResult>, AnalyzeResult> {
  return getLongRunningPoller(context, _analyzeDocumentDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _analyzeDocumentSend(context, modelId, analyzeRequest, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2024-11-30",
  }) as PollerLike<OperationState<AnalyzeResult>, AnalyzeResult>;
}
