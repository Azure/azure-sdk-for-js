// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext as Client } from "../index.js";
import type {
  ManagedHsm,
  _ManagedHsmListResult,
  DeletedManagedHsm,
  _DeletedManagedHsmListResult,
  CheckMhsmNameAvailabilityParameters,
  CheckMhsmNameAvailabilityResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  managedHsmSerializer,
  managedHsmDeserializer,
  managedHsmErrorDeserializer,
  _managedHsmListResultDeserializer,
  deletedManagedHsmDeserializer,
  _deletedManagedHsmListResultDeserializer,
  checkMhsmNameAvailabilityParametersSerializer,
  checkMhsmNameAvailabilityResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedHsmsCheckMhsmNameAvailabilityOptionalParams,
  ManagedHsmsListDeletedOptionalParams,
  ManagedHsmsPurgeDeletedOptionalParams,
  ManagedHsmsGetDeletedOptionalParams,
  ManagedHsmsListBySubscriptionOptionalParams,
  ManagedHsmsListByResourceGroupOptionalParams,
  ManagedHsmsDeleteOptionalParams,
  ManagedHsmsUpdateOptionalParams,
  ManagedHsmsCreateOrUpdateOptionalParams,
  ManagedHsmsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkMhsmNameAvailabilitySend(
  context: Client,
  mhsmName: CheckMhsmNameAvailabilityParameters,
  options: ManagedHsmsCheckMhsmNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KeyVault/checkMhsmNameAvailability{?api%2Dversion}",
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
    body: checkMhsmNameAvailabilityParametersSerializer(mhsmName),
  });
}

export async function _checkMhsmNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckMhsmNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return checkMhsmNameAvailabilityResultDeserializer(result.body);
}

/** Checks that the managed hsm name is valid and is not already in use. */
export async function checkMhsmNameAvailability(
  context: Client,
  mhsmName: CheckMhsmNameAvailabilityParameters,
  options: ManagedHsmsCheckMhsmNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckMhsmNameAvailabilityResult> {
  const result = await _checkMhsmNameAvailabilitySend(context, mhsmName, options);
  return _checkMhsmNameAvailabilityDeserialize(result);
}

export function _listDeletedSend(
  context: Client,
  options: ManagedHsmsListDeletedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KeyVault/deletedManagedHSMs{?api%2Dversion}",
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
): Promise<_DeletedManagedHsmListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return _deletedManagedHsmListResultDeserializer(result.body);
}

/** The List operation gets information about the deleted managed HSMs associated with the subscription. */
export function listDeleted(
  context: Client,
  options: ManagedHsmsListDeletedOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedManagedHsm> {
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
  name: string,
  options: ManagedHsmsPurgeDeletedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KeyVault/locations/{location}/deletedManagedHSMs/{name}/purge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      name: name,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _purgeDeletedDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Permanently deletes the specified managed HSM. */
export function purgeDeleted(
  context: Client,
  location: string,
  name: string,
  options: ManagedHsmsPurgeDeletedOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeDeletedDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _purgeDeletedSend(context, location, name, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getDeletedSend(
  context: Client,
  location: string,
  name: string,
  options: ManagedHsmsGetDeletedOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KeyVault/locations/{location}/deletedManagedHSMs/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      name: name,
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

export async function _getDeletedDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedManagedHsm> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return deletedManagedHsmDeserializer(result.body);
}

/** Gets the specified deleted managed HSM. */
export async function getDeleted(
  context: Client,
  location: string,
  name: string,
  options: ManagedHsmsGetDeletedOptionalParams = { requestOptions: {} },
): Promise<DeletedManagedHsm> {
  const result = await _getDeletedSend(context, location, name, options);
  return _getDeletedDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: ManagedHsmsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.KeyVault/managedHSMs{?api%2Dversion,%24top}",
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
): Promise<_ManagedHsmListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return _managedHsmListResultDeserializer(result.body);
}

/** The List operation gets information about the managed HSM Pools associated with the subscription. */
export function listBySubscription(
  context: Client,
  options: ManagedHsmsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedHsm> {
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
  options: ManagedHsmsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs{?api%2Dversion,%24top}",
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
): Promise<_ManagedHsmListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return _managedHsmListResultDeserializer(result.body);
}

/** The List operation gets information about the managed HSM Pools associated with the subscription and within the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ManagedHsmsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedHsm> {
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
  name: string,
  options: ManagedHsmsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes the specified managed HSM Pool. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ManagedHsmsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, name, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: ManagedHsm,
  options: ManagedHsmsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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
    body: managedHsmSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ManagedHsm> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return managedHsmDeserializer(result.body);
}

/** Update a managed HSM Pool in the specified subscription. */
export function update(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: ManagedHsm,
  options: ManagedHsmsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedHsm>, ManagedHsm> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, name, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ManagedHsm>, ManagedHsm>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: ManagedHsm,
  options: ManagedHsmsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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
    body: managedHsmSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedHsm> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return managedHsmDeserializer(result.body);
}

/** Create or update a managed HSM Pool in the specified subscription. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  name: string,
  parameters: ManagedHsm,
  options: ManagedHsmsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedHsm>, ManagedHsm> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, name, parameters, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ManagedHsm>, ManagedHsm>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ManagedHsmsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      name: name,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedHsm> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = managedHsmErrorDeserializer(result.body);
    throw error;
  }

  return managedHsmDeserializer(result.body);
}

/** Gets the specified managed HSM Pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  name: string,
  options: ManagedHsmsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedHsm | null> {
  const result = await _getSend(context, resourceGroupName, name, options);
  return _getDeserialize(result);
}
