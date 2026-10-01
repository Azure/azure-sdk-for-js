// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  ManagedNetworkSettingsPropertiesBasicResource,
  _ManagedNetworkListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedNetworkSettingsPropertiesBasicResourceSerializer,
  managedNetworkSettingsPropertiesBasicResourceDeserializer,
  _managedNetworkListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedNetworkSettingsListOptionalParams,
  ManagedNetworkSettingsPatchOptionalParams,
  ManagedNetworkSettingsPutOptionalParams,
  ManagedNetworkSettingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ManagedNetworkSettingsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/managedNetworks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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
): Promise<_ManagedNetworkListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _managedNetworkListResultDeserializer(result.body);
}

/** List API for managed network settings of a machine learning workspace. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ManagedNetworkSettingsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedNetworkSettingsPropertiesBasicResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-15-preview",
    },
  );
}

export function _patchSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  options: ManagedNetworkSettingsPatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/managedNetworks/{managedNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedNetworkName: managedNetworkName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options?.body
      ? options?.body
      : managedNetworkSettingsPropertiesBasicResourceSerializer(options?.body),
  });
}

export async function _patchDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedNetworkSettingsPropertiesBasicResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedNetworkSettingsPropertiesBasicResourceDeserializer(result.body);
}

/** Patch API for managed network settings of a machine learning workspace. */
export function patch(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  options: ManagedNetworkSettingsPatchOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
  ManagedNetworkSettingsPropertiesBasicResource
> {
  return getLongRunningPoller(context, _patchDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _patchSend(context, resourceGroupName, workspaceName, managedNetworkName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<
    OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
    ManagedNetworkSettingsPropertiesBasicResource
  >;
}

export function _putSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  body: ManagedNetworkSettingsPropertiesBasicResource,
  options: ManagedNetworkSettingsPutOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/managedNetworks/{managedNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedNetworkName: managedNetworkName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedNetworkSettingsPropertiesBasicResourceSerializer(body),
  });
}

export async function _putDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedNetworkSettingsPropertiesBasicResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedNetworkSettingsPropertiesBasicResourceDeserializer(result.body);
}

/** PUT API for managed network settings of a machine learning workspace. */
export function put(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  body: ManagedNetworkSettingsPropertiesBasicResource,
  options: ManagedNetworkSettingsPutOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
  ManagedNetworkSettingsPropertiesBasicResource
> {
  return getLongRunningPoller(context, _putDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _putSend(context, resourceGroupName, workspaceName, managedNetworkName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-15-preview",
  }) as PollerLike<
    OperationState<ManagedNetworkSettingsPropertiesBasicResource>,
    ManagedNetworkSettingsPropertiesBasicResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  options: ManagedNetworkSettingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/managedNetworks/{managedNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedNetworkName: managedNetworkName,
      "api%2Dversion": context.apiVersion ?? "2026-03-15-preview",
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
): Promise<ManagedNetworkSettingsPropertiesBasicResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedNetworkSettingsPropertiesBasicResourceDeserializer(result.body);
}

/** Get API for managed network settings of a machine learning workspace. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedNetworkName: string,
  options: ManagedNetworkSettingsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedNetworkSettingsPropertiesBasicResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    managedNetworkName,
    options,
  );
  return _getDeserialize(result);
}
