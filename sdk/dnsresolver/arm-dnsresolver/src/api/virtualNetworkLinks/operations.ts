// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DnsResolverManagementContext as Client } from "../index.js";
import type {
  VirtualNetworkLink,
  VirtualNetworkLinkPatch,
  _VirtualNetworkLinkListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  virtualNetworkLinkSerializer,
  virtualNetworkLinkDeserializer,
  virtualNetworkLinkPatchSerializer,
  _virtualNetworkLinkListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworkLinksListOptionalParams,
  VirtualNetworkLinksDeleteOptionalParams,
  VirtualNetworkLinksUpdateOptionalParams,
  VirtualNetworkLinksCreateOrUpdateOptionalParams,
  VirtualNetworkLinksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  options: VirtualNetworkLinksListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/virtualNetworkLinks{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
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
): Promise<_VirtualNetworkLinkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _virtualNetworkLinkListResultDeserializer(result.body);
}

/** Lists virtual network links to a DNS forwarding ruleset. */
export function list(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  options: VirtualNetworkLinksListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualNetworkLink> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, dnsForwardingRulesetName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  virtualNetworkLinkName: string,
  options: VirtualNetworkLinksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/virtualNetworkLinks/{virtualNetworkLinkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
      virtualNetworkLinkName: virtualNetworkLinkName,
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
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a virtual network link to a DNS forwarding ruleset. WARNING: This operation cannot be undone. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  virtualNetworkLinkName: string,
  options: VirtualNetworkLinksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  virtualNetworkLinkName: string,
  parameters: VirtualNetworkLinkPatch,
  options: VirtualNetworkLinksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/virtualNetworkLinks/{virtualNetworkLinkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
      virtualNetworkLinkName: virtualNetworkLinkName,
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
    body: virtualNetworkLinkPatchSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkLink> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualNetworkLinkDeserializer(result.body);
}

/** Updates a virtual network link to a DNS forwarding ruleset. */
export function update(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  virtualNetworkLinkName: string,
  parameters: VirtualNetworkLinkPatch,
  options: VirtualNetworkLinksUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  virtualNetworkLinkName: string,
  parameters: VirtualNetworkLink,
  options: VirtualNetworkLinksCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/virtualNetworkLinks/{virtualNetworkLinkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
      virtualNetworkLinkName: virtualNetworkLinkName,
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
    body: virtualNetworkLinkSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkLink> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualNetworkLinkDeserializer(result.body);
}

/** Creates or updates a virtual network link to a DNS forwarding ruleset. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  virtualNetworkLinkName: string,
  parameters: VirtualNetworkLink,
  options: VirtualNetworkLinksCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        dnsForwardingRulesetName,
        virtualNetworkLinkName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<VirtualNetworkLink>, VirtualNetworkLink>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  virtualNetworkLinkName: string,
  options: VirtualNetworkLinksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/dnsForwardingRulesets/{dnsForwardingRulesetName}/virtualNetworkLinks/{virtualNetworkLinkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dnsForwardingRulesetName: dnsForwardingRulesetName,
      virtualNetworkLinkName: virtualNetworkLinkName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VirtualNetworkLink> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return virtualNetworkLinkDeserializer(result.body);
}

/** Gets properties of a virtual network link to a DNS forwarding ruleset. */
export async function get(
  context: Client,
  resourceGroupName: string,
  dnsForwardingRulesetName: string,
  virtualNetworkLinkName: string,
  options: VirtualNetworkLinksGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkLink> {
  const result = await _getSend(
    context,
    resourceGroupName,
    dnsForwardingRulesetName,
    virtualNetworkLinkName,
    options,
  );
  return _getDeserialize(result);
}
