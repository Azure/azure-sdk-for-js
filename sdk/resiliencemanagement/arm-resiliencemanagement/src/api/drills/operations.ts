// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext as Client } from "../index.js";
import type {
  Drill,
  DrillUpdate,
  _DrillListResult,
  ValidateForExecutionRequest,
  DrillStartRequest,
  DrillEndRequest,
  AddOrUpdateResourcesRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  drillSerializer,
  drillDeserializer,
  drillUpdateSerializer,
  _drillListResultDeserializer,
  validateForExecutionRequestSerializer,
  drillStartRequestSerializer,
  drillEndRequestSerializer,
  addOrUpdateResourcesRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DrillsResyncReadinessCheckOptionalParams,
  DrillsAddOrUpdateResourcesOptionalParams,
  DrillsEndOptionalParams,
  DrillsStartOptionalParams,
  DrillsValidateForExecutionOptionalParams,
  DrillsListOptionalParams,
  DrillsDeleteOptionalParams,
  DrillsUpdateOptionalParams,
  DrillsCreateOptionalParams,
  DrillsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _resyncReadinessCheckSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  options: DrillsResyncReadinessCheckOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/resyncReadinessCheck{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { "operation-id": operationId, ...options.requestOptions?.headers },
  });
}

export async function _resyncReadinessCheckDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This triggers detection of any drifts from the desired state of Resources and RBAC. */
export function resyncReadinessCheck(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  options: DrillsResyncReadinessCheckOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _resyncReadinessCheckDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _resyncReadinessCheckSend(context, serviceGroupName, operationId, drillName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _addOrUpdateResourcesSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  body: AddOrUpdateResourcesRequest,
  options: DrillsAddOrUpdateResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/addOrUpdateResources{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { "operation-id": operationId, ...options.requestOptions?.headers },
    body: addOrUpdateResourcesRequestSerializer(body),
  });
}

export async function _addOrUpdateResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This enables the user to include, exclude or update resources from their Drill. */
export function addOrUpdateResources(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  body: AddOrUpdateResourcesRequest,
  options: DrillsAddOrUpdateResourcesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _addOrUpdateResourcesDeserialize,
    ["202", "204", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _addOrUpdateResourcesSend(context, serviceGroupName, operationId, drillName, body, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _endSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  body: DrillEndRequest,
  options: DrillsEndOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/end{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: drillEndRequestSerializer(body),
  });
}

export async function _endDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This ends the currently running instance of the Drill. */
export function end(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  body: DrillEndRequest,
  options: DrillsEndOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _endDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _endSend(context, serviceGroupName, operationId, drillName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _startSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  body: DrillStartRequest,
  options: DrillsStartOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/start{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: drillStartRequestSerializer(body),
  });
}

export async function _startDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This starts a new running instance of the Drill. */
export function start(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  body: DrillStartRequest,
  options: DrillsStartOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _startDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _startSend(context, serviceGroupName, operationId, drillName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _validateForExecutionSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  body: ValidateForExecutionRequest,
  options: DrillsValidateForExecutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}/validateForExecution{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      "operation-id": operationId,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: validateForExecutionRequestSerializer(body),
  });
}

export async function _validateForExecutionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** This returns eligible resource to be faulted or failed over. */
export function validateForExecution(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  drillName: string,
  body: ValidateForExecutionRequest,
  options: DrillsValidateForExecutionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _validateForExecutionDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateForExecutionSend(context, serviceGroupName, operationId, drillName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  serviceGroupName: string,
  options: DrillsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills{?api%2Dversion,%24skipToken,%24top}",
    {
      serviceGroupName: serviceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
      "%24skipToken": options?.skipToken,
      "%24top": options?.top,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_DrillListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _drillListResultDeserializer(result.body);
}

/** List Drill resources by tenant */
export function list(
  context: Client,
  serviceGroupName: string,
  options: DrillsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Drill> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  options: DrillsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

/** Delete a Drill */
export function $delete(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  options: DrillsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, serviceGroupName, drillName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  properties: DrillUpdate,
  options: DrillsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: drillUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Update a Drill */
export function update(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  properties: DrillUpdate,
  options: DrillsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, serviceGroupName, drillName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  resource: Drill,
  options: DrillsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: drillSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Drill> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return drillDeserializer(result.body);
}

/** Create a Drill */
export function create(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  resource: Drill,
  options: DrillsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Drill>, Drill> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, serviceGroupName, drillName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<Drill>, Drill>;
}

export function _getSend(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  options: DrillsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/drills/{drillName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      drillName: drillName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Drill> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return drillDeserializer(result.body);
}

/** Get a Drill */
export async function get(
  context: Client,
  serviceGroupName: string,
  drillName: string,
  options: DrillsGetOptionalParams = { requestOptions: {} },
): Promise<Drill> {
  const result = await _getSend(context, serviceGroupName, drillName, options);
  return _getDeserialize(result);
}
