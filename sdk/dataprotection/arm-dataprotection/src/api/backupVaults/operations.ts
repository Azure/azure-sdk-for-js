// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext as Client } from "../index.js";
import type {
  BackupVaultResource,
  PatchResourceRequestInput,
  _BackupVaultResourceList,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  backupVaultResourceSerializer,
  backupVaultResourceDeserializer,
  patchResourceRequestInputSerializer,
  _backupVaultResourceListDeserializer,
  checkNameAvailabilityRequestSerializer,
  checkNameAvailabilityResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BackupVaultsCheckNameAvailabilityOptionalParams,
  BackupVaultsListInResourceGroupOptionalParams,
  BackupVaultsListInSubscriptionOptionalParams,
  BackupVaultsDeleteOptionalParams,
  BackupVaultsUpdateOptionalParams,
  BackupVaultsCreateOrUpdateOptionalParams,
  BackupVaultsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CheckNameAvailabilityRequest,
  options: BackupVaultsCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      location: location,
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
    body: checkNameAvailabilityRequestSerializer(parameters),
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

/** API to check for resource name availability */
export async function checkNameAvailability(
  context: Client,
  resourceGroupName: string,
  location: string,
  parameters: CheckNameAvailabilityRequest,
  options: BackupVaultsCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(
    context,
    resourceGroupName,
    location,
    parameters,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}

export function _listInResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: BackupVaultsListInResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults{?api%2Dversion}",
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

export async function _listInResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupVaultResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _backupVaultResourceListDeserializer(result.body);
}

/** Returns resource collection belonging to a resource group. */
export function listInResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: BackupVaultsListInResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<BackupVaultResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listInResourceGroupSend(context, resourceGroupName, options),
    _listInResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listInSubscriptionSend(
  context: Client,
  options: BackupVaultsListInSubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DataProtection/backupVaults{?api%2Dversion}",
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

export async function _listInSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupVaultResourceList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _backupVaultResourceListDeserializer(result.body);
}

/** Returns resource collection belonging to a subscription. */
export function listInSubscription(
  context: Client,
  options: BackupVaultsListInSubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<BackupVaultResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listInSubscriptionSend(context, options),
    _listInSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: BackupVaultsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}{?api%2Dversion}",
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
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a BackupVault resource from the resource group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: BackupVaultsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
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
  parameters: PatchResourceRequestInput,
  options: BackupVaultsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}{?api%2Dversion}",
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
    body: patchResourceRequestInputSerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupVaultResource> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return backupVaultResourceDeserializer(result.body);
}

/** Updates a BackupVault resource belonging to a resource group. For example, updating tags for a resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: PatchResourceRequestInput,
  options: BackupVaultsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BackupVaultResource>, BackupVaultResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, vaultName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<BackupVaultResource>, BackupVaultResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: BackupVaultResource,
  options: BackupVaultsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}{?api%2Dversion}",
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
    body: backupVaultResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupVaultResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return backupVaultResourceDeserializer(result.body);
}

/** Creates or updates a BackupVault resource belonging to a resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  parameters: BackupVaultResource,
  options: BackupVaultsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BackupVaultResource>, BackupVaultResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, vaultName, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<BackupVaultResource>, BackupVaultResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: BackupVaultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BackupVaultResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return backupVaultResourceDeserializer(result.body);
}

/** Returns a resource belonging to a resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  vaultName: string,
  options: BackupVaultsGetOptionalParams = { requestOptions: {} },
): Promise<BackupVaultResource> {
  const result = await _getSend(context, resourceGroupName, vaultName, options);
  return _getDeserialize(result);
}
