// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CloudHealthContext as Client } from "../index.js";
import type {
  Entity,
  _EntityListResult,
  EntityHistoryRequest,
  EntityHistoryResponse,
  SignalHistoryRequest,
  SignalHistoryResponse,
  HealthReportRequest,
  AddDataAnnotationRequest,
  DataAnnotation,
  GetDataAnnotationsRequest,
  GetDataAnnotationsResponse,
  GetSignalRecommendationsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  entitySerializer,
  entityDeserializer,
  _entityListResultDeserializer,
  entityHistoryRequestSerializer,
  entityHistoryResponseDeserializer,
  signalHistoryRequestSerializer,
  signalHistoryResponseDeserializer,
  healthReportRequestSerializer,
  addDataAnnotationRequestSerializer,
  dataAnnotationDeserializer,
  getDataAnnotationsRequestSerializer,
  getDataAnnotationsResponseDeserializer,
  getSignalRecommendationsResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EntitiesGetSignalRecommendationsOptionalParams,
  EntitiesGetDataAnnotationsOptionalParams,
  EntitiesAddDataAnnotationOptionalParams,
  EntitiesIngestHealthReportOptionalParams,
  EntitiesGetSignalHistoryOptionalParams,
  EntitiesGetHistoryOptionalParams,
  EntitiesListByHealthModelOptionalParams,
  EntitiesDeleteOptionalParams,
  EntitiesCreateOrUpdateOptionalParams,
  EntitiesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSignalRecommendationsSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  options: EntitiesGetSignalRecommendationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/entities/{entityName}/getSignalRecommendations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getSignalRecommendationsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetSignalRecommendationsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return getSignalRecommendationsResponseDeserializer(result.body);
}

/** Get recommended signal configurations for a given Entity (only applicable for Entities representing Azure resources) */
export async function getSignalRecommendations(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  options: EntitiesGetSignalRecommendationsOptionalParams = { requestOptions: {} },
): Promise<GetSignalRecommendationsResponse> {
  const result = await _getSignalRecommendationsSend(
    context,
    resourceGroupName,
    healthModelName,
    entityName,
    options,
  );
  return _getSignalRecommendationsDeserialize(result);
}

export function _getDataAnnotationsSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  body: GetDataAnnotationsRequest,
  options: EntitiesGetDataAnnotationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/entities/{entityName}/getDataAnnotations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: getDataAnnotationsRequestSerializer(body),
  });
}

export async function _getDataAnnotationsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetDataAnnotationsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return getDataAnnotationsResponseDeserializer(result.body);
}

/** Retrieve data annotations for an entity */
export async function getDataAnnotations(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  body: GetDataAnnotationsRequest,
  options: EntitiesGetDataAnnotationsOptionalParams = { requestOptions: {} },
): Promise<GetDataAnnotationsResponse> {
  const result = await _getDataAnnotationsSend(
    context,
    resourceGroupName,
    healthModelName,
    entityName,
    body,
    options,
  );
  return _getDataAnnotationsDeserialize(result);
}

export function _addDataAnnotationSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  body: AddDataAnnotationRequest,
  options: EntitiesAddDataAnnotationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/entities/{entityName}/addDataAnnotation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: addDataAnnotationRequestSerializer(body),
  });
}

export async function _addDataAnnotationDeserialize(
  result: PathUncheckedResponse,
): Promise<DataAnnotation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dataAnnotationDeserializer(result.body);
}

/** Add a data annotation to an entity */
export async function addDataAnnotation(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  body: AddDataAnnotationRequest,
  options: EntitiesAddDataAnnotationOptionalParams = { requestOptions: {} },
): Promise<DataAnnotation> {
  const result = await _addDataAnnotationSend(
    context,
    resourceGroupName,
    healthModelName,
    entityName,
    body,
    options,
  );
  return _addDataAnnotationDeserialize(result);
}

export function _ingestHealthReportSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  body: HealthReportRequest,
  options: EntitiesIngestHealthReportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/entities/{entityName}/ingestHealthReport{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: healthReportRequestSerializer(body),
  });
}

export async function _ingestHealthReportDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Ingest a health report for a specific signal on an entity (the entity must already exist) */
export async function ingestHealthReport(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  body: HealthReportRequest,
  options: EntitiesIngestHealthReportOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _ingestHealthReportSend(
    context,
    resourceGroupName,
    healthModelName,
    entityName,
    body,
    options,
  );
  return _ingestHealthReportDeserialize(result);
}

export function _getSignalHistorySend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  body: SignalHistoryRequest,
  options: EntitiesGetSignalHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/entities/{entityName}/getSignalHistory{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: signalHistoryRequestSerializer(body),
  });
}

export async function _getSignalHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<SignalHistoryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return signalHistoryResponseDeserializer(result.body);
}

/** Retrieve the time series history for a signal on an entity */
export async function getSignalHistory(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  body: SignalHistoryRequest,
  options: EntitiesGetSignalHistoryOptionalParams = { requestOptions: {} },
): Promise<SignalHistoryResponse> {
  const result = await _getSignalHistorySend(
    context,
    resourceGroupName,
    healthModelName,
    entityName,
    body,
    options,
  );
  return _getSignalHistoryDeserialize(result);
}

export function _getHistorySend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  body: EntityHistoryRequest,
  options: EntitiesGetHistoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/entities/{entityName}/getHistory{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: entityHistoryRequestSerializer(body),
  });
}

export async function _getHistoryDeserialize(
  result: PathUncheckedResponse,
): Promise<EntityHistoryResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return entityHistoryResponseDeserializer(result.body);
}

/** Retrieve the health state transition history for an entity */
export async function getHistory(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  body: EntityHistoryRequest,
  options: EntitiesGetHistoryOptionalParams = { requestOptions: {} },
): Promise<EntityHistoryResponse> {
  const result = await _getHistorySend(
    context,
    resourceGroupName,
    healthModelName,
    entityName,
    body,
    options,
  );
  return _getHistoryDeserialize(result);
}

export function _listByHealthModelSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  options: EntitiesListByHealthModelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/entities{?api%2Dversion,timestamp}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      timestamp: !options?.timestamp ? options?.timestamp : options?.timestamp.toISOString(),
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByHealthModelDeserialize(
  result: PathUncheckedResponse,
): Promise<_EntityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _entityListResultDeserializer(result.body);
}

/** List Entity resources by HealthModel */
export function listByHealthModel(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  options: EntitiesListByHealthModelOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Entity> {
  return buildPagedAsyncIterator(
    context,
    () => _listByHealthModelSend(context, resourceGroupName, healthModelName, options),
    _listByHealthModelDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  options: EntitiesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/entities/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Entity */
export function $delete(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  options: EntitiesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, healthModelName, entityName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  resource: Entity,
  options: EntitiesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/entities/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: entitySerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Entity> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return entityDeserializer(result.body);
}

/** Create a Entity */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  resource: Entity,
  options: EntitiesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Entity>, Entity> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        healthModelName,
        entityName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<Entity>, Entity>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  options: EntitiesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CloudHealth/healthmodels/{healthModelName}/entities/{entityName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      healthModelName: healthModelName,
      entityName: entityName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Entity> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return entityDeserializer(result.body);
}

/** Get a Entity */
export async function get(
  context: Client,
  resourceGroupName: string,
  healthModelName: string,
  entityName: string,
  options: EntitiesGetOptionalParams = { requestOptions: {} },
): Promise<Entity> {
  const result = await _getSend(context, resourceGroupName, healthModelName, entityName, options);
  return _getDeserialize(result);
}
