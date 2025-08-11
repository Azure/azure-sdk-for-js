// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  GuestAgent,
  guestAgentSerializer,
  guestAgentDeserializer,
  _GuestAgentListResult,
  _guestAgentListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GuestAgentsListByVirtualMachineInstanceOptionalParams,
  GuestAgentsDeleteOptionalParams,
  GuestAgentsCreateOptionalParams,
  GuestAgentsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByVirtualMachineInstanceSend(
  context: Client,
  resourceUri: string,
  options: GuestAgentsListByVirtualMachineInstanceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/guestAgents{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

export async function _listByVirtualMachineInstanceDeserialize(
  result: PathUncheckedResponse,
): Promise<_GuestAgentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _guestAgentListResultDeserializer(result.body);
}

/** Returns the list of GuestAgent of the given vm. */
export function listByVirtualMachineInstance(
  context: Client,
  resourceUri: string,
  options: GuestAgentsListByVirtualMachineInstanceOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<GuestAgent> {
  return buildPagedAsyncIterator(
    context,
    () => _listByVirtualMachineInstanceSend(context, resourceUri, options),
    _listByVirtualMachineInstanceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceUri: string,
  options: GuestAgentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/guestAgents/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
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

/** Implements GuestAgent DELETE method. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceUri: string,
  options: GuestAgentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceUri, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceUri: string,
  resource: GuestAgent,
  options: GuestAgentsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/guestAgents/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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
    body: guestAgentSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<GuestAgent> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return guestAgentDeserializer(result.body);
}

/** Create Or Update GuestAgent. */
export function create(
  context: Client,
  resourceUri: string,
  resource: GuestAgent,
  options: GuestAgentsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GuestAgent>, GuestAgent> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, resourceUri, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<GuestAgent>, GuestAgent>;
}

export function _getSend(
  context: Client,
  resourceUri: string,
  options: GuestAgentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.AzureStackHCI/virtualMachineInstances/default/guestAgents/default{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<GuestAgent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return guestAgentDeserializer(result.body);
}

/** Implements GuestAgent GET method. */
export async function get(
  context: Client,
  resourceUri: string,
  options: GuestAgentsGetOptionalParams = { requestOptions: {} },
): Promise<GuestAgent> {
  const result = await _getSend(context, resourceUri, options);
  return _getDeserialize(result);
}
