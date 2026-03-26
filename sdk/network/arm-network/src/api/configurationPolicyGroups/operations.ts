// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  VpnServerConfigurationPolicyGroup,
  _ListVpnServerConfigurationPolicyGroupsResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  vpnServerConfigurationPolicyGroupSerializer,
  vpnServerConfigurationPolicyGroupDeserializer,
  _listVpnServerConfigurationPolicyGroupsResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ConfigurationPolicyGroupsListByVpnServerConfigurationOptionalParams,
  ConfigurationPolicyGroupsDeleteOptionalParams,
  ConfigurationPolicyGroupsCreateOrUpdateOptionalParams,
  ConfigurationPolicyGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByVpnServerConfigurationSend(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  options: ConfigurationPolicyGroupsListByVpnServerConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}/configurationPolicyGroups{?api%2Dversion}",
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

export async function _listByVpnServerConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListVpnServerConfigurationPolicyGroupsResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVpnServerConfigurationPolicyGroupsResultDeserializer(result.body);
}

/** Lists all the configurationPolicyGroups in a resource group for a vpnServerConfiguration. */
export function listByVpnServerConfiguration(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  options: ConfigurationPolicyGroupsListByVpnServerConfigurationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VpnServerConfigurationPolicyGroup> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByVpnServerConfigurationSend(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        options,
      ),
    _listByVpnServerConfigurationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  configurationPolicyGroupName: string,
  options: ConfigurationPolicyGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}/configurationPolicyGroups/{configurationPolicyGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vpnServerConfigurationName: vpnServerConfigurationName,
      configurationPolicyGroupName: configurationPolicyGroupName,
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

/** Deletes a ConfigurationPolicyGroup. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  configurationPolicyGroupName: string,
  options: ConfigurationPolicyGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        configurationPolicyGroupName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  configurationPolicyGroupName: string,
  vpnServerConfigurationPolicyGroupParameters: VpnServerConfigurationPolicyGroup,
  options: ConfigurationPolicyGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}/configurationPolicyGroups/{configurationPolicyGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vpnServerConfigurationName: vpnServerConfigurationName,
      configurationPolicyGroupName: configurationPolicyGroupName,
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
    body: vpnServerConfigurationPolicyGroupSerializer(vpnServerConfigurationPolicyGroupParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VpnServerConfigurationPolicyGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnServerConfigurationPolicyGroupDeserializer(result.body);
}

/** Creates a ConfigurationPolicyGroup if it doesn't exist else updates the existing one. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  configurationPolicyGroupName: string,
  vpnServerConfigurationPolicyGroupParameters: VpnServerConfigurationPolicyGroup,
  options: ConfigurationPolicyGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<VpnServerConfigurationPolicyGroup>,
  VpnServerConfigurationPolicyGroup
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        vpnServerConfigurationName,
        configurationPolicyGroupName,
        vpnServerConfigurationPolicyGroupParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<
    OperationState<VpnServerConfigurationPolicyGroup>,
    VpnServerConfigurationPolicyGroup
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  configurationPolicyGroupName: string,
  options: ConfigurationPolicyGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/{vpnServerConfigurationName}/configurationPolicyGroups/{configurationPolicyGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vpnServerConfigurationName: vpnServerConfigurationName,
      configurationPolicyGroupName: configurationPolicyGroupName,
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
): Promise<VpnServerConfigurationPolicyGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return vpnServerConfigurationPolicyGroupDeserializer(result.body);
}

/** Retrieves the details of a ConfigurationPolicyGroup. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vpnServerConfigurationName: string,
  configurationPolicyGroupName: string,
  options: ConfigurationPolicyGroupsGetOptionalParams = { requestOptions: {} },
): Promise<VpnServerConfigurationPolicyGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    vpnServerConfigurationName,
    configurationPolicyGroupName,
    options,
  );
  return _getDeserialize(result);
}
