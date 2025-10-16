// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext as Client } from "../index.js";
import type {
  Vault,
  VaultCreateOrUpdateParameters,
  VaultPatchParameters,
  _VaultListResult,
  VaultAccessPolicyParameters,
  DeletedVault,
  _DeletedVaultListResult,
  _ResourceListResult,
  TrackedResource,
  VaultCheckNameAvailabilityParameters,
  CheckNameAvailabilityResult,
  AccessPolicyUpdateKind,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  vaultDeserializer,
  vaultCreateOrUpdateParametersSerializer,
  vaultPatchParametersSerializer,
  _vaultListResultDeserializer,
  vaultAccessPolicyParametersSerializer,
  vaultAccessPolicyParametersDeserializer,
  deletedVaultDeserializer,
  _deletedVaultListResultDeserializer,
  _resourceListResultDeserializer,
  vaultCheckNameAvailabilityParametersSerializer,
  checkNameAvailabilityResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VaultsCheckNameAvailabilityOptionalParams,
  VaultsListOptionalParams,
  VaultsListDeletedOptionalParams,
  VaultsPurgeDeletedOptionalParams,
  VaultsGetDeletedOptionalParams,
  VaultsUpdateAccessPolicyOptionalParams,
  VaultsListBySubscriptionOptionalParams,
  VaultsListByResourceGroupOptionalParams,
  VaultsDeleteOptionalParams,
  VaultsUpdateOptionalParams,
  VaultsCreateOrUpdateOptionalParams,
  VaultsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  vaultName: VaultCheckNameAvailabilityParameters,
  options: VaultsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KeyVault/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: vaultCheckNameAvailabilityParametersSerializer(vaultName),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return checkNameAvailabilityResultDeserializer(result.body);
}

/** Checks that the vault name is valid and is not already in use. */
export async function checkNameAvailability(
  context: Client,
  vaultName: VaultCheckNameAvailabilityParameters,
  options: VaultsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(context, vaultName, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listSend(
  context: Client,
  options: VaultsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resources{?%24filter,%24top,api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      filter: "resourceType eq 'Microsoft.KeyVault/vaults'",
      "%24top": options?.top,
      apiVersion: "2015-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  context.pipeline.removePolicy({ name: "ClientApiVersionPolicy" });
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _resourceListResultDeserializer(result.body);
}

/** The List operation gets information about the vaults associated with the subscription. */
export function list(
  context: Client,
  options: VaultsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TrackedResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listDeletedSend(
  context: Client,
  options: VaultsListDeletedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KeyVault/deletedVaults{?api%2Dversion}",
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

export async function _listDeletedDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedVaultListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _deletedVaultListResultDeserializer(result.body);
}

/** Gets information about the deleted vaults in a subscription. */
export function listDeleted(
  context: Client,
  options: VaultsListDeletedOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedVault> {
  return buildPagedAsyncIterator(
    context,
    () => _listDeletedSend(context, options),
    _listDeletedDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _purgeDeletedSend(
  context: Client,
  location: string,
  vaultName: string,
  options: VaultsPurgeDeletedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KeyVault/locations/{location}/deletedVaults/{vaultName}/purge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      vaultName: vaultName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _purgeDeletedDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Permanently deletes the specified vault. aka Purges the deleted Azure key vault. */
export function purgeDeleted(
  context: Client,
  location: string,
  vaultName: string,
  options: VaultsPurgeDeletedOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeDeletedDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _purgeDeletedSend(context, location, vaultName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getDeletedSend(
  context: Client,
  location: string,
  vaultName: string,
  options: VaultsGetDeletedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KeyVault/locations/{location}/deletedVaults/{vaultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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

export async function _getDeletedDeserialize(result: PathUncheckedResponse): Promise<DeletedVault> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return deletedVaultDeserializer(result.body);
}

/** Gets the deleted Azure key vault. */
export async function getDeleted(
  context: Client,
  location: string,
  vaultName: string,
  options: VaultsGetDeletedOptionalParams = { requestOptions: {} },
): Promise<DeletedVault> {
  const result = await _getDeletedSend(context, location, vaultName, options);
  return _getDeletedDeserialize(result);
}

export function _updateAccessPolicySend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  operationKind: AccessPolicyUpdateKind,
  parameters: VaultAccessPolicyParameters,
  options: VaultsUpdateAccessPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}/accessPolicies/{operationKind}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vaultName: vaultName,
      operationKind: operationKind,
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
    body: vaultAccessPolicyParametersSerializer(parameters),
  });
}

export async function _updateAccessPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<VaultAccessPolicyParameters> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return vaultAccessPolicyParametersDeserializer(result.body);
}

/** Update access policies in a key vault in the specified subscription. */
export async function updateAccessPolicy(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  operationKind: AccessPolicyUpdateKind,
  parameters: VaultAccessPolicyParameters,
  options: VaultsUpdateAccessPolicyOptionalParams = { requestOptions: {} },
): Promise<VaultAccessPolicyParameters> {
  const result = await _updateAccessPolicySend(
    context,
    resourceGroupName,
    vaultName,
    operationKind,
    parameters,
    options,
  );
  return _updateAccessPolicyDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: VaultsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KeyVault/vaults{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_VaultListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _vaultListResultDeserializer(result.body);
}

/** The List operation gets information about the vaults associated with the subscription. */
export function listBySubscription(
  context: Client,
  options: VaultsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Vault> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: VaultsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults{?api%2Dversion,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
      "%24top": options?.top,
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
): Promise<_VaultListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _vaultListResultDeserializer(result.body);
}

/** The List operation gets information about the vaults associated with the subscription and within the specified resource group. */
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

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: VaultsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}{?api%2Dversion}",
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
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the specified Azure key vault. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: VaultsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, vaultName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: VaultPatchParameters,
  options: VaultsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}{?api%2Dversion}",
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: vaultPatchParametersSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Vault> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return vaultDeserializer(result.body);
}

/** Update a key vault in the specified subscription. */
export async function update(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: VaultPatchParameters,
  options: VaultsUpdateOptionalParams = { requestOptions: {} },
): Promise<Vault> {
  const result = await _updateSend(context, resourceGroupName, vaultName, parameters, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: VaultCreateOrUpdateParameters,
  options: VaultsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}{?api%2Dversion}",
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
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: vaultCreateOrUpdateParametersSerializer(parameters),
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

/** Create or update a key vault in the specified subscription. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: VaultCreateOrUpdateParameters,
  options: VaultsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Vault>, Vault> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, vaultName, parameters, options),
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
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/vaults/{vaultName}{?api%2Dversion}",
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

/** Gets the specified Azure key vault. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: VaultsGetOptionalParams = { requestOptions: {} },
): Promise<Vault> {
  const result = await _getSend(context, resourceGroupName, vaultName, options);
  return _getDeserialize(result);
}
