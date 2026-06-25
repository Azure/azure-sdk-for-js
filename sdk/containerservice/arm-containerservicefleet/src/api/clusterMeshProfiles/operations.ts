// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ClusterMeshProfile,
  clusterMeshProfileSerializer,
  clusterMeshProfileDeserializer,
  _ClusterMeshProfileListResult,
  _clusterMeshProfileListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ClusterMeshProfilesApplyOptionalParams,
  ClusterMeshProfilesListByFleetOptionalParams,
  ClusterMeshProfilesDeleteOptionalParams,
  ClusterMeshProfilesCreateOrUpdateOptionalParams,
  ClusterMeshProfilesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _applySend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  clusterMeshProfileName: string,
  options: ClusterMeshProfilesApplyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/clusterMeshProfiles/{clusterMeshProfileName}/apply{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      clusterMeshProfileName: clusterMeshProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-03-02-preview",
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
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _applyDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterMeshProfile> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterMeshProfileDeserializer(result.body);
}

/** Applies the cluster mesh profile to selected fleet members. */
export function apply(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  clusterMeshProfileName: string,
  options: ClusterMeshProfilesApplyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClusterMeshProfile>, ClusterMeshProfile> {
  return getLongRunningPoller(context, _applyDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _applySend(context, resourceGroupName, fleetName, clusterMeshProfileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-02-preview",
  }) as PollerLike<OperationState<ClusterMeshProfile>, ClusterMeshProfile>;
}

export function _listByFleetSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: ClusterMeshProfilesListByFleetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/clusterMeshProfiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      "api%2Dversion": context.apiVersion ?? "2026-03-02-preview",
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

export async function _listByFleetDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClusterMeshProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _clusterMeshProfileListResultDeserializer(result.body);
}

/** List ClusterMeshProfile resources by Fleet */
export function listByFleet(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: ClusterMeshProfilesListByFleetOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ClusterMeshProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFleetSend(context, resourceGroupName, fleetName, options),
    _listByFleetDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  clusterMeshProfileName: string,
  options: ClusterMeshProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/clusterMeshProfiles/{clusterMeshProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      clusterMeshProfileName: clusterMeshProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-03-02-preview",
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
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...options.requestOptions?.headers,
      },
    });
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

/** Delete a ClusterMeshProfile */
export function $delete(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  clusterMeshProfileName: string,
  options: ClusterMeshProfilesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, fleetName, clusterMeshProfileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  clusterMeshProfileName: string,
  resource: ClusterMeshProfile,
  options: ClusterMeshProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/clusterMeshProfiles/{clusterMeshProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      clusterMeshProfileName: clusterMeshProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-03-02-preview",
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
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: clusterMeshProfileSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterMeshProfile> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterMeshProfileDeserializer(result.body);
}

/** Create a ClusterMeshProfile */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  clusterMeshProfileName: string,
  resource: ClusterMeshProfile,
  options: ClusterMeshProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClusterMeshProfile>, ClusterMeshProfile> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        fleetName,
        clusterMeshProfileName,
        resource,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2026-03-02-preview",
  }) as PollerLike<OperationState<ClusterMeshProfile>, ClusterMeshProfile>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  clusterMeshProfileName: string,
  options: ClusterMeshProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/clusterMeshProfiles/{clusterMeshProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      clusterMeshProfileName: clusterMeshProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-03-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ClusterMeshProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterMeshProfileDeserializer(result.body);
}

/** Get a ClusterMeshProfile */
export async function get(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  clusterMeshProfileName: string,
  options: ClusterMeshProfilesGetOptionalParams = { requestOptions: {} },
): Promise<ClusterMeshProfile> {
  const result = await _getSend(
    context,
    resourceGroupName,
    fleetName,
    clusterMeshProfileName,
    options,
  );
  return _getDeserialize(result);
}
