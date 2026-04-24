// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type {
  DevOpsConfiguration,
  _DevOpsConfigurationListResponse,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import {
  devOpsConfigurationSerializer,
  devOpsConfigurationDeserializer,
  _devOpsConfigurationListResponseDeserializer,
} from "../../models/securityConnectorsDevOpsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DevOpsConfigurationsListOptionalParams,
  DevOpsConfigurationsDeleteOptionalParams,
  DevOpsConfigurationsUpdateOptionalParams,
  DevOpsConfigurationsCreateOrUpdateOptionalParams,
  DevOpsConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: DevOpsConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      "api%2Dversion": "2025-11-01-preview",
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
): Promise<_DevOpsConfigurationListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _devOpsConfigurationListResponseDeserializer(result.body);
}

/** List DevOps Configurations. */
export function list(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: DevOpsConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DevOpsConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, securityConnectorName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-11-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: DevOpsConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      "api%2Dversion": "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a DevOps Connector. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: DevOpsConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, securityConnectorName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  devOpsConfiguration: DevOpsConfiguration,
  options: DevOpsConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      "api%2Dversion": "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: devOpsConfigurationSerializer(devOpsConfiguration),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DevOpsConfiguration> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return devOpsConfigurationDeserializer(result.body);
}

/** Updates a DevOps Configuration. */
export function update(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  devOpsConfiguration: DevOpsConfiguration,
  options: DevOpsConfigurationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DevOpsConfiguration>, DevOpsConfiguration> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, securityConnectorName, devOpsConfiguration, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-11-01-preview",
  }) as PollerLike<OperationState<DevOpsConfiguration>, DevOpsConfiguration>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  devOpsConfiguration: DevOpsConfiguration,
  options: DevOpsConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      "api%2Dversion": "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: devOpsConfigurationSerializer(devOpsConfiguration),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DevOpsConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return devOpsConfigurationDeserializer(result.body);
}

/** Creates or updates a DevOps Configuration. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  devOpsConfiguration: DevOpsConfiguration,
  options: DevOpsConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DevOpsConfiguration>, DevOpsConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        securityConnectorName,
        devOpsConfiguration,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-11-01-preview",
  }) as PollerLike<OperationState<DevOpsConfiguration>, DevOpsConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: DevOpsConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Security/securityConnectors/{securityConnectorName}/devops/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      securityConnectorName: securityConnectorName,
      "api%2Dversion": "2025-11-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DevOpsConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return devOpsConfigurationDeserializer(result.body);
}

/** Gets a DevOps Configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  securityConnectorName: string,
  options: DevOpsConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<DevOpsConfiguration> {
  const result = await _getSend(context, resourceGroupName, securityConnectorName, options);
  return _getDeserialize(result);
}
