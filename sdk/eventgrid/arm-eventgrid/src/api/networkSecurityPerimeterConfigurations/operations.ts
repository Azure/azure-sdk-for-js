// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type {
  NetworkSecurityPerimeterConfiguration,
  _NetworkSecurityPerimeterConfigurationList,
  NetworkSecurityPerimeterResourceType,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  networkSecurityPerimeterConfigurationDeserializer,
  _networkSecurityPerimeterConfigurationListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileOptionalParams,
  NetworkSecurityPerimeterConfigurationsListOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _reconcileSend(
  context: Client,
  resourceGroupName: string,
  resourceType: NetworkSecurityPerimeterResourceType,
  resourceName: string,
  perimeterGuid: string,
  associationName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.EventGrid/{resourceType}/{resourceName}/networkSecurityPerimeterConfigurations/{perimeterGuid}.{associationName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceType: resourceType,
      resourceName: resourceName,
      perimeterGuid: perimeterGuid,
      associationName: associationName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _reconcileDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Reconcile a specific network security perimeter configuration for a given network security perimeter association with a topic or domain. */
export function reconcile(
  context: Client,
  resourceGroupName: string,
  resourceType: NetworkSecurityPerimeterResourceType,
  resourceName: string,
  perimeterGuid: string,
  associationName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkSecurityPerimeterConfiguration>,
  NetworkSecurityPerimeterConfiguration
> {
  return getLongRunningPoller(context, _reconcileDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reconcileSend(
        context,
        resourceGroupName,
        resourceType,
        resourceName,
        perimeterGuid,
        associationName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<
    OperationState<NetworkSecurityPerimeterConfiguration>,
    NetworkSecurityPerimeterConfiguration
  >;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceType: NetworkSecurityPerimeterResourceType,
  resourceName: string,
  options: NetworkSecurityPerimeterConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.EventGrid/{resourceType}/{resourceName}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceType: resourceType,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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
): Promise<_NetworkSecurityPerimeterConfigurationList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkSecurityPerimeterConfigurationListDeserializer(result.body);
}

/** Get all network security perimeter configurations associated with a topic or domain. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceType: NetworkSecurityPerimeterResourceType,
  resourceName: string,
  options: NetworkSecurityPerimeterConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceType, resourceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceType: NetworkSecurityPerimeterResourceType,
  resourceName: string,
  perimeterGuid: string,
  associationName: string,
  options: NetworkSecurityPerimeterConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.EventGrid/{resourceType}/{resourceName}/networkSecurityPerimeterConfigurations/{perimeterGuid}.{associationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceType: resourceType,
      resourceName: resourceName,
      perimeterGuid: perimeterGuid,
      associationName: associationName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Get a specific network security perimeter configuration with a topic or domain. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceType: NetworkSecurityPerimeterResourceType,
  resourceName: string,
  perimeterGuid: string,
  associationName: string,
  options: NetworkSecurityPerimeterConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<NetworkSecurityPerimeterConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceType,
    resourceName,
    perimeterGuid,
    associationName,
    options,
  );
  return _getDeserialize(result);
}
