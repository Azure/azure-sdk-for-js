// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentManagementContext as Client } from "../index.js";
import type { AccessPointResource, _AccessPointResourceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  accessPointResourceSerializer,
  accessPointResourceDeserializer,
  _accessPointResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AccessPointResourcesListOptionalParams,
  AccessPointResourcesDeleteOptionalParams,
  AccessPointResourcesCreateOrReplaceOptionalParams,
  AccessPointResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  options: AccessPointResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/networkGateways/{networkGatewayId}/accessPoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      networkGatewayId: networkGatewayId,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
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
): Promise<_AccessPointResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _accessPointResourceListResultDeserializer(result.body);
}
/** Lists all access points in a network gateway */
export function list(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  options: AccessPointResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AccessPointResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        options,
      ),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-06-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  accessPointId: string,
  options: AccessPointResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/networkGateways/{networkGatewayId}/accessPoints/{accessPointId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      networkGatewayId: networkGatewayId,
      accessPointId: accessPointId,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
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
/** Delete confluent access point by id */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  accessPointId: string,
  options: AccessPointResourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        accessPointId,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-06-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  accessPointId: string,
  resource: AccessPointResource,
  options: AccessPointResourcesCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/networkGateways/{networkGatewayId}/accessPoints/{accessPointId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      networkGatewayId: networkGatewayId,
      accessPointId: accessPointId,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: accessPointResourceSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessPointResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return accessPointResourceDeserializer(result.body);
}
/** Create or replace a confluent access point */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  accessPointId: string,
  resource: AccessPointResource,
  options: AccessPointResourcesCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AccessPointResource>, AccessPointResource> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(
        context,
        resourceGroupName,
        organizationName,
        environmentId,
        networkGatewayId,
        accessPointId,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-06-02-preview",
  }) as PollerLike<OperationState<AccessPointResource>, AccessPointResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  accessPointId: string,
  options: AccessPointResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/networkGateways/{networkGatewayId}/accessPoints/{accessPointId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      networkGatewayId: networkGatewayId,
      accessPointId: accessPointId,
      "api%2Dversion": context.apiVersion ?? "2026-06-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AccessPointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return accessPointResourceDeserializer(result.body);
}
/** Get confluent access point by Id */
export async function get(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  networkGatewayId: string,
  accessPointId: string,
  options: AccessPointResourcesGetOptionalParams = { requestOptions: {} },
): Promise<AccessPointResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    networkGatewayId,
    accessPointId,
    options,
  );
  return _getDeserialize(result);
}
