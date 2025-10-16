// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerContext as Client } from "../index.js";
import {
  Operation,
  operationDeserializer,
  _PageOperation,
  _pageOperationDeserializer,
  IngestionRun,
  ingestionRunDeserializer,
  _PageIngestionRun,
  _pageIngestionRunDeserializer,
  Ingestion,
  ingestionSerializer,
  ingestionDeserializer,
  _PageIngestion,
  _pageIngestionDeserializer,
  ingestionSourceUnionSerializer,
  ingestionSourceUnionDeserializer,
  IngestionSourceUnion,
  _PageIngestionSourceSummary,
  _pageIngestionSourceSummaryDeserializer,
  IngestionSourceSummary,
  _PageManagedIdentityMetadata,
  _pageManagedIdentityMetadataDeserializer,
  ManagedIdentityMetadata,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  IngestionManagementListManagedIdentitiesOptionalParams,
  IngestionManagementListSourcesOptionalParams,
  IngestionManagementGetSourceOptionalParams,
  IngestionManagementDeleteSourceOptionalParams,
  IngestionManagementCreateOrReplaceSourceOptionalParams,
  IngestionManagementCreateSourceOptionalParams,
  IngestionManagementUpdateOptionalParams,
  IngestionManagementListsOptionalParams,
  IngestionManagementGetOptionalParams,
  IngestionManagementDeleteOptionalParams,
  IngestionManagementCreateOptionalParams,
  IngestionManagementListRunsOptionalParams,
  IngestionManagementGetRunOptionalParams,
  IngestionManagementCreateRunOptionalParams,
  IngestionManagementListOperationsOptionalParams,
  IngestionManagementGetOperationOptionalParams,
  IngestionManagementCancelAllOperationsOptionalParams,
  IngestionManagementCancelOperationOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listManagedIdentitiesSend(
  context: Client,
  options: IngestionManagementListManagedIdentitiesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/ingestion-sources/managed-identities{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listManagedIdentitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PageManagedIdentityMetadata> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pageManagedIdentityMetadataDeserializer(result.body);
}

/** Get all managed identities with access to storage accounts configured for a geo-catalog */
export function listManagedIdentities(
  context: Client,
  options: IngestionManagementListManagedIdentitiesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedIdentityMetadata> {
  return buildPagedAsyncIterator(
    context,
    () => _listManagedIdentitiesSend(context, options),
    _listManagedIdentitiesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listSourcesSend(
  context: Client,
  options: IngestionManagementListSourcesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/ingestion-sources{?api%2Dversion,%24top,%24skip}",
    {
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
      "%24skip": options?.skip,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listSourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PageIngestionSourceSummary> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pageIngestionSourceSummaryDeserializer(result.body);
}

/** Get ingestion sources in a geo-catalog */
export function listSources(
  context: Client,
  options: IngestionManagementListSourcesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<IngestionSourceSummary> {
  return buildPagedAsyncIterator(
    context,
    () => _listSourcesSend(context, options),
    _listSourcesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSourceSend(
  context: Client,
  id: string,
  options: IngestionManagementGetSourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/ingestion-sources/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getSourceDeserialize(
  result: PathUncheckedResponse,
): Promise<IngestionSourceUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ingestionSourceUnionDeserializer(result.body);
}

/** Get an ingestion source in a geo-catalog */
export async function getSource(
  context: Client,
  id: string,
  options: IngestionManagementGetSourceOptionalParams = { requestOptions: {} },
): Promise<IngestionSourceUnion> {
  const result = await _getSourceSend(context, id, options);
  return _getSourceDeserialize(result);
}

export function _deleteSourceSend(
  context: Client,
  id: string,
  options: IngestionManagementDeleteSourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/ingestion-sources/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteSourceDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete an ingestion source from a geo-catalog */
export async function deleteSource(
  context: Client,
  id: string,
  options: IngestionManagementDeleteSourceOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _deleteSourceSend(context, id, options);
  return _deleteSourceDeserialize(result);
}

export function _createOrReplaceSourceSend(
  context: Client,
  id: string,
  ingestionSource: IngestionSourceUnion,
  options: IngestionManagementCreateOrReplaceSourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/ingestion-sources/{id}{?api%2Dversion}",
    {
      id: id,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: ingestionSourceUnionSerializer(ingestionSource),
    });
}

export async function _createOrReplaceSourceDeserialize(
  result: PathUncheckedResponse,
): Promise<IngestionSourceUnion> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ingestionSourceUnionDeserializer(result.body);
}

/** Update an existing ingestion source in a geo-catalog */
export async function createOrReplaceSource(
  context: Client,
  id: string,
  ingestionSource: IngestionSourceUnion,
  options: IngestionManagementCreateOrReplaceSourceOptionalParams = {
    requestOptions: {},
  },
): Promise<IngestionSourceUnion> {
  const result = await _createOrReplaceSourceSend(
    context,
    id,
    ingestionSource,
    options,
  );
  return _createOrReplaceSourceDeserialize(result);
}

export function _createSourceSend(
  context: Client,
  ingestionSource: IngestionSourceUnion,
  options: IngestionManagementCreateSourceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/ingestion-sources{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: ingestionSourceUnionSerializer(ingestionSource),
    });
}

export async function _createSourceDeserialize(
  result: PathUncheckedResponse,
): Promise<IngestionSourceUnion> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ingestionSourceUnionDeserializer(result.body);
}

/** Create a new ingestion source in a geo-catalog */
export async function createSource(
  context: Client,
  ingestionSource: IngestionSourceUnion,
  options: IngestionManagementCreateSourceOptionalParams = {
    requestOptions: {},
  },
): Promise<IngestionSourceUnion> {
  const result = await _createSourceSend(context, ingestionSource, options);
  return _createSourceDeserialize(result);
}

export function _updateSend(
  context: Client,
  collectionId: string,
  ingestionId: string,
  definition: Ingestion,
  options: IngestionManagementUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/collections/{collectionId}/ingestions/{ingestionId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      ingestionId: ingestionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/merge-patch+json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: ingestionSerializer(definition),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<Ingestion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ingestionDeserializer(result.body);
}

/** Update an existing ingestion */
export async function update(
  context: Client,
  collectionId: string,
  ingestionId: string,
  definition: Ingestion,
  options: IngestionManagementUpdateOptionalParams = { requestOptions: {} },
): Promise<Ingestion> {
  const result = await _updateSend(
    context,
    collectionId,
    ingestionId,
    definition,
    options,
  );
  return _updateDeserialize(result);
}

export function _listsSend(
  context: Client,
  collectionId: string,
  options: IngestionManagementListsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/collections/{collectionId}/ingestions{?api%2Dversion,%24top,%24skip}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
      "%24skip": options?.skip,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PageIngestion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pageIngestionDeserializer(result.body);
}

/** Get ingestions of a catalog */
export function lists(
  context: Client,
  collectionId: string,
  options: IngestionManagementListsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Ingestion> {
  return buildPagedAsyncIterator(
    context,
    () => _listsSend(context, collectionId, options),
    _listsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  collectionId: string,
  ingestionId: string,
  options: IngestionManagementGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/collections/{collectionId}/ingestions/{ingestionId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      ingestionId: ingestionId,
      "api%2Dversion": context.apiVersion,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<Ingestion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ingestionDeserializer(result.body);
}

/** Get the definition of an ingestion */
export async function get(
  context: Client,
  collectionId: string,
  ingestionId: string,
  options: IngestionManagementGetOptionalParams = { requestOptions: {} },
): Promise<Ingestion> {
  const result = await _getSend(context, collectionId, ingestionId, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  collectionId: string,
  ingestionId: string,
  options: IngestionManagementDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/collections/{collectionId}/ingestions/{ingestionId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      ingestionId: ingestionId,
      "api%2Dversion": context.apiVersion,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete an ingestion from a catalog. All runs of the ingestion will be deleted. Ingestion must not have any runs in progress or queued. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  collectionId: string,
  ingestionId: string,
  options: IngestionManagementDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, collectionId, ingestionId, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  collectionId: string,
  definition: Ingestion,
  options: IngestionManagementCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/collections/{collectionId}/ingestions{?api%2Dversion}",
    {
      collectionId: collectionId,
      "api%2Dversion": context.apiVersion,
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
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: ingestionSerializer(definition),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<Ingestion> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ingestionDeserializer(result.body);
}

/** Create a new ingestion */
export async function create(
  context: Client,
  collectionId: string,
  definition: Ingestion,
  options: IngestionManagementCreateOptionalParams = { requestOptions: {} },
): Promise<Ingestion> {
  const result = await _createSend(context, collectionId, definition, options);
  return _createDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  collectionId: string,
  ingestionId: string,
  options: IngestionManagementListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/collections/{collectionId}/ingestions/{ingestionId}/runs{?api%2Dversion,%24top,%24skip}",
    {
      collectionId: collectionId,
      ingestionId: ingestionId,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
      "%24skip": options?.skip,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listRunsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PageIngestionRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pageIngestionRunDeserializer(result.body);
}

/** Get the runs of an ingestion */
export function listRuns(
  context: Client,
  collectionId: string,
  ingestionId: string,
  options: IngestionManagementListRunsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IngestionRun> {
  return buildPagedAsyncIterator(
    context,
    () => _listRunsSend(context, collectionId, ingestionId, options),
    _listRunsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getRunSend(
  context: Client,
  collectionId: string,
  ingestionId: string,
  runId: string,
  options: IngestionManagementGetRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/collections/{collectionId}/ingestions/{ingestionId}/runs/{runId}{?api%2Dversion}",
    {
      collectionId: collectionId,
      ingestionId: ingestionId,
      runId: runId,
      "api%2Dversion": context.apiVersion,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getRunDeserialize(
  result: PathUncheckedResponse,
): Promise<IngestionRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ingestionRunDeserializer(result.body);
}

/** Get a run of an ingestion */
export async function getRun(
  context: Client,
  collectionId: string,
  ingestionId: string,
  runId: string,
  options: IngestionManagementGetRunOptionalParams = { requestOptions: {} },
): Promise<IngestionRun> {
  const result = await _getRunSend(
    context,
    collectionId,
    ingestionId,
    runId,
    options,
  );
  return _getRunDeserialize(result);
}

export function _createRunSend(
  context: Client,
  collectionId: string,
  ingestionId: string,
  options: IngestionManagementCreateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/collections/{collectionId}/ingestions/{ingestionId}/runs{?api%2Dversion}",
    {
      collectionId: collectionId,
      ingestionId: ingestionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _createRunDeserialize(
  result: PathUncheckedResponse,
): Promise<IngestionRun> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return ingestionRunDeserializer(result.body);
}

/** Create a new run of an ingestion */
export async function createRun(
  context: Client,
  collectionId: string,
  ingestionId: string,
  options: IngestionManagementCreateRunOptionalParams = { requestOptions: {} },
): Promise<IngestionRun> {
  const result = await _createRunSend(
    context,
    collectionId,
    ingestionId,
    options,
  );
  return _createRunDeserialize(result);
}

export function _listOperationsSend(
  context: Client,
  options: IngestionManagementListOperationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/operations{?api%2Dversion,%24top,%24skip,collectionId,status}",
    {
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
      "%24skip": options?.skip,
      collectionId: options?.collectionId,
      status: options?.status,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PageOperation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pageOperationDeserializer(result.body);
}

/** Get operations of a geo-catalog collection */
export function listOperations(
  context: Client,
  options: IngestionManagementListOperationsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<Operation> {
  return buildPagedAsyncIterator(
    context,
    () => _listOperationsSend(context, options),
    _listOperationsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getOperationSend(
  context: Client,
  operationId: string,
  options: IngestionManagementGetOperationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/operations/{operationId}{?api%2Dversion}",
    {
      operationId: operationId,
      "api%2Dversion": context.apiVersion,
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
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<Operation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return operationDeserializer(result.body);
}

/** Get an operation of a geo-catalog collection */
export async function getOperation(
  context: Client,
  operationId: string,
  options: IngestionManagementGetOperationOptionalParams = {
    requestOptions: {},
  },
): Promise<Operation> {
  const result = await _getOperationSend(context, operationId, options);
  return _getOperationDeserialize(result);
}

export function _cancelAllOperationsSend(
  context: Client,
  options: IngestionManagementCancelAllOperationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/operations{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelAllOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Cancel all running operations of a geo-catalog collection */
export async function cancelAllOperations(
  context: Client,
  options: IngestionManagementCancelAllOperationsOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _cancelAllOperationsSend(context, options);
  return _cancelAllOperationsDeserialize(result);
}

export function _cancelOperationSend(
  context: Client,
  operationId: string,
  options: IngestionManagementCancelOperationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/inma/operations/{operationId}{?api%2Dversion}",
    {
      operationId: operationId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Cancel a running operation of a geo-catalog collection */
export async function cancelOperation(
  context: Client,
  operationId: string,
  options: IngestionManagementCancelOperationOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _cancelOperationSend(context, operationId, options);
  return _cancelOperationDeserialize(result);
}
