// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeManagementContext as Client } from "../index.js";
import type {
  _VirtualMachineSizeListResult,
  VirtualMachineSize,
  AvailabilitySet,
  AvailabilitySetUpdate,
  _AvailabilitySetListResult,
  MigrateToVirtualMachineScaleSetInput,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  _virtualMachineSizeListResultDeserializer,
  availabilitySetSerializer,
  availabilitySetDeserializer,
  availabilitySetUpdateSerializer,
  _availabilitySetListResultDeserializer,
  migrateToVirtualMachineScaleSetInputSerializer,
  convertToVirtualMachineScaleSetInputSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AvailabilitySetsConvertToVirtualMachineScaleSetOptionalParams,
  AvailabilitySetsValidateMigrationToVirtualMachineScaleSetOptionalParams,
  AvailabilitySetsCancelMigrationToVirtualMachineScaleSetOptionalParams,
  AvailabilitySetsStartMigrationToVirtualMachineScaleSetOptionalParams,
  AvailabilitySetsListAvailableSizesOptionalParams,
  AvailabilitySetsListBySubscriptionOptionalParams,
  AvailabilitySetsListOptionalParams,
  AvailabilitySetsDeleteOptionalParams,
  AvailabilitySetsUpdateOptionalParams,
  AvailabilitySetsCreateOrUpdateOptionalParams,
  AvailabilitySetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _convertToVirtualMachineScaleSetSend(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  options: AvailabilitySetsConvertToVirtualMachineScaleSetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/convertToVirtualMachineScaleSet{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      availabilitySetName: availabilitySetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["parameters"]
      ? options["parameters"]
      : convertToVirtualMachineScaleSetInputSerializer(options["parameters"]),
  });
}

export async function _convertToVirtualMachineScaleSetDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Create a new Flexible Virtual Machine Scale Set and migrate all the Virtual Machines in the Availability Set. This does not trigger a downtime on the Virtual Machines. */
export function convertToVirtualMachineScaleSet(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  options: AvailabilitySetsConvertToVirtualMachineScaleSetOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _convertToVirtualMachineScaleSetDeserialize,
    ["202", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _convertToVirtualMachineScaleSetSend(
          context,
          resourceGroupName,
          availabilitySetName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _validateMigrationToVirtualMachineScaleSetSend(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  parameters: MigrateToVirtualMachineScaleSetInput,
  options: AvailabilitySetsValidateMigrationToVirtualMachineScaleSetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/validateMigrationToVirtualMachineScaleSet{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      availabilitySetName: availabilitySetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: migrateToVirtualMachineScaleSetInputSerializer(parameters),
  });
}

export async function _validateMigrationToVirtualMachineScaleSetDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Validates that the Virtual Machines in the Availability Set can be migrated to the provided Virtual Machine Scale Set. */
export async function validateMigrationToVirtualMachineScaleSet(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  parameters: MigrateToVirtualMachineScaleSetInput,
  options: AvailabilitySetsValidateMigrationToVirtualMachineScaleSetOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _validateMigrationToVirtualMachineScaleSetSend(
    context,
    resourceGroupName,
    availabilitySetName,
    parameters,
    options,
  );
  return _validateMigrationToVirtualMachineScaleSetDeserialize(result);
}

export function _cancelMigrationToVirtualMachineScaleSetSend(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  options: AvailabilitySetsCancelMigrationToVirtualMachineScaleSetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/cancelMigrationToVirtualMachineScaleSet{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      availabilitySetName: availabilitySetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelMigrationToVirtualMachineScaleSetDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Cancel the migration operation on an Availability Set. */
export async function cancelMigrationToVirtualMachineScaleSet(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  options: AvailabilitySetsCancelMigrationToVirtualMachineScaleSetOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _cancelMigrationToVirtualMachineScaleSetSend(
    context,
    resourceGroupName,
    availabilitySetName,
    options,
  );
  return _cancelMigrationToVirtualMachineScaleSetDeserialize(result);
}

export function _startMigrationToVirtualMachineScaleSetSend(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  parameters: MigrateToVirtualMachineScaleSetInput,
  options: AvailabilitySetsStartMigrationToVirtualMachineScaleSetOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/startMigrationToVirtualMachineScaleSet{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      availabilitySetName: availabilitySetName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: migrateToVirtualMachineScaleSetInputSerializer(parameters),
  });
}

export async function _startMigrationToVirtualMachineScaleSetDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return;
}

/** Start migration operation on an Availability Set to move its Virtual Machines to a Virtual Machine Scale Set. This should be followed by a migrate operation on each Virtual Machine that triggers a downtime on the Virtual Machine. */
export async function startMigrationToVirtualMachineScaleSet(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  parameters: MigrateToVirtualMachineScaleSetInput,
  options: AvailabilitySetsStartMigrationToVirtualMachineScaleSetOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _startMigrationToVirtualMachineScaleSetSend(
    context,
    resourceGroupName,
    availabilitySetName,
    parameters,
    options,
  );
  return _startMigrationToVirtualMachineScaleSetDeserialize(result);
}

export function _listAvailableSizesSend(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  options: AvailabilitySetsListAvailableSizesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/vmSizes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      availabilitySetName: availabilitySetName,
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

export async function _listAvailableSizesDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualMachineSizeListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _virtualMachineSizeListResultDeserializer(result.body);
}

/** Lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set. */
export function listAvailableSizes(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  options: AvailabilitySetsListAvailableSizesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualMachineSize> {
  return buildPagedAsyncIterator(
    context,
    () => _listAvailableSizesSend(context, resourceGroupName, availabilitySetName, options),
    _listAvailableSizesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: AvailabilitySetsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/availabilitySets{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
      "%24expand": options?.expand,
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
): Promise<_AvailabilitySetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _availabilitySetListResultDeserializer(result.body);
}

/** Lists all availability sets in a subscription. */
export function listBySubscription(
  context: Client,
  options: AvailabilitySetsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<AvailabilitySet> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: AvailabilitySetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_AvailabilitySetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _availabilitySetListResultDeserializer(result.body);
}

/** Lists all availability sets in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: AvailabilitySetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AvailabilitySet> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  options: AvailabilitySetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      availabilitySetName: availabilitySetName,
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

/** Delete an availability set. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  options: AvailabilitySetsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, availabilitySetName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  parameters: AvailabilitySetUpdate,
  options: AvailabilitySetsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      availabilitySetName: availabilitySetName,
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
    body: availabilitySetUpdateSerializer(parameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AvailabilitySet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return availabilitySetDeserializer(result.body);
}

/** Update an availability set. */
export async function update(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  parameters: AvailabilitySetUpdate,
  options: AvailabilitySetsUpdateOptionalParams = { requestOptions: {} },
): Promise<AvailabilitySet> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    availabilitySetName,
    parameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  parameters: AvailabilitySet,
  options: AvailabilitySetsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      availabilitySetName: availabilitySetName,
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
    body: availabilitySetSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AvailabilitySet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return availabilitySetDeserializer(result.body);
}

/** Create or update an availability set. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  parameters: AvailabilitySet,
  options: AvailabilitySetsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<AvailabilitySet> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    availabilitySetName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  options: AvailabilitySetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      availabilitySetName: availabilitySetName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AvailabilitySet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return availabilitySetDeserializer(result.body);
}

/** Retrieves information about an availability set. */
export async function get(
  context: Client,
  resourceGroupName: string,
  availabilitySetName: string,
  options: AvailabilitySetsGetOptionalParams = { requestOptions: {} },
): Promise<AvailabilitySet> {
  const result = await _getSend(context, resourceGroupName, availabilitySetName, options);
  return _getDeserialize(result);
}
