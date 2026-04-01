// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext as Client } from "../index.js";
import type {
  UpdateAdministrativeState,
  UpdateAdministrativeStateResponse,
  ExternalNetwork,
  ExternalNetworkPatch,
  _ExternalNetworksList,
  ExternalNetworkUpdateBfdAdministrativeStateRequest,
  ExternalNetworkUpdateBfdAdministrativeStateResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateAdministrativeStateSerializer,
  updateAdministrativeStateResponseDeserializer,
  externalNetworkSerializer,
  externalNetworkDeserializer,
  externalNetworkPatchSerializer,
  _externalNetworksListDeserializer,
  externalNetworkUpdateBfdAdministrativeStateRequestSerializer,
  externalNetworkUpdateBfdAdministrativeStateResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExternalNetworksUpdateBfdAdministrativeStateOptionalParams,
  ExternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams,
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
  body: ExternalNetworkUpdateBfdAdministrativeStateRequest,
  options: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}/updateBfdAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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
    body: externalNetworkUpdateBfdAdministrativeStateRequestSerializer(body),
  });
}

export async function _updateBfdAdministrativeStateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExternalNetworkUpdateBfdAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return externalNetworkUpdateBfdAdministrativeStateResponseDeserializer(result.body);
}

/** BFD administrative state for either static or bgp for internalNetwork. */
export function updateBfdAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: ExternalNetworkUpdateBfdAdministrativeStateRequest,
  options: ExternalNetworksUpdateBfdAdministrativeStateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ExternalNetworkUpdateBfdAdministrativeStateResponse>,
  ExternalNetworkUpdateBfdAdministrativeStateResponse
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
      apiVersion: context.apiVersion ?? "2025-07-15",
    },
  ) as PollerLike<
    OperationState<ExternalNetworkUpdateBfdAdministrativeStateResponse>,
    ExternalNetworkUpdateBfdAdministrativeStateResponse
  >;
}

export function _updateStaticRouteBfdAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: UpdateAdministrativeState,
  options: ExternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}/updateStaticRouteBfdAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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

/** Update Static Route BFD for external Network. */
export function updateStaticRouteBfdAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: UpdateAdministrativeState,
  options: ExternalNetworksUpdateStaticRouteBfdAdministrativeStateOptionalParams = {
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
          externalNetworkName,
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

export function _updateAdministrativeStateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: UpdateAdministrativeState,
  options: ExternalNetworksUpdateAdministrativeStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}/updateAdministrativeState{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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

/** Executes update operation to enable or disable administrative State for externalNetwork. */
export function updateAdministrativeState(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: UpdateAdministrativeState,
  options: ExternalNetworksUpdateAdministrativeStateOptionalParams = { requestOptions: {} },
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
          externalNetworkName,
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
  options: ExternalNetworksListByL3IsolationDomainOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks{?api%2Dversion}",
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
): Promise<_ExternalNetworksList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _externalNetworksListDeserializer(result.body);
}

/** Implements External Networks list by resource group GET method. */
export function listByL3IsolationDomain(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  options: ExternalNetworksListByL3IsolationDomainOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExternalNetwork> {
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
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, l3IsolationDomainName, externalNetworkName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: ExternalNetworkPatch,
  options: ExternalNetworksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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
    body: externalNetworkPatchSerializer(body),
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
  body: ExternalNetworkPatch,
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
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<ExternalNetwork>, ExternalNetwork>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  l3IsolationDomainName: string,
  externalNetworkName: string,
  body: ExternalNetwork,
  options: ExternalNetworksCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/l3IsolationDomains/{l3IsolationDomainName}/externalNetworks/{externalNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      l3IsolationDomainName: l3IsolationDomainName,
      externalNetworkName: externalNetworkName,
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
    body: externalNetworkSerializer(body),
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
  body: ExternalNetwork,
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
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-15",
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
