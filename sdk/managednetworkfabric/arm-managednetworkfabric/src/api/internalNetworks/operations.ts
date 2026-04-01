// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext as Client } from "../index.js";
import type {
  UpdateAdministrativeState,
  UpdateAdministrativeStateResponse,
  InternalNetwork,
  InternalNetworkPatch,
  _InternalNetworksList,
  InternalNetworkUpdateBgpAdministrativeStateRequest,
  InternalNetworkUpdateBgpAdministrativeStateResponse,
  InternalNetworkUpdateBfdAdministrativeStateRequest,
  InternalNetworkUpdateBfdAdministrativeStateResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateAdministrativeStateSerializer,
  updateAdministrativeStateResponseDeserializer,
  internalNetworkSerializer,
  internalNetworkDeserializer,
  internalNetworkPatchSerializer,
  _internalNetworksListDeserializer,
  internalNetworkUpdateBgpAdministrativeStateRequestSerializer,
  internalNetworkUpdateBgpAdministrativeStateResponseDeserializer,
  internalNetworkUpdateBfdAdministrativeStateRequestSerializer,
  internalNetworkUpdateBfdAdministrativeStateResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams,
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
  body: InternalNetworkUpdateBfdAdministrativeStateRequest,
  options: InternalNetworksUpdateBfdAdministrativeStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}/updateBfdAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: internalNetworkUpdateBfdAdministrativeStateRequestSerializer(body),
  });
}

export async function _updateBfdAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<InternalNetworkUpdateBfdAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return internalNetworkUpdateBfdAdministrativeStateResponseDeserializer(result.body);
}

/** BFD administrative state for either static or bgp for internalNetwork. */
export function updateBfdAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: InternalNetworkUpdateBfdAdministrativeStateRequest,
  options: InternalNetworksUpdateBfdAdministrativeStateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<InternalNetworkUpdateBfdAdministrativeStateResponse>,
  InternalNetworkUpdateBfdAdministrativeStateResponse
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
      apiVersion: context.apiVersion ?? "2025-07-15",
    },
  ) as PollerLike<
    OperationState<InternalNetworkUpdateBfdAdministrativeStateResponse>,
    InternalNetworkUpdateBfdAdministrativeStateResponse
  >;
}

export function _updateStaticRouteBfdAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: UpdateAdministrativeState,
  options: InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}/updateStaticRouteBfdAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateAdministrativeStateSerializer(body),
  });
}

export async function _updateStaticRouteBfdAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return updateAdministrativeStateResponseDeserializer(result.body);
}

/** Update Static Route BFD administrative state for internalNetwork. */
export function updateStaticRouteBfdAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: UpdateAdministrativeState,
  options: InternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<UpdateAdministrativeStateResponse>,
  UpdateAdministrativeStateResponse
> {
  return getLongRunningPoller(
    context,
    _updateStaticRouteBfdAdministrativeStateDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateStaticRouteBfdAdministrativeStateSend(
          context,
          resourceGroupName,
          l3IsolationDomainName,
          internalNetworkName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-07-15",
    },
  ) as PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
}

export function _updateBgpAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: InternalNetworkUpdateBgpAdministrativeStateRequest,
  options: InternalNetworksUpdateBgpAdministrativeStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}/updateBgpAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: internalNetworkUpdateBgpAdministrativeStateRequestSerializer(body),
  });
}

export async function _updateBgpAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<InternalNetworkUpdateBgpAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return internalNetworkUpdateBgpAdministrativeStateResponseDeserializer(result.body);
}

/** Update BGP state for internalNetwork. Allowed only on edge devices. */
export function updateBgpAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: InternalNetworkUpdateBgpAdministrativeStateRequest,
  options: InternalNetworksUpdateBgpAdministrativeStateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<InternalNetworkUpdateBgpAdministrativeStateResponse>,
  InternalNetworkUpdateBgpAdministrativeStateResponse
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
      apiVersion: context.apiVersion ?? "2025-07-15",
    },
  ) as PollerLike<
    OperationState<InternalNetworkUpdateBgpAdministrativeStateResponse>,
    InternalNetworkUpdateBgpAdministrativeStateResponse
  >;
}

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: UpdateAdministrativeState,
  options: InternalNetworksUpdateAdministrativeStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}/updateAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateAdministrativeStateSerializer(body),
  });
}

export async function _updateAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return updateAdministrativeStateResponseDeserializer(result.body);
}

/** Executes update operation to enable or disable administrative State for InternalNetwork. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: UpdateAdministrativeState,
  options: InternalNetworksUpdateAdministrativeStateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<UpdateAdministrativeStateResponse>,
  UpdateAdministrativeStateResponse
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
      apiVersion: context.apiVersion ?? "2025-07-15",
    },
  ) as PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
}

export function _listByL3IsolationDomainSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  options: InternalNetworksListByL3IsolationDomainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _listByL3IsolationDomainDeserialize(
  result: PathUncheckedResponse,
): Promise<_InternalNetworksList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _internalNetworksListDeserializer(result.body);
}

/** Displays InternalNetworks list by resource group GET method. */
export function listByL3IsolationDomain(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  options: InternalNetworksListByL3IsolationDomainOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InternalNetwork> {
  return buildPagedAsyncIterator(
    context,
    () => _listByL3IsolationDomainSend(context, resourceGroupName, l3IsolationDomainName, options),
    _listByL3IsolationDomainDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-15" },
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, l3IsolationDomainName, internalNetworkName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: InternalNetworkPatch,
  options: InternalNetworksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: internalNetworkPatchSerializer(body),
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
  body: InternalNetworkPatch,
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
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<InternalNetwork>, InternalNetwork>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  internalNetworkName: string,
  body: InternalNetwork,
  options: InternalNetworksCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/internalNetworks/{internalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      internalNetworkName: internalNetworkName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: internalNetworkSerializer(body),
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
  body: InternalNetwork,
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
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-15",
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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
