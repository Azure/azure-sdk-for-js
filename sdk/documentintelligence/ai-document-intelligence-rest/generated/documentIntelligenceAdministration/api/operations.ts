// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DocumentIntelligenceAdministrationContext as Client } from "./index.js";
import {
  documentIntelligenceErrorResponseDeserializer,
  BuildDocumentModelRequest,
  buildDocumentModelRequestSerializer,
  DocumentModelDetails,
  documentModelDetailsDeserializer,
  documentIntelligenceOperationDetailsUnionDeserializer,
  DocumentIntelligenceOperationDetailsUnion,
  DocumentClassifierDetails,
  documentClassifierDetailsDeserializer,
  ComposeDocumentModelRequest,
  composeDocumentModelRequestSerializer,
  AuthorizeCopyRequest,
  authorizeCopyRequestSerializer,
  ModelCopyAuthorization,
  modelCopyAuthorizationSerializer,
  modelCopyAuthorizationDeserializer,
  _PagedDocumentModelDetails,
  _pagedDocumentModelDetailsDeserializer,
  DocumentIntelligenceResourceDetails,
  documentIntelligenceResourceDetailsDeserializer,
  _PagedDocumentIntelligenceOperationDetails,
  _pagedDocumentIntelligenceOperationDetailsDeserializer,
  BuildDocumentClassifierRequest,
  buildDocumentClassifierRequestSerializer,
  AuthorizeClassifierCopyRequest,
  authorizeClassifierCopyRequestSerializer,
  ClassifierCopyAuthorization,
  classifierCopyAuthorizationSerializer,
  classifierCopyAuthorizationDeserializer,
  _PagedDocumentClassifierDetails,
  _pagedDocumentClassifierDetailsDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  DeleteClassifierOptionalParams,
  ListClassifiersOptionalParams,
  GetClassifierOptionalParams,
  CopyClassifierToOptionalParams,
  AuthorizeClassifierCopyOptionalParams,
  BuildClassifierOptionalParams,
  ListOperationsOptionalParams,
  GetOperationOptionalParams,
  GetResourceDetailsOptionalParams,
  DeleteModelOptionalParams,
  ListModelsOptionalParams,
  GetModelOptionalParams,
  CopyModelToOptionalParams,
  AuthorizeModelCopyOptionalParams,
  ComposeModelOptionalParams,
  BuildDocumentModelOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _deleteClassifierSend(
  context: Client,
  classifierId: string,
  options: DeleteClassifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentClassifiers/{classifierId}{?api%2Dversion}",
    {
      classifierId: classifierId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteClassifierDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Deletes document classifier. */
export async function deleteClassifier(
  context: Client,
  classifierId: string,
  options: DeleteClassifierOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteClassifierSend(context, classifierId, options);
  return _deleteClassifierDeserialize(result);
}

export function _listClassifiersSend(
  context: Client,
  options: ListClassifiersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentClassifiers{?api%2Dversion}",
    {
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
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listClassifiersDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDocumentClassifierDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pagedDocumentClassifierDetailsDeserializer(result.body);
}

/** List all document classifiers. */
export function listClassifiers(
  context: Client,
  options: ListClassifiersOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DocumentClassifierDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listClassifiersSend(context, options),
    _listClassifiersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-30" },
  );
}

export function _getClassifierSend(
  context: Client,
  classifierId: string,
  options: GetClassifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentClassifiers/{classifierId}{?api%2Dversion}",
    {
      classifierId: classifierId,
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
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getClassifierDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentClassifierDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return documentClassifierDetailsDeserializer(result.body);
}

/** Gets detailed document classifier information. */
export async function getClassifier(
  context: Client,
  classifierId: string,
  options: GetClassifierOptionalParams = { requestOptions: {} },
): Promise<DocumentClassifierDetails> {
  const result = await _getClassifierSend(context, classifierId, options);
  return _getClassifierDeserialize(result);
}

export function _copyClassifierToSend(
  context: Client,
  classifierId: string,
  copyToRequest: ClassifierCopyAuthorization,
  options: CopyClassifierToOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentClassifiers/{classifierId}:copyTo{?api%2Dversion}",
    {
      classifierId: classifierId,
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
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
      body: classifierCopyAuthorizationSerializer(copyToRequest),
    });
}

export async function _copyClassifierToDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentClassifierDetails> {
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

  return documentClassifierDetailsDeserializer(result.body.result);
}

/** Copies document classifier to the target resource, region, and classifierId. */
export function copyClassifierTo(
  context: Client,
  classifierId: string,
  copyToRequest: ClassifierCopyAuthorization,
  options: CopyClassifierToOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentClassifierDetails>, DocumentClassifierDetails> {
  return getLongRunningPoller(context, _copyClassifierToDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _copyClassifierToSend(context, classifierId, copyToRequest, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2024-11-30",
  }) as PollerLike<OperationState<DocumentClassifierDetails>, DocumentClassifierDetails>;
}

export function _authorizeClassifierCopySend(
  context: Client,
  authorizeCopyRequest: AuthorizeClassifierCopyRequest,
  options: AuthorizeClassifierCopyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentClassifiers:authorizeCopy{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: authorizeClassifierCopyRequestSerializer(authorizeCopyRequest),
    });
}

export async function _authorizeClassifierCopyDeserialize(
  result: PathUncheckedResponse,
): Promise<ClassifierCopyAuthorization> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return classifierCopyAuthorizationDeserializer(result.body);
}

/**
 * Generates authorization to copy a document classifier to this location with
 * specified classifierId and optional description.
 */
export async function authorizeClassifierCopy(
  context: Client,
  authorizeCopyRequest: AuthorizeClassifierCopyRequest,
  options: AuthorizeClassifierCopyOptionalParams = { requestOptions: {} },
): Promise<ClassifierCopyAuthorization> {
  const result = await _authorizeClassifierCopySend(context, authorizeCopyRequest, options);
  return _authorizeClassifierCopyDeserialize(result);
}

export function _buildClassifierSend(
  context: Client,
  buildRequest: BuildDocumentClassifierRequest,
  options: BuildClassifierOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentClassifiers:build{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
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
      body: buildDocumentClassifierRequestSerializer(buildRequest),
    });
}

export async function _buildClassifierDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentClassifierDetails> {
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

  return documentClassifierDetailsDeserializer(result.body.result);
}

/** Builds a custom document classifier. */
export function buildClassifier(
  context: Client,
  buildRequest: BuildDocumentClassifierRequest,
  options: BuildClassifierOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentClassifierDetails>, DocumentClassifierDetails> {
  return getLongRunningPoller(context, _buildClassifierDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _buildClassifierSend(context, buildRequest, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2024-11-30",
  }) as PollerLike<OperationState<DocumentClassifierDetails>, DocumentClassifierDetails>;
}

export function _listOperationsSend(
  context: Client,
  options: ListOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/operations{?api%2Dversion}",
    {
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
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDocumentIntelligenceOperationDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pagedDocumentIntelligenceOperationDetailsDeserializer(result.body);
}

/** Lists all operations. */
export function listOperations(
  context: Client,
  options: ListOperationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DocumentIntelligenceOperationDetailsUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listOperationsSend(context, options),
    _listOperationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-30" },
  );
}

export function _getOperationSend(
  context: Client,
  operationId: string,
  options: GetOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/operations/{operationId}{?api%2Dversion}",
    {
      operationId: operationId,
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
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentIntelligenceOperationDetailsUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return documentIntelligenceOperationDetailsUnionDeserializer(result.body);
}

/** Gets operation info. */
export async function getOperation(
  context: Client,
  operationId: string,
  options: GetOperationOptionalParams = { requestOptions: {} },
): Promise<DocumentIntelligenceOperationDetailsUnion> {
  const result = await _getOperationSend(context, operationId, options);
  return _getOperationDeserialize(result);
}

export function _getResourceDetailsSend(
  context: Client,
  options: GetResourceDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/info{?api%2Dversion}",
    {
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

export async function _getResourceDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentIntelligenceResourceDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return documentIntelligenceResourceDetailsDeserializer(result.body);
}

/** Return information about the current resource. */
export async function getResourceDetails(
  context: Client,
  options: GetResourceDetailsOptionalParams = { requestOptions: {} },
): Promise<DocumentIntelligenceResourceDetails> {
  const result = await _getResourceDetailsSend(context, options);
  return _getResourceDetailsDeserialize(result);
}

export function _deleteModelSend(
  context: Client,
  modelId: string,
  options: DeleteModelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}{?api%2Dversion}",
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
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteModelDeserialize(result: PathUncheckedResponse): Promise<void> {
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

/** Deletes document model. */
export async function deleteModel(
  context: Client,
  modelId: string,
  options: DeleteModelOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteModelSend(context, modelId, options);
  return _deleteModelDeserialize(result);
}

export function _listModelsSend(
  context: Client,
  options: ListModelsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels{?api%2Dversion}",
    {
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
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listModelsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedDocumentModelDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _pagedDocumentModelDetailsDeserializer(result.body);
}

/** List all document models */
export function listModels(
  context: Client,
  options: ListModelsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DocumentModelDetails> {
  return buildPagedAsyncIterator(
    context,
    () => _listModelsSend(context, options),
    _listModelsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-11-30" },
  );
}

export function _getModelSend(
  context: Client,
  modelId: string,
  options: GetModelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}{?api%2Dversion}",
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
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getModelDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentModelDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return documentModelDetailsDeserializer(result.body);
}

/** Gets detailed document model information. */
export async function getModel(
  context: Client,
  modelId: string,
  options: GetModelOptionalParams = { requestOptions: {} },
): Promise<DocumentModelDetails> {
  const result = await _getModelSend(context, modelId, options);
  return _getModelDeserialize(result);
}

export function _copyModelToSend(
  context: Client,
  modelId: string,
  copyToRequest: ModelCopyAuthorization,
  options: CopyModelToOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels/{modelId}:copyTo{?api%2Dversion}",
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
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: modelCopyAuthorizationSerializer(copyToRequest),
    });
}

export async function _copyModelToDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentModelDetails> {
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

  return documentModelDetailsDeserializer(result.body.result);
}

/** Copies document model to the target resource, region, and modelId. */
export function copyModelTo(
  context: Client,
  modelId: string,
  copyToRequest: ModelCopyAuthorization,
  options: CopyModelToOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentModelDetails>, DocumentModelDetails> {
  return getLongRunningPoller(context, _copyModelToDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _copyModelToSend(context, modelId, copyToRequest, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2024-11-30",
  }) as PollerLike<OperationState<DocumentModelDetails>, DocumentModelDetails>;
}

export function _authorizeModelCopySend(
  context: Client,
  authorizeCopyRequest: AuthorizeCopyRequest,
  options: AuthorizeModelCopyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels:authorizeCopy{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: authorizeCopyRequestSerializer(authorizeCopyRequest),
    });
}

export async function _authorizeModelCopyDeserialize(
  result: PathUncheckedResponse,
): Promise<ModelCopyAuthorization> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = documentIntelligenceErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return modelCopyAuthorizationDeserializer(result.body);
}

/**
 * Generates authorization to copy a document model to this location with
 * specified modelId and optional description.
 */
export async function authorizeModelCopy(
  context: Client,
  authorizeCopyRequest: AuthorizeCopyRequest,
  options: AuthorizeModelCopyOptionalParams = { requestOptions: {} },
): Promise<ModelCopyAuthorization> {
  const result = await _authorizeModelCopySend(context, authorizeCopyRequest, options);
  return _authorizeModelCopyDeserialize(result);
}

export function _composeModelSend(
  context: Client,
  composeRequest: ComposeDocumentModelRequest,
  options: ComposeModelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels:compose{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
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
      body: composeDocumentModelRequestSerializer(composeRequest),
    });
}

export async function _composeModelDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentModelDetails> {
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

  return documentModelDetailsDeserializer(result.body.result);
}

/** Creates a new document model from document types of existing document models. */
export function composeModel(
  context: Client,
  composeRequest: ComposeDocumentModelRequest,
  options: ComposeModelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentModelDetails>, DocumentModelDetails> {
  return getLongRunningPoller(context, _composeModelDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _composeModelSend(context, composeRequest, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2024-11-30",
  }) as PollerLike<OperationState<DocumentModelDetails>, DocumentModelDetails>;
}

export function _buildDocumentModelSend(
  context: Client,
  buildRequest: BuildDocumentModelRequest,
  options: BuildDocumentModelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/documentModels:build{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-11-30",
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
      body: buildDocumentModelRequestSerializer(buildRequest),
    });
}

export async function _buildDocumentModelDeserialize(
  result: PathUncheckedResponse,
): Promise<DocumentModelDetails> {
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

  return documentModelDetailsDeserializer(result.body.result);
}

/** Builds a custom document analysis model. */
export function buildDocumentModel(
  context: Client,
  buildRequest: BuildDocumentModelRequest,
  options: BuildDocumentModelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DocumentModelDetails>, DocumentModelDetails> {
  return getLongRunningPoller(context, _buildDocumentModelDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _buildDocumentModelSend(context, buildRequest, options),
    resourceLocationConfig: "operation-location",
    apiVersion: context.apiVersion ?? "2024-11-30",
  }) as PollerLike<OperationState<DocumentModelDetails>, DocumentModelDetails>;
}
