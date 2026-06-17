// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext as Client } from "./index.js";
import type { MachineExtensionUpgrade, SetupExtensionRequest } from "../models/models.js";
import {
  machineExtensionUpgradeSerializer,
  errorResponseDeserializer,
  setupExtensionRequestSerializer,
  setupExtensionRequestDeserializer,
} from "../models/models.js";
import { getLongRunningPoller } from "../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { SetupExtensionsOptionalParams, UpgradeExtensionsOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _setupExtensionsSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensions: SetupExtensionRequest,
  options: SetupExtensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/addExtensions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: setupExtensionRequestSerializer(extensions),
  });
}

export async function _setupExtensionsDeserialize(
  result: PathUncheckedResponse,
): Promise<SetupExtensionRequest> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return setupExtensionRequestDeserializer(result.body);
}

/** The operation to Setup Machine Extensions. */
export function setupExtensions(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensions: SetupExtensionRequest,
  options: SetupExtensionsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SetupExtensionRequest>, SetupExtensionRequest> {
  return getLongRunningPoller(context, _setupExtensionsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _setupExtensionsSend(context, resourceGroupName, machineName, extensions, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<SetupExtensionRequest>, SetupExtensionRequest>;
}

export function _upgradeExtensionsSend(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensionUpgradeParameters: MachineExtensionUpgrade,
  options: UpgradeExtensionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/upgradeExtensions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
      "api%2Dversion": context.apiVersion ?? "2025-09-16-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: machineExtensionUpgradeSerializer(extensionUpgradeParameters),
  });
}

export async function _upgradeExtensionsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** The operation to Upgrade Machine Extensions. */
export function upgradeExtensions(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  extensionUpgradeParameters: MachineExtensionUpgrade,
  options: UpgradeExtensionsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _upgradeExtensionsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradeExtensionsSend(
        context,
        resourceGroupName,
        machineName,
        extensionUpgradeParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-16-preview",
  }) as PollerLike<OperationState<void>, void>;
}
