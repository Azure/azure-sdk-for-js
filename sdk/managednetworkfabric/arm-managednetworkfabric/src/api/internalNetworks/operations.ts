// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext as Client } from "../index.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  InternalNetwork,
  InternalNetworkPatch,
  _InternalNetworkListResult,
  InternalNetworkBgpAdministrativeStateRequest,
  InternalNetworkBgpAdministrativeStateResponse,
  InternalNetworkBfdAdministrativeStateRequest,
  InternalNetworkBfdAdministrativeStateResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateAdministrativeStateSerializer,
  commonPostActionResponseForStateUpdateDeserializer,
  internalNetworkSerializer,
  internalNetworkDeserializer,
  internalNetworkPatchSerializer,
  _internalNetworkListResultDeserializer,
  internalNetworkBgpAdministrativeStateRequestSerializer,
  internalNetworkBgpAdministrativeStateResponseDeserializer,
  internalNetworkBfdAdministrativeStateRequestSerializer,
  internalNetworkBfdAdministrativeStateResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  InternalNetworksUpdateBgpAdministrativeStateOptionalParams,
  InternalNetworksUpdateAdministrativeStateOptionalParams,
  InternalNetworksListByL3IsolationDomainOptionalParams,
  InternalNetworksDeleteOptionalParams,
  InternalNetworksUpdateOptionalParams,
  InternalNetworksCreateOptionalParams,
  InternalNetworksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateBfdAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: InternalNetworkBfdAdministrativeStateRequest,
  options: InternalNetworksUpdateBfdAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}/updateBfdAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: internalNetworkBfdAdministrativeStateRequestSerializer(body),
  });
}

export async function _updateBfdAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<InternalNetworkBfdAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return internalNetworkBfdAdministrativeStateResponseDeserializer(result.body);
}

/** BFD administrative state for either static or bgp for internalNetwork. */
export function updateBfdAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: InternalNetworkBfdAdministrativeStateRequest,
  options: InternalNetworksUpdateBfdAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<InternalNetworkBfdAdministrativeStateResponse>,
  InternalNetworkBfdAdministrativeStateResponse
> {
  return getLongRunningPoller(
    context,
    _updateBfdAdministrativeStateDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateBfdAdministrativeStateSend(
          context,
          resourceGroupName,
          l3IsolationDomainName,
          internalNetworkName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<InternalNetworkBfdAdministrativeStateResponse>,
    InternalNetworkBfdAdministrativeStateResponse
  >;
}

export function _updateBgpAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: InternalNetworkBgpAdministrativeStateRequest,
  options: InternalNetworksUpdateBgpAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}/updateBgpAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: internalNetworkBgpAdministrativeStateRequestSerializer(body),
  });
}

export async function _updateBgpAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<InternalNetworkBgpAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return internalNetworkBgpAdministrativeStateResponseDeserializer(result.body);
}

/** Update BGP state for internalNetwork. Allowed only on edge devices. */
export function updateBgpAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: InternalNetworkBgpAdministrativeStateRequest,
  options: InternalNetworksUpdateBgpAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<InternalNetworkBgpAdministrativeStateResponse>,
  InternalNetworkBgpAdministrativeStateResponse
> {
  return getLongRunningPoller(
    context,
    _updateBgpAdministrativeStateDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateBgpAdministrativeStateSend(
          context,
          resourceGroupName,
          l3IsolationDomainName,
          internalNetworkName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<InternalNetworkBgpAdministrativeStateResponse>,
    InternalNetworkBgpAdministrativeStateResponse
  >;
}

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: UpdateAdministrativeState,
  options: InternalNetworksUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}/updateAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateAdministrativeStateSerializer(body),
  });
}

export async function _updateAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForStateUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForStateUpdateDeserializer(result.body);
}

/** Update Administrative state of  InternalNetworks on resources referred by their resource ids. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: UpdateAdministrativeState,
  options: InternalNetworksUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(
    context,
    _updateAdministrativeStateDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateAdministrativeStateSend(
          context,
          resourceGroupName,
          l3IsolationDomainName,
          internalNetworkName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _listByL3IsolationDomainSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  options: InternalNetworksListByL3IsolationDomainOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
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

export async function _listByL3IsolationDomainDeserialize(
  result: PathUncheckedResponse,
): Promise<_InternalNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _internalNetworkListResultDeserializer(result.body);
}

/** Displays InternalNetworks list by resource group GET method. */
export function listByL3IsolationDomain(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  options: InternalNetworksListByL3IsolationDomainOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<InternalNetwork> {
  return buildPagedAsyncIterator(
    context,
    () => _listByL3IsolationDomainSend(context, resourceGroupName, l3IsolationDomainName, options),
    _listByL3IsolationDomainDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  options: InternalNetworksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** Implements InternalNetworks DELETE method. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  options: InternalNetworksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, l3IsolationDomainName, internalNetworkName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  properties: InternalNetworkPatch,
  options: InternalNetworksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: internalNetworkPatchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<InternalNetwork> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return internalNetworkDeserializer(result.body);
}

/** Updates a InternalNetworks. */
export function update(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  properties: InternalNetworkPatch,
  options: InternalNetworksUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InternalNetwork>, InternalNetwork> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<InternalNetwork>, InternalNetwork>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  resource: InternalNetwork,
  options: InternalNetworksCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: internalNetworkSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<InternalNetwork> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return internalNetworkDeserializer(result.body);
}

/** Creates InternalNetwork PUT method. */
export function create(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  resource: InternalNetwork,
  options: InternalNetworksCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InternalNetwork>, InternalNetwork> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        internalNetworkName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<InternalNetwork>, InternalNetwork>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  options: InternalNetworksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InternalNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return internalNetworkDeserializer(result.body);
}

/** Gets a InternalNetworks. */
export async function get(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  options: InternalNetworksGetOptionalParams = { requestOptions: {} },
): Promise<InternalNetwork> {
  const result = await _getSend(
    context,
    resourceGroupName,
    l3IsolationDomainName,
    internalNetworkName,
    options,
  );
  return _getDeserialize(result);
}
