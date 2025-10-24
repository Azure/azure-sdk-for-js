// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecoveryServicesContext as Client } from "../index.js";
import type { Vault, PatchVault, _VaultList } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  vaultSerializer,
  vaultDeserializer,
  patchVaultSerializer,
  errorResponseDeserializer,
  _vaultListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VaultsListByResourceGroupOptionalParams,
  VaultsListBySubscriptionIdOptionalParams,
  VaultsDeleteOptionalParams,
  VaultsUpdateOptionalParams,
  VaultsCreateOrUpdateOptionalParams,
  VaultsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: VaultsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_VaultList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _vaultListDeserializer(result.body);
}

/** Retrieve a list of Vaults. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: VaultsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Vault> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listBySubscriptionIdSend(
  context: Client,
  options: VaultsListBySubscriptionIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/vaults{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionIdDeserialize(
  result: PathUncheckedResponse,
): Promise<_VaultList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _vaultListDeserializer(result.body);
}

/** Fetches all the resources of the specified type in the subscription. */
export function listBySubscriptionId(
  context: Client,
  options: VaultsListBySubscriptionIdOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Vault> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionIdSend(context, options),
    _listBySubscriptionIdDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: VaultsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a vault. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: VaultsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, vaultName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  vault: PatchVault,
  options: VaultsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? {
            "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary,
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: patchVaultSerializer(vault),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Vault> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return vaultDeserializer(result.body);
}

/** Updates the vault. */
export function update(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  vault: PatchVault,
  options: VaultsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Vault>, Vault> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, vaultName, vault, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Vault>, Vault>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  vault: Vault,
  options: VaultsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
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
      ...(options?.xMsAuthorizationAuxiliary !== undefined
        ? {
            "x-ms-authorization-auxiliary": options?.xMsAuthorizationAuxiliary,
          }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: vaultSerializer(vault),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Vault> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return vaultDeserializer(result.body);
}

/** Creates or updates a Recovery Services vault. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  vault: Vault,
  options: VaultsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Vault>, Vault> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, vaultName, vault, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Vault>, Vault>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: VaultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Vault> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return vaultDeserializer(result.body);
}

/** Get the Vault details. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: VaultsGetOptionalParams = { requestOptions: {} },
): Promise<Vault> {
  const result = await _getSend(context, resourceGroupName, vaultName, options);
  return _getDeserialize(result);
}
