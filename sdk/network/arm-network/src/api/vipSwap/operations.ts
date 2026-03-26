// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  SwapResource,
  SwapResourceListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  swapResourceSerializer,
  swapResourceDeserializer,
  swapResourceListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VipSwapListOptionalParams,
  VipSwapCreateOptionalParams,
  VipSwapGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  groupName: string,
  resourceName: string,
  options: VipSwapListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/microsoft.Compute/cloudServices/{resourceName}/providers/Microsoft.Network/cloudServiceSlots{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      resourceName: resourceName,
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
): Promise<SwapResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return swapResourceListResultDeserializer(result.body);
}

/** Gets the list of SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production */
export async function list(
  context: Client,
  groupName: string,
  resourceName: string,
  options: VipSwapListOptionalParams = { requestOptions: {} },
): Promise<SwapResourceListResult> {
  const result = await _listSend(context, groupName, resourceName, options);
  return _listDeserialize(result);
}

export function _createSend(
  context: Client,
  groupName: string,
  resourceName: string,
  parameters: SwapResource,
  options: VipSwapCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/microsoft.Compute/cloudServices/{resourceName}/providers/Microsoft.Network/cloudServiceSlots/{singletonResource}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      resourceName: resourceName,
      singletonResource: "swap",
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: swapResourceSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Performs vip swap operation on swappable cloud services. */
export function create(
  context: Client,
  groupName: string,
  resourceName: string,
  parameters: SwapResource,
  options: VipSwapCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, groupName, resourceName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  groupName: string,
  resourceName: string,
  options: VipSwapGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/microsoft.Compute/cloudServices/{resourceName}/providers/Microsoft.Network/cloudServiceSlots/{singletonResource}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      groupName: groupName,
      resourceName: resourceName,
      singletonResource: "swap",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SwapResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return swapResourceDeserializer(result.body);
}

/** Gets the SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production */
export async function get(
  context: Client,
  groupName: string,
  resourceName: string,
  options: VipSwapGetOptionalParams = { requestOptions: {} },
): Promise<SwapResource> {
  const result = await _getSend(context, groupName, resourceName, options);
  return _getDeserialize(result);
}
