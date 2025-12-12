// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceFleetContext as Client } from "../index.js";
import type {
  FleetManagedNamespace,
  _FleetManagedNamespaceListResult,
  FleetManagedNamespacePatch,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  fleetManagedNamespaceSerializer,
  fleetManagedNamespaceDeserializer,
  _fleetManagedNamespaceListResultDeserializer,
  fleetManagedNamespacePatchSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FleetManagedNamespacesUpdateOptionalParams,
  FleetManagedNamespacesListByFleetOptionalParams,
  FleetManagedNamespacesDeleteOptionalParams,
  FleetManagedNamespacesCreateOrUpdateOptionalParams,
  FleetManagedNamespacesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  managedNamespaceName: string,
  properties: FleetManagedNamespacePatch,
  options: FleetManagedNamespacesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/managedNamespaces/{managedNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      managedNamespaceName: managedNamespaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: fleetManagedNamespacePatchSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<FleetManagedNamespace> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fleetManagedNamespaceDeserializer(result.body);
}

/** Update a FleetManagedNamespace */
export function update(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  managedNamespaceName: string,
  properties: FleetManagedNamespacePatch,
  options: FleetManagedNamespacesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FleetManagedNamespace>, FleetManagedNamespace> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, fleetName, managedNamespaceName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<FleetManagedNamespace>, FleetManagedNamespace>;
}

export function _listByFleetSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetManagedNamespacesListByFleetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/managedNamespaces{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByFleetDeserialize(
  result: PathUncheckedResponse,
): Promise<_FleetManagedNamespaceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _fleetManagedNamespaceListResultDeserializer(result.body);
}

/** List FleetManagedNamespace resources by Fleet */
export function listByFleet(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  options: FleetManagedNamespacesListByFleetOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<FleetManagedNamespace> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFleetSend(context, resourceGroupName, fleetName, options),
    _listByFleetDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  managedNamespaceName: string,
  options: FleetManagedNamespacesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/managedNamespaces/{managedNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      managedNamespaceName: managedNamespaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a FleetManagedNamespace */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  managedNamespaceName: string,
  options: FleetManagedNamespacesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, fleetName, managedNamespaceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  managedNamespaceName: string,
  resource: FleetManagedNamespace,
  options: FleetManagedNamespacesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/managedNamespaces/{managedNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      managedNamespaceName: managedNamespaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: fleetManagedNamespaceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FleetManagedNamespace> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fleetManagedNamespaceDeserializer(result.body);
}

/** Create a FleetManagedNamespace */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  managedNamespaceName: string,
  resource: FleetManagedNamespace,
  options: FleetManagedNamespacesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<FleetManagedNamespace>, FleetManagedNamespace> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        fleetName,
        managedNamespaceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<FleetManagedNamespace>, FleetManagedNamespace>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  managedNamespaceName: string,
  options: FleetManagedNamespacesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/fleets/{fleetName}/managedNamespaces/{managedNamespaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      fleetName: fleetName,
      managedNamespaceName: managedNamespaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<FleetManagedNamespace> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return fleetManagedNamespaceDeserializer(result.body);
}

/** Get a FleetManagedNamespace */
export async function get(
  context: Client,
  resourceGroupName: string,
  fleetName: string,
  managedNamespaceName: string,
  options: FleetManagedNamespacesGetOptionalParams = { requestOptions: {} },
): Promise<FleetManagedNamespace> {
  const result = await _getSend(
    context,
    resourceGroupName,
    fleetName,
    managedNamespaceName,
    options,
  );
  return _getDeserialize(result);
}
