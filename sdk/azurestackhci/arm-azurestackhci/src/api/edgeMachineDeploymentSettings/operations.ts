// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext as Client } from "../index.js";
import type {
  EdgeMachineDeploymentSetting,
  _EdgeMachineDeploymentSettingListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  edgeMachineDeploymentSettingSerializer,
  edgeMachineDeploymentSettingDeserializer,
  _edgeMachineDeploymentSettingListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  EdgeMachineDeploymentSettingsListByEdgeMachineOptionalParams,
  EdgeMachineDeploymentSettingsDeleteOptionalParams,
  EdgeMachineDeploymentSettingsCreateOrUpdateOptionalParams,
  EdgeMachineDeploymentSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByEdgeMachineSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  options: EdgeMachineDeploymentSettingsListByEdgeMachineOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/deploymentSettings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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

export async function _listByEdgeMachineDeserialize(
  result: PathUncheckedResponse,
): Promise<_EdgeMachineDeploymentSettingListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _edgeMachineDeploymentSettingListResultDeserializer(result.body);
}

/** List Edge Machine Deployment Setting resources by Edge Machine. */
export function listByEdgeMachine(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  options: EdgeMachineDeploymentSettingsListByEdgeMachineOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<EdgeMachineDeploymentSetting> {
  return buildPagedAsyncIterator(
    context,
    () => _listByEdgeMachineSend(context, resourceGroupName, edgeMachineName, options),
    _listByEdgeMachineDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-10-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  deploymentSettingName: string,
  options: EdgeMachineDeploymentSettingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/deploymentSettings/{deploymentSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      deploymentSettingName: deploymentSettingName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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

/** Delete an Edge Machine Deployment Setting. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  deploymentSettingName: string,
  options: EdgeMachineDeploymentSettingsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, edgeMachineName, deploymentSettingName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-10-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  deploymentSettingName: string,
  resource: EdgeMachineDeploymentSetting,
  options: EdgeMachineDeploymentSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/deploymentSettings/{deploymentSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      deploymentSettingName: deploymentSettingName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: edgeMachineDeploymentSettingSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeMachineDeploymentSetting> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return edgeMachineDeploymentSettingDeserializer(result.body);
}

/** Create or update an Edge Machine Deployment Setting. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  deploymentSettingName: string,
  resource: EdgeMachineDeploymentSetting,
  options: EdgeMachineDeploymentSettingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<EdgeMachineDeploymentSetting>, EdgeMachineDeploymentSetting> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        edgeMachineName,
        deploymentSettingName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01",
  }) as PollerLike<OperationState<EdgeMachineDeploymentSetting>, EdgeMachineDeploymentSetting>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  deploymentSettingName: string,
  options: EdgeMachineDeploymentSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/edgeMachines/{edgeMachineName}/deploymentSettings/{deploymentSettingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      edgeMachineName: edgeMachineName,
      deploymentSettingName: deploymentSettingName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<EdgeMachineDeploymentSetting> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return edgeMachineDeploymentSettingDeserializer(result.body);
}

/** Get an Edge Machine Deployment Setting. */
export async function get(
  context: Client,
  resourceGroupName: string,
  edgeMachineName: string,
  deploymentSettingName: string,
  options: EdgeMachineDeploymentSettingsGetOptionalParams = { requestOptions: {} },
): Promise<EdgeMachineDeploymentSetting> {
  const result = await _getSend(
    context,
    resourceGroupName,
    edgeMachineName,
    deploymentSettingName,
    options,
  );
  return _getDeserialize(result);
}
