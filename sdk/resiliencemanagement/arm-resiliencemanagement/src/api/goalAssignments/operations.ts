// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureResilienceManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  GoalAssignment,
  goalAssignmentSerializer,
  goalAssignmentDeserializer,
  UpdateGoalResourceRequest,
  updateGoalResourceRequestSerializer,
  RecommendCapacityRequest,
  recommendCapacityRequestSerializer,
  _GoalAssignmentListResult,
  _goalAssignmentListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GoalAssignmentsListOptionalParams,
  GoalAssignmentsRecommendCapacityOptionalParams,
  GoalAssignmentsDeleteOptionalParams,
  GoalAssignmentsRefreshGoalResourcesOptionalParams,
  GoalAssignmentsUpdateGoalResourcesOptionalParams,
  GoalAssignmentsUpdateOptionalParams,
  GoalAssignmentsCreateOrUpdateOptionalParams,
  GoalAssignmentsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  serviceGroupName: string,
  options: GoalAssignmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments{?api%2Dversion,%24skipToken,%24top}",
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_GoalAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _goalAssignmentListResultDeserializer(result.body);
}

/** List GoalAssignment resources by tenant */
export function list(
  context: Client,
  serviceGroupName: string,
  options: GoalAssignmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GoalAssignment> {
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

export function _recommendCapacitySend(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  body: RecommendCapacityRequest,
  options: GoalAssignmentsRecommendCapacityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}/recommendCapacity{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalAssignmentName: goalAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
      body: recommendCapacityRequestSerializer(body),
    });
}

export async function _recommendCapacityDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Recommends capacity improvements for resources under the goal assignments scope. Returns AI-powered capacity assessments and recommendations. */
export function recommendCapacity(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  body: RecommendCapacityRequest,
  options: GoalAssignmentsRecommendCapacityOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _recommendCapacityDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _recommendCapacitySend(context, serviceGroupName, goalAssignmentName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$deleteSend(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  options: GoalAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalAssignmentName: goalAssignmentName,
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a GoalAssignment */
export function $delete(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  options: GoalAssignmentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, serviceGroupName, goalAssignmentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _refreshGoalResourcesSend(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  options: GoalAssignmentsRefreshGoalResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}/refreshGoalResources{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalAssignmentName: goalAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _refreshGoalResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Refreshes the goal resources under a goal assignment. This operation scans for new resources under the scope of the assignment. */
export function refreshGoalResources(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  options: GoalAssignmentsRefreshGoalResourcesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _refreshGoalResourcesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshGoalResourcesSend(context, serviceGroupName, goalAssignmentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateGoalResourcesSend(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  body: UpdateGoalResourceRequest,
  options: GoalAssignmentsUpdateGoalResourcesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}/updateGoalResources{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalAssignmentName: goalAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
      body: updateGoalResourceRequestSerializer(body),
    });
}

export async function _updateGoalResourcesDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Action to exclude a resource from goal assignment. */
export function updateGoalResources(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  body: UpdateGoalResourceRequest,
  options: GoalAssignmentsUpdateGoalResourcesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateGoalResourcesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateGoalResourcesSend(context, serviceGroupName, goalAssignmentName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  properties: GoalAssignment,
  options: GoalAssignmentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalAssignmentName: goalAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: goalAssignmentSerializer(properties),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Update a GoalAssignment */
export function update(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  properties: GoalAssignment,
  options: GoalAssignmentsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, serviceGroupName, goalAssignmentName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  resource: GoalAssignment,
  options: GoalAssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalAssignmentName: goalAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: goalAssignmentSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Create a GoalAssignment */
export function createOrUpdate(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  resource: GoalAssignment,
  options: GoalAssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, serviceGroupName, goalAssignmentName, resource, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  options: GoalAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/goalAssignments/{goalAssignmentName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      goalAssignmentName: goalAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GoalAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return goalAssignmentDeserializer(result.body);
}

/** Get a GoalAssignment */
export async function get(
  context: Client,
  serviceGroupName: string,
  goalAssignmentName: string,
  options: GoalAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<GoalAssignment> {
  const result = await _getSend(context, serviceGroupName, goalAssignmentName, options);
  return _getDeserialize(result);
}
