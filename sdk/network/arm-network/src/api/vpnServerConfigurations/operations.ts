// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  TagsObject,
  RadiusAuthServerListResult,
  VpnServerConfiguration,
  _ListVpnServerConfigurationsResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  tagsObjectSerializer,
  radiusAuthServerListResultDeserializer,
  vpnServerConfigurationSerializer,
  vpnServerConfigurationDeserializer,
  _listVpnServerConfigurationsResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VpnServerConfigurationsListRadiusSecretsOptionalParams,
  VpnServerConfigurationsListOptionalParams,
  VpnServerConfigurationsListByResourceGroupOptionalParams,
  VpnServerConfigurationsDeleteOptionalParams,
  VpnServerConfigurationsUpdateTagsOptionalParams,
  VpnServerConfigurationsCreateOrUpdateOptionalParams,
  VpnServerConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listRadiusSecretsSend(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  options: VpnServerConfigurationsListRadiusSecretsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}/listRadiusSecrets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vpnServerConfigurationName: vpnServerConfigurationName,
      "api%2Dversion": "2025-05-01",
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

export async function _listRadiusSecretsDeserialize(
  result: PathUncheckedResponse,
): Promise<RadiusAuthServerListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return radiusAuthServerListResultDeserializer(result.body);
}

/** List all Radius servers with respective radius secrets from VpnServerConfiguration. */
export async function listRadiusSecrets(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  options: VpnServerConfigurationsListRadiusSecretsOptionalParams = { requestOptions: {} },
): Promise<RadiusAuthServerListResult> {
  const result = await _listRadiusSecretsSend(
    context,
    resourceGroupName,
    vpnServerConfigurationName,
    options,
  );
  return _listRadiusSecretsDeserialize(result);
}

export function _listSend(
  context: Client,
  options: VpnServerConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/vpnServerConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
): Promise<_ListVpnServerConfigurationsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVpnServerConfigurationsResultDeserializer(result.body);
}

/** Lists all the VpnServerConfigurations in a subscription. */
export function list(
  context: Client,
  options: VpnServerConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VpnServerConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: VpnServerConfigurationsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVpnServerConfigurationsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVpnServerConfigurationsResultDeserializer(result.body);
}

/** Lists all the vpnServerConfigurations in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: VpnServerConfigurationsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VpnServerConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  options: VpnServerConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vpnServerConfigurationName: vpnServerConfigurationName,
      "api%2Dversion": "2025-05-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a VpnServerConfiguration. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  options: VpnServerConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, vpnServerConfigurationName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  vpnServerConfigurationParameters: TagsObject,
  options: VpnServerConfigurationsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vpnServerConfigurationName: vpnServerConfigurationName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(vpnServerConfigurationParameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnServerConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnServerConfigurationDeserializer(result.body);
}

/** Updates VpnServerConfiguration tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  vpnServerConfigurationParameters: TagsObject,
  options: VpnServerConfigurationsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<VpnServerConfiguration> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    vpnServerConfigurationName,
    vpnServerConfigurationParameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  vpnServerConfigurationParameters: VpnServerConfiguration,
  options: VpnServerConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vpnServerConfigurationName: vpnServerConfigurationName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: vpnServerConfigurationSerializer(vpnServerConfigurationParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnServerConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnServerConfigurationDeserializer(result.body);
}

/** Creates a VpnServerConfiguration resource if it doesn't exist else updates the existing VpnServerConfiguration. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  vpnServerConfigurationParameters: VpnServerConfiguration,
  options: VpnServerConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VpnServerConfiguration>, VpnServerConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        vpnServerConfigurationParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VpnServerConfiguration>, VpnServerConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  options: VpnServerConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vpnServerConfigurationName: vpnServerConfigurationName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnServerConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnServerConfigurationDeserializer(result.body);
}

/** Retrieves the details of a VpnServerConfiguration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  options: VpnServerConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<VpnServerConfiguration> {
  const result = await _getSend(context, resourceGroupName, vpnServerConfigurationName, options);
  return _getDeserialize(result);
}
