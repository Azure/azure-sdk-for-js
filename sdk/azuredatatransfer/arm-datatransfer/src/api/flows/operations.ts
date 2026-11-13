// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext as Client } from "../index.js";
import type {
  ResourceBody,
  Flow,
  StreamSourceAddresses,
  FlowsPatch,
  _FlowListResult,
  GetDestinationEndpointPortsResult,
  GetDestinationEndpointsResult,
  GetStreamConnectionStringResult,
  SetDestinationEndpointPorts,
  SetDestinationEndpoints,
  SetStreamPassphrase,
  SetSourceAddresses,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  resourceBodySerializer,
  flowSerializer,
  flowDeserializer,
  streamSourceAddressesDeserializer,
  flowsPatchSerializer,
  _flowListResultDeserializer,
  getDestinationEndpointPortsResultDeserializer,
  getDestinationEndpointsResultDeserializer,
  getStreamConnectionStringResultDeserializer,
  setDestinationEndpointPortsSerializer,
  setDestinationEndpointsSerializer,
  setStreamPassphraseSerializer,
  setSourceAddressesSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FlowsSetSourceAddressesOptionalParams,
  FlowsSetPassphraseOptionalParams,
  FlowsSetDestinationEndpointsOptionalParams,
  FlowsSetDestinationEndpointPortsOptionalParams,
  FlowsLinkOptionalParams,
  FlowsGetStreamConnectionStringOptionalParams,
  FlowsGetSourceAddressesOptionalParams,
  FlowsGetDestinationEndpointsOptionalParams,
  FlowsGetDestinationEndpointPortsOptionalParams,
  FlowsGeneratePassphraseOptionalParams,
  FlowsEnableOptionalParams,
  FlowsDisableOptionalParams,
  FlowsListByConnectionOptionalParams,
  FlowsDeleteOptionalParams,
  FlowsUpdateOptionalParams,
  FlowsCreateOrUpdateOptionalParams,
  FlowsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _setSourceAddressesSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  sourceAddresses: SetSourceAddresses,
  options: FlowsSetSourceAddressesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/setSourceAddresses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: setSourceAddressesSerializer(sourceAddresses),
  });
}

export async function _setSourceAddressesDeserialize(result: PathUncheckedResponse): Promise<Flow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowDeserializer(result.body);
}

/** Set the source addresses for the specified flow. */
export function setSourceAddresses(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  sourceAddresses: SetSourceAddresses,
  options: FlowsSetSourceAddressesOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Flow>, Flow> {
  return getLongRunningPoller(context, _setSourceAddressesDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _setSourceAddressesSend(
        context,
        resourceGroupName,
        connectionName,
        flowName,
        sourceAddresses,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<Flow>, Flow>;
}

export function _setPassphraseSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  passphrase: SetStreamPassphrase,
  options: FlowsSetPassphraseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/setPassphrase{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: setStreamPassphraseSerializer(passphrase),
  });
}

export async function _setPassphraseDeserialize(result: PathUncheckedResponse): Promise<Flow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowDeserializer(result.body);
}

/** Sets the passphrase of the specified flow. */
export function setPassphrase(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  passphrase: SetStreamPassphrase,
  options: FlowsSetPassphraseOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Flow>, Flow> {
  return getLongRunningPoller(context, _setPassphraseDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _setPassphraseSend(context, resourceGroupName, connectionName, flowName, passphrase, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<Flow>, Flow>;
}

export function _setDestinationEndpointsSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  streamDestinationEndpoints: SetDestinationEndpoints,
  options: FlowsSetDestinationEndpointsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/setDestinationEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: setDestinationEndpointsSerializer(streamDestinationEndpoints),
  });
}

export async function _setDestinationEndpointsDeserialize(
  result: PathUncheckedResponse,
): Promise<Flow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowDeserializer(result.body);
}

/** Set the destination endpoints for the specified flow. */
export function setDestinationEndpoints(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  streamDestinationEndpoints: SetDestinationEndpoints,
  options: FlowsSetDestinationEndpointsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Flow>, Flow> {
  return getLongRunningPoller(context, _setDestinationEndpointsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _setDestinationEndpointsSend(
        context,
        resourceGroupName,
        connectionName,
        flowName,
        streamDestinationEndpoints,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<Flow>, Flow>;
}

export function _setDestinationEndpointPortsSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  streamDestinationEndpointPorts: SetDestinationEndpointPorts,
  options: FlowsSetDestinationEndpointPortsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/setDestinationEndpointPorts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: setDestinationEndpointPortsSerializer(streamDestinationEndpointPorts),
  });
}

export async function _setDestinationEndpointPortsDeserialize(
  result: PathUncheckedResponse,
): Promise<Flow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowDeserializer(result.body);
}

/** Set the destination endpoint ports for the specified flow. */
export function setDestinationEndpointPorts(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  streamDestinationEndpointPorts: SetDestinationEndpointPorts,
  options: FlowsSetDestinationEndpointPortsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Flow>, Flow> {
  return getLongRunningPoller(
    context,
    _setDestinationEndpointPortsDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _setDestinationEndpointPortsSend(
          context,
          resourceGroupName,
          connectionName,
          flowName,
          streamDestinationEndpointPorts,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-02-06-preview",
    },
  ) as PollerLike<OperationState<Flow>, Flow>;
}

export function _linkSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  flow: ResourceBody,
  options: FlowsLinkOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/link{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceBodySerializer(flow),
  });
}

export async function _linkDeserialize(result: PathUncheckedResponse): Promise<Flow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowDeserializer(result.body);
}

