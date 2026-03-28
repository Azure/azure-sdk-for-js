// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  AzureFirewall,
  IPPrefixesList,
  FirewallPacketCaptureParameters,
  AzureFirewallPacketCaptureResponse,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  azureFirewallSerializer,
  azureFirewallDeserializer,
  ipPrefixesListDeserializer,
  firewallPacketCaptureParametersSerializer,
  azureFirewallPacketCaptureResponseDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _AzureFirewallListResult } from "../../models/models.js";
import { _azureFirewallListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AzureFirewallsPacketCaptureOperationOptionalParams,
  AzureFirewallsPacketCaptureOptionalParams,
  AzureFirewallsListLearnedPrefixesOptionalParams,
  AzureFirewallsListAllOptionalParams,
  AzureFirewallsListOptionalParams,
  AzureFirewallsDeleteOptionalParams,
  AzureFirewallsUpdateTagsOptionalParams,
  AzureFirewallsCreateOrUpdateOptionalParams,
  AzureFirewallsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _packetCaptureOperationSend(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  parameters: FirewallPacketCaptureParameters,
  options: AzureFirewallsPacketCaptureOperationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}/packetCaptureOperation{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureFirewallName: azureFirewallName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: firewallPacketCaptureParametersSerializer(parameters),
  });
}

export async function _packetCaptureOperationDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureFirewallPacketCaptureResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return azureFirewallPacketCaptureResponseDeserializer(result.body);
}

/** Runs a packet capture operation on AzureFirewall. */
export function packetCaptureOperation(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  parameters: FirewallPacketCaptureParameters,
  options: AzureFirewallsPacketCaptureOperationOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<AzureFirewallPacketCaptureResponse>,
  AzureFirewallPacketCaptureResponse
> {
  return getLongRunningPoller(context, _packetCaptureOperationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _packetCaptureOperationSend(
        context,
        resourceGroupName,
        azureFirewallName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<AzureFirewallPacketCaptureResponse>,
    AzureFirewallPacketCaptureResponse
  >;
}

export function _packetCaptureSend(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  parameters: FirewallPacketCaptureParameters,
  options: AzureFirewallsPacketCaptureOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}/packetCapture{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureFirewallName: azureFirewallName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: firewallPacketCaptureParametersSerializer(parameters),
  });
}

export async function _packetCaptureDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Runs a packet capture on AzureFirewall. */
export function packetCapture(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  parameters: FirewallPacketCaptureParameters,
  options: AzureFirewallsPacketCaptureOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _packetCaptureDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _packetCaptureSend(context, resourceGroupName, azureFirewallName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listLearnedPrefixesSend(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  options: AzureFirewallsListLearnedPrefixesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}/learnedIPPrefixes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureFirewallName: azureFirewallName,
      "api%2Dversion": "2025-05-01",
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

export async function _listLearnedPrefixesDeserialize(
  result: PathUncheckedResponse,
): Promise<IPPrefixesList> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return ipPrefixesListDeserializer(result.body);
}

/** Retrieves a list of all IP prefixes that azure firewall has learned to not SNAT. */
export function listLearnedPrefixes(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  options: AzureFirewallsListLearnedPrefixesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IPPrefixesList>, IPPrefixesList> {
  return getLongRunningPoller(context, _listLearnedPrefixesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _listLearnedPrefixesSend(context, resourceGroupName, azureFirewallName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<IPPrefixesList>, IPPrefixesList>;
}

export function _listAllSend(
  context: Client,
  options: AzureFirewallsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/azureFirewalls{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-05-01",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_AzureFirewallListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _azureFirewallListResultDeserializer(result.body);
}

/** Gets all the Azure Firewalls in a subscription. */
export function listAll(
  context: Client,
  options: AzureFirewallsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AzureFirewall> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: AzureFirewallsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-05-01",
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
): Promise<_AzureFirewallListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _azureFirewallListResultDeserializer(result.body);
}

/** Lists all Azure Firewalls in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: AzureFirewallsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AzureFirewall> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  options: AzureFirewallsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureFirewallName: azureFirewallName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** Deletes the specified Azure Firewall. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  options: AzureFirewallsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, azureFirewallName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  parameters: TagsObject,
  options: AzureFirewallsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureFirewallName: azureFirewallName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureFirewall> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return azureFirewallDeserializer(result.body);
}

/** Updates tags of an Azure Firewall resource. */
export function updateTags(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  parameters: TagsObject,
  options: AzureFirewallsUpdateTagsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AzureFirewall>, AzureFirewall> {
  return getLongRunningPoller(context, _updateTagsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateTagsSend(context, resourceGroupName, azureFirewallName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<AzureFirewall>, AzureFirewall>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  parameters: AzureFirewall,
  options: AzureFirewallsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureFirewallName: azureFirewallName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: azureFirewallSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureFirewall> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return azureFirewallDeserializer(result.body);
}

/** Creates or updates the specified Azure Firewall. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  parameters: AzureFirewall,
  options: AzureFirewallsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AzureFirewall>, AzureFirewall> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, azureFirewallName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<AzureFirewall>, AzureFirewall>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  options: AzureFirewallsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/azureFirewalls/{azureFirewallName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureFirewallName: azureFirewallName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AzureFirewall> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return azureFirewallDeserializer(result.body);
}

/** Gets the specified Azure Firewall. */
export async function get(
  context: Client,
  resourceGroupName: string,
  azureFirewallName: string,
  options: AzureFirewallsGetOptionalParams = { requestOptions: {} },
): Promise<AzureFirewall> {
  const result = await _getSend(context, resourceGroupName, azureFirewallName, options);
  return _getDeserialize(result);
}
