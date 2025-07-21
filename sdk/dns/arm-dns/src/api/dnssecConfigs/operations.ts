// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkContext as Client } from "../index.js";
import {
  DnssecConfig,
  dnssecConfigDeserializer,
  cloudErrorDeserializer,
  _DnssecConfigListResult,
  _dnssecConfigListResultDeserializer,
} from "../../models/models.js";
import {
  DnssecConfigsListByDnsZoneOptionalParams,
  DnssecConfigsDeleteOptionalParams,
  DnssecConfigsCreateOrUpdateOptionalParams,
  DnssecConfigsGetOptionalParams,
} from "./options.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByDnsZoneSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: DnssecConfigsListByDnsZoneOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/dnssecConfigs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
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

export async function _listByDnsZoneDeserialize(
  result: PathUncheckedResponse,
): Promise<_DnssecConfigListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _dnssecConfigListResultDeserializer(result.body);
}

/** Lists the DNSSEC configurations in a DNS zone. */
export function listByDnsZone(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: DnssecConfigsListByDnsZoneOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DnssecConfig> {
  return buildPagedAsyncIterator(
    context,
    () => _listByDnsZoneSend(context, resourceGroupName, zoneName, options),
    _listByDnsZoneDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: DnssecConfigsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/dnssecConfigs/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
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
      accept: "application/json",
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

/** Deletes the DNSSEC configuration on a DNS zone. This operation cannot be undone. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: DnssecConfigsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, zoneName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: DnssecConfigsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/dnssecConfigs/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "If-Match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "If-None-Match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DnssecConfig> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dnssecConfigDeserializer(result.body);
}

/** Creates or updates the DNSSEC configuration on a DNS zone. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: DnssecConfigsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DnssecConfig>, DnssecConfig> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOrUpdateSend(context, resourceGroupName, zoneName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DnssecConfig>, DnssecConfig>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: DnssecConfigsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsZones/{zoneName}/dnssecConfigs/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      zoneName: zoneName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DnssecConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return dnssecConfigDeserializer(result.body);
}

/** Gets the DNSSEC configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  zoneName: string,
  options: DnssecConfigsGetOptionalParams = { requestOptions: {} },
): Promise<DnssecConfig> {
  const result = await _getSend(context, resourceGroupName, zoneName, options);
  return _getDeserialize(result);
}
