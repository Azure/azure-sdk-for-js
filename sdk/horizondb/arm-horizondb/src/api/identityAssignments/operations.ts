// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  IdentityAssignment,
  _IdentityAssignmentListResult,
  IdentityAssignmentCreateOrUpdate,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  identityAssignmentDeserializer,
  _identityAssignmentListResultDeserializer,
  identityAssignmentCreateOrUpdateSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IdentityAssignmentsListOptionalParams,
  IdentityAssignmentsDeleteOptionalParams,
  IdentityAssignmentsCreateOrReplaceOptionalParams,
  IdentityAssignmentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  options: IdentityAssignmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}/identityAssignments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      destinationName: destinationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<_IdentityAssignmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _identityAssignmentListResultDeserializer(result.body);
}

/** Lists identity assignments for a change data capture destination. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  options: IdentityAssignmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IdentityAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, clusterName, destinationName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  assignmentName: string,
  options: IdentityAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}/identityAssignments/{assignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      destinationName: destinationName,
      assignmentName: assignmentName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

/** Deletes an inactive change data capture identity assignment. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  assignmentName: string,
  options: IdentityAssignmentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        assignmentName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  assignmentName: string,
  resource: IdentityAssignmentCreateOrUpdate,
  options: IdentityAssignmentsCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}/identityAssignments/{assignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      destinationName: destinationName,
      assignmentName: assignmentName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: identityAssignmentCreateOrUpdateSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<IdentityAssignment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return identityAssignmentDeserializer(result.body);
}

/** Creates or idempotently replaces a change data capture identity assignment. The identity resource ID is immutable and must reference a user-assigned managed identity already attached to the parent cluster. The service also validates destination permissions, which are not granted by attaching the identity to the cluster. */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  assignmentName: string,
  resource: IdentityAssignmentCreateOrUpdate,
  options: IdentityAssignmentsCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IdentityAssignment>, IdentityAssignment> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(
        context,
        resourceGroupName,
        clusterName,
        destinationName,
        assignmentName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<IdentityAssignment>, IdentityAssignment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  assignmentName: string,
  options: IdentityAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/clusters/{clusterName}/changeDataCaptureDestinations/{destinationName}/identityAssignments/{assignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      destinationName: destinationName,
      assignmentName: assignmentName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<IdentityAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return identityAssignmentDeserializer(result.body);
}

/** Gets a change data capture identity assignment. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  destinationName: string,
  assignmentName: string,
  options: IdentityAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<IdentityAssignment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterName,
    destinationName,
    assignmentName,
    options,
  );
  return _getDeserialize(result);
}
