// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext as Client } from "../index.js";
import type {
  InboundEndpoint,
  InboundEndpointPatch,
  _InboundEndpointListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  inboundEndpointSerializer,
  inboundEndpointDeserializer,
  inboundEndpointPatchSerializer,
  _inboundEndpointListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InboundEndpointsListOptionalParams,
  InboundEndpointsDeleteOptionalParams,
  InboundEndpointsUpdateOptionalParams,
  InboundEndpointsCreateOrUpdateOptionalParams,
  InboundEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverName: string,
  options: InboundEndpointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/inboundEndpoints{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverName: dnsResolverName,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_InboundEndpointListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _inboundEndpointListResultDeserializer(result.body);
}

/** Lists inbound endpoints for a DNS resolver. */
export function list(
  context: Client,
  resourceGroupName: string,
  dnsResolverName: string,
  options: InboundEndpointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InboundEndpoint> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, dnsResolverName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverName: string,
  inboundEndpointName: string,
  options: InboundEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/inboundEndpoints/{inboundEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverName: dnsResolverName,
      inboundEndpointName: inboundEndpointName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an inbound endpoint for a DNS resolver. WARNING: This operation cannot be undone. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  dnsResolverName: string,
  inboundEndpointName: string,
  options: InboundEndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, dnsResolverName, inboundEndpointName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverName: string,
  inboundEndpointName: string,
  parameters: InboundEndpointPatch,
  options: InboundEndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/inboundEndpoints/{inboundEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverName: dnsResolverName,
      inboundEndpointName: inboundEndpointName,
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
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: inboundEndpointPatchSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<InboundEndpoint> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return inboundEndpointDeserializer(result.body);
}

/** Updates an inbound endpoint for a DNS resolver. */
export function update(
  context: Client,
  resourceGroupName: string,
  dnsResolverName: string,
  inboundEndpointName: string,
  parameters: InboundEndpointPatch,
  options: InboundEndpointsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InboundEndpoint>, InboundEndpoint> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        dnsResolverName,
        inboundEndpointName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<InboundEndpoint>, InboundEndpoint>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverName: string,
  inboundEndpointName: string,
  parameters: InboundEndpoint,
  options: InboundEndpointsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/inboundEndpoints/{inboundEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverName: dnsResolverName,
      inboundEndpointName: inboundEndpointName,
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
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: inboundEndpointSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InboundEndpoint> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return inboundEndpointDeserializer(result.body);
}

/** Creates or updates an inbound endpoint for a DNS resolver. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  dnsResolverName: string,
  inboundEndpointName: string,
  parameters: InboundEndpoint,
  options: InboundEndpointsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<InboundEndpoint>, InboundEndpoint> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        dnsResolverName,
        inboundEndpointName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<InboundEndpoint>, InboundEndpoint>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dnsResolverName: string,
  inboundEndpointName: string,
  options: InboundEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsResolvers/{dnsResolverName}/inboundEndpoints/{inboundEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsResolverName: dnsResolverName,
      inboundEndpointName: inboundEndpointName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InboundEndpoint> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return inboundEndpointDeserializer(result.body);
}

/** Gets properties of an inbound endpoint for a DNS resolver. */
export async function get(
  context: Client,
  resourceGroupName: string,
  dnsResolverName: string,
  inboundEndpointName: string,
  options: InboundEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<InboundEndpoint> {
  const result = await _getSend(
    context,
    resourceGroupName,
    dnsResolverName,
    inboundEndpointName,
    options,
  );
  return _getDeserialize(result);
}
