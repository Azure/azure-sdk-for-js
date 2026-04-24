// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { commonCloudErrorDeserializer } from "../../models/common/models.js";
import type {
  StandardsAPIAssignment,
  _StandardsAPIAssignmentList,
} from "../../models/standardsAPI/models.js";
import {
  standardsAPIAssignmentSerializer,
  standardsAPIAssignmentDeserializer,
  _standardsAPIAssignmentListDeserializer,
} from "../../models/standardsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AssignmentsListBySubscriptionOptionalParams,
  AssignmentsListOptionalParams,
  AssignmentsDeleteOptionalParams,
  AssignmentsCreateOrUpdateOptionalParams,
  AssignmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listBySubscriptionSend(
  context: Client,
  options: AssignmentsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Security/assignments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2021-08-01-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandardsAPIAssignmentList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _standardsAPIAssignmentListDeserializer(result.body);
}

/** Get a list of all relevant standardAssignments over a subscription level scope */
export function listBySubscription(
  context: Client,
  options: AssignmentsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StandardsAPIAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-08-01-preview" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: AssignmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/assignments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2021-08-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_StandardsAPIAssignmentList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return _standardsAPIAssignmentListDeserializer(result.body);
}

/** Get a list of all relevant standardAssignments available for scope */
export function list(
  context: Client,
  resourceGroupName: string,
  options: AssignmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<StandardsAPIAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2021-08-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  assignmentId: string,
  options: AssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/assignments/{assignmentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      assignmentId: assignmentId,
      "api%2Dversion": "2021-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete a standard assignment over a given scope */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  assignmentId: string,
  options: AssignmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, assignmentId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  assignmentId: string,
  assignment: StandardsAPIAssignment,
  options: AssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/assignments/{assignmentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      assignmentId: assignmentId,
      "api%2Dversion": "2021-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: standardsAPIAssignmentSerializer(assignment),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<StandardsAPIAssignment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return standardsAPIAssignmentDeserializer(result.body);
}

/** Create a security assignment on the given scope. Will create/update the required standard assignment. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  assignmentId: string,
  assignment: StandardsAPIAssignment,
  options: AssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<StandardsAPIAssignment> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    assignmentId,
    assignment,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  assignmentId: string,
  options: AssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/assignments/{assignmentId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      assignmentId: assignmentId,
      "api%2Dversion": "2021-08-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<StandardsAPIAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = commonCloudErrorDeserializer(result.body);

    throw error;
  }

  return standardsAPIAssignmentDeserializer(result.body);
}

/** Get a specific standard assignment for the requested scope by resourceId */
export async function get(
  context: Client,
  resourceGroupName: string,
  assignmentId: string,
  options: AssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<StandardsAPIAssignment> {
  const result = await _getSend(context, resourceGroupName, assignmentId, options);
  return _getDeserialize(result);
}
