// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  GuestConfigurationAssignment,
  guestConfigurationAssignmentSerializer,
  guestConfigurationAssignmentDeserializer,
  _GuestConfigurationAssignmentList,
  _guestConfigurationAssignmentListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  GuestConfigurationAssignmentsVmssListOptionalParams,
  GuestConfigurationAssignmentsVmssDeleteOptionalParams,
  GuestConfigurationAssignmentsVmssCreateOrUpdateOptionalParams,
  GuestConfigurationAssignmentsVmssGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vmssName: string,
  options: GuestConfigurationAssignmentsVmssListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmssName: vmssName,
      "api%2Dversion": context.apiVersion ?? "2024-04-05",
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
): Promise<_GuestConfigurationAssignmentList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _guestConfigurationAssignmentListDeserializer(result.body);
}

/** List all guest configuration assignments for VMSS. */
export function list(
  context: Client,
  resourceGroupName: string,
  vmssName: string,
  options: GuestConfigurationAssignmentsVmssListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GuestConfigurationAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vmssName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-05" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  vmssName: string,
  name: string,
  options: GuestConfigurationAssignmentsVmssDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmssName: vmssName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-04-05",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<GuestConfigurationAssignment> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return guestConfigurationAssignmentDeserializer(result.body);
}

/** Delete a guest configuration assignment for VMSS */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  vmssName: string,
  name: string,
  options: GuestConfigurationAssignmentsVmssDeleteOptionalParams = { requestOptions: {} },
): Promise<GuestConfigurationAssignment> {
  const result = await _$deleteSend(context, resourceGroupName, vmssName, name, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  vmssName: string,
  name: string,
  parameters: GuestConfigurationAssignment,
  options: GuestConfigurationAssignmentsVmssCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmssName: vmssName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-04-05",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: guestConfigurationAssignmentSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<GuestConfigurationAssignment> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return guestConfigurationAssignmentDeserializer(result.body);
}

/** Creates an association between a VMSS and guest configuration */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  vmssName: string,
  name: string,
  parameters: GuestConfigurationAssignment,
  options: GuestConfigurationAssignmentsVmssCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GuestConfigurationAssignment> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    vmssName,
    name,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  vmssName: string,
  name: string,
  options: GuestConfigurationAssignmentsVmssGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmssName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmssName: vmssName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2024-04-05",
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
): Promise<GuestConfigurationAssignment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return guestConfigurationAssignmentDeserializer(result.body);
}

/** Get information about a guest configuration assignment for VMSS */
export async function get(
  context: Client,
  resourceGroupName: string,
  vmssName: string,
  name: string,
  options: GuestConfigurationAssignmentsVmssGetOptionalParams = { requestOptions: {} },
): Promise<GuestConfigurationAssignment> {
  const result = await _getSend(context, resourceGroupName, vmssName, name, options);
  return _getDeserialize(result);
}