/** Links the specified flow. */
export function link(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  flow: ResourceBody,
  options: FlowsLinkOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Flow>, Flow> {
  return getLongRunningPoller(context, _linkDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _linkSend(context, resourceGroupName, connectionName, flowName, flow, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<Flow>, Flow>;
}

export function _getStreamConnectionStringSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGetStreamConnectionStringOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/getStreamConnectionString{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _getStreamConnectionStringDeserialize(
  result: PathUncheckedResponse,
): Promise<GetStreamConnectionStringResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return getStreamConnectionStringResultDeserializer(result.body);
}

/** Get the connection string for the specified flow. */
export async function getStreamConnectionString(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGetStreamConnectionStringOptionalParams = { requestOptions: {} },
): Promise<GetStreamConnectionStringResult> {
  const result = await _getStreamConnectionStringSend(
    context,
    resourceGroupName,
    connectionName,
    flowName,
    options,
  );
  return _getStreamConnectionStringDeserialize(result);
}

export function _getSourceAddressesSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGetSourceAddressesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/getSourceAddresses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _getSourceAddressesDeserialize(
  result: PathUncheckedResponse,
): Promise<StreamSourceAddresses> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return streamSourceAddressesDeserializer(result.body);
}

/** Get the source addresses for the specified flow. */
export async function getSourceAddresses(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGetSourceAddressesOptionalParams = { requestOptions: {} },
): Promise<StreamSourceAddresses> {
  const result = await _getSourceAddressesSend(
    context,
    resourceGroupName,
    connectionName,
    flowName,
    options,
  );
  return _getSourceAddressesDeserialize(result);
}

export function _getDestinationEndpointsSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGetDestinationEndpointsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/getDestinationEndpoints{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _getDestinationEndpointsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetDestinationEndpointsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return getDestinationEndpointsResultDeserializer(result.body);
}

/** Get the destination endpoints for the specified flow. */
export async function getDestinationEndpoints(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGetDestinationEndpointsOptionalParams = { requestOptions: {} },
): Promise<GetDestinationEndpointsResult> {
  const result = await _getDestinationEndpointsSend(
    context,
    resourceGroupName,
    connectionName,
    flowName,
    options,
  );
  return _getDestinationEndpointsDeserialize(result);
}

export function _getDestinationEndpointPortsSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGetDestinationEndpointPortsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/getDestinationEndpointPorts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _getDestinationEndpointPortsDeserialize(
  result: PathUncheckedResponse,
): Promise<GetDestinationEndpointPortsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return getDestinationEndpointPortsResultDeserializer(result.body);
}

/** Get the destination endpoint ports for the specified flow. */
export async function getDestinationEndpointPorts(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGetDestinationEndpointPortsOptionalParams = { requestOptions: {} },
): Promise<GetDestinationEndpointPortsResult> {
  const result = await _getDestinationEndpointPortsSend(
    context,
    resourceGroupName,
    connectionName,
    flowName,
    options,
  );
  return _getDestinationEndpointPortsDeserialize(result);
}

export function _generatePassphraseSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGeneratePassphraseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/generatePassphrase{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _generatePassphraseDeserialize(result: PathUncheckedResponse): Promise<Flow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowDeserializer(result.body);
}

/** Generate a compliant passphrase for the specified flow. */
export function generatePassphrase(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGeneratePassphraseOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Flow>, Flow> {
  return getLongRunningPoller(context, _generatePassphraseDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _generatePassphraseSend(context, resourceGroupName, connectionName, flowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<Flow>, Flow>;
}

export function _enableSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsEnableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/enable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _enableDeserialize(result: PathUncheckedResponse): Promise<Flow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowDeserializer(result.body);
}

/** Enables the specified flow. */
export function enable(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsEnableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Flow>, Flow> {
  return getLongRunningPoller(context, _enableDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _enableSend(context, resourceGroupName, connectionName, flowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<Flow>, Flow>;
}

export function _disableSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsDisableOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}/disable{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _disableDeserialize(result: PathUncheckedResponse): Promise<Flow> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowDeserializer(result.body);
}

/** Disables the specified flow */
export function disable(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsDisableOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Flow>, Flow> {
  return getLongRunningPoller(context, _disableDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _disableSend(context, resourceGroupName, connectionName, flowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<Flow>, Flow>;
}

export function _listByConnectionSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  options: FlowsListByConnectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _listByConnectionDeserialize(
  result: PathUncheckedResponse,
): Promise<_FlowListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _flowListResultDeserializer(result.body);
}

/** Gets flows in a connection. */
export function listByConnection(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  options: FlowsListByConnectionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Flow> {
  return buildPagedAsyncIterator(
    context,
    () => _listByConnectionSend(context, resourceGroupName, connectionName, options),
    _listByConnectionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-06-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

/** Deletes the flow resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, connectionName, flowName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  flow: FlowsPatch,
  options: FlowsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: flowsPatchSerializer(flow),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Updates the flow resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  flow: FlowsPatch,
  options: FlowsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, connectionName, flowName, flow, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  flow: Flow,
  options: FlowsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: flowSerializer(flow),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Flow> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowDeserializer(result.body);
}

/** Creates or updates the flow resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  flow: Flow,
  options: FlowsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Flow>, Flow> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, connectionName, flowName, flow, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<Flow>, Flow>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/connections/{connectionName}/flows/{flowName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      connectionName: connectionName,
      flowName: flowName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Flow> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowDeserializer(result.body);
}

/** Gets flow resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  connectionName: string,
  flowName: string,
  options: FlowsGetOptionalParams = { requestOptions: {} },
): Promise<Flow> {
  const result = await _getSend(context, resourceGroupName, connectionName, flowName, options);
  return _getDeserialize(result);
}
