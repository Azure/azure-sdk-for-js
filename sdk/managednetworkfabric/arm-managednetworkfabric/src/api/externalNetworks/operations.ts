// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext as Client } from "../index.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ExternalNetwork,
  ExternalNetworkPatch,
  _ExternalNetworkListResult,
  ExternalNetworkBfdAdministrativeStateRequest,
  ExternalNetworkBfdAdministrativeStateResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateAdministrativeStateSerializer,
  commonPostActionResponseForStateUpdateDeserializer,
  externalNetworkSerializer,
  externalNetworkDeserializer,
  externalNetworkPatchSerializer,
  _externalNetworkListResultDeserializer,
  externalNetworkBfdAdministrativeStateRequestSerializer,
  externalNetworkBfdAdministrativeStateResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ExternalNetworksUpdateAdministrativeStateOptionalParams,
  ExternalNetworksListByL3IsolationDomainOptionalParams,
  ExternalNetworksDeleteOptionalParams,
  ExternalNetworksUpdateOptionalParams,
  ExternalNetworksCreateOptionalParams,
  ExternalNetworksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _updateBfdAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: ExternalNetworkBfdAdministrativeStateRequest,
  options: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}/updateBfdAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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
    body: externalNetworkBfdAdministrativeStateRequestSerializer(body),
  });
}

export async function _updateBfdAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExternalNetworkBfdAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return externalNetworkBfdAdministrativeStateResponseDeserializer(result.body);
}

/** BFD administrative state for either static or bgp for internalNetwork. */
export function updateBfdAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: ExternalNetworkBfdAdministrativeStateRequest,
  options: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<ExternalNetworkBfdAdministrativeStateResponse>,
  ExternalNetworkBfdAdministrativeStateResponse
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
          externalNetworkName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<ExternalNetworkBfdAdministrativeStateResponse>,
    ExternalNetworkBfdAdministrativeStateResponse
  >;
}

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: UpdateAdministrativeState,
  options: ExternalNetworksUpdateAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}/updateAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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

/** Executes update operation to enable or disable administrative State for externalNetwork. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: UpdateAdministrativeState,
  options: ExternalNetworksUpdateAdministrativeStateOptionalParams = {
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
          externalNetworkName,
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
  options: ExternalNetworksListByL3IsolationDomainOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks{?api%2Dversion}",
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
): Promise<_ExternalNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _externalNetworkListResultDeserializer(result.body);
}

/** Implements External Networks list by resource group GET method. */
export function listByL3IsolationDomain(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  options: ExternalNetworksListByL3IsolationDomainOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ExternalNetwork> {
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
  externalNetworkName: string,
  options: ExternalNetworksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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

/** Implements ExternalNetworks DELETE method. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  options: ExternalNetworksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, l3IsolationDomainName, externalNetworkName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  properties: ExternalNetworkPatch,
  options: ExternalNetworksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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
    body: externalNetworkPatchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ExternalNetwork> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return externalNetworkDeserializer(result.body);
}

/** API to update certain properties of the ExternalNetworks resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  properties: ExternalNetworkPatch,
  options: ExternalNetworksUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExternalNetwork>, ExternalNetwork> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ExternalNetwork>, ExternalNetwork>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  resource: ExternalNetwork,
  options: ExternalNetworksCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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
    body: externalNetworkSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<ExternalNetwork> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return externalNetworkDeserializer(result.body);
}

/** Creates ExternalNetwork PUT method. */
export function create(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  resource: ExternalNetwork,
  options: ExternalNetworksCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExternalNetwork>, ExternalNetwork> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        l3IsolationDomainName,
        externalNetworkName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ExternalNetwork>, ExternalNetwork>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  options: ExternalNetworksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExternalNetwork> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return externalNetworkDeserializer(result.body);
}

/** Implements ExternalNetworks GET method. */
export async function get(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  options: ExternalNetworksGetOptionalParams = { requestOptions: {} },
): Promise<ExternalNetwork> {
  const result = await _getSend(
    context,
    resourceGroupName,
    l3IsolationDomainName,
    externalNetworkName,
    options,
  );
  return _getDeserialize(result);
}
