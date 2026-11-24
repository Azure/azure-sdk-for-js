// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext as Client } from "../index.js";
import type {
  NetworkSecurityPerimeterConfiguration,
  _NetworkSecurityPerimeterConfigurationListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  networkSecurityPerimeterConfigurationDeserializer,
  _networkSecurityPerimeterConfigurationListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkSecurityPerimeterConfigurationsReconcileConfigurationOptionalParams,
  NetworkSecurityPerimeterConfigurationsListConfigurationsOptionalParams,
  NetworkSecurityPerimeterConfigurationsGetConfigurationOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _reconcileConfigurationSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}/reconcile{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      networkSecurityPerimeterConfigurationName: networkSecurityPerimeterConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _reconcileConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Reconciles the specified network security perimeter configuration for a key vault. */
export async function reconcileConfiguration(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: NetworkSecurityPerimeterConfigurationsReconcileConfigurationOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _reconcileConfigurationSend(
    context,
    resourceGroupName,
    vaultName,
    networkSecurityPerimeterConfigurationName,
    options,
  );
  return _reconcileConfigurationDeserialize(result);
}

export function _listConfigurationsSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: NetworkSecurityPerimeterConfigurationsListConfigurationsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/networkSecurityPerimeterConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _listConfigurationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkSecurityPerimeterConfigurationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _networkSecurityPerimeterConfigurationListResultDeserializer(result.body);
}

/** Lists the network security perimeter configurations associated with a key vault. */
export function listConfigurations(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: NetworkSecurityPerimeterConfigurationsListConfigurationsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkSecurityPerimeterConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () => _listConfigurationsSend(context, resourceGroupName, vaultName, options),
    _listConfigurationsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _getConfigurationSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: NetworkSecurityPerimeterConfigurationsGetConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/networkSecurityPerimeterConfigurations/{networkSecurityPerimeterConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      networkSecurityPerimeterConfigurationName: networkSecurityPerimeterConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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

export async function _getConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkSecurityPerimeterConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return networkSecurityPerimeterConfigurationDeserializer(result.body);
}

/** Gets the specified network security perimeter configuration for a key vault. */
export async function getConfiguration(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  networkSecurityPerimeterConfigurationName: string,
  options: NetworkSecurityPerimeterConfigurationsGetConfigurationOptionalParams = {
    requestOptions: {},
  },
): Promise<NetworkSecurityPerimeterConfiguration> {
  const result = await _getConfigurationSend(
    context,
    resourceGroupName,
    vaultName,
    networkSecurityPerimeterConfigurationName,
    options,
  );
  return _getConfigurationDeserialize(result);
}
