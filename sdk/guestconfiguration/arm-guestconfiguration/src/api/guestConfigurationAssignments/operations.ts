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
  GuestConfigurationAssignmentsListRGListOptionalParams,
  GuestConfigurationAssignmentsListSubscriptionListOptionalParams,
  GuestConfigurationAssignmentsListOptionalParams,
  GuestConfigurationAssignmentsDeleteOptionalParams,
  GuestConfigurationAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationAssignmentsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listRGListSend(
  context: Client,
  resourceGroupName: string,
  options: GuestConfigurationAssignmentsListRGListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments{?api%2Dversion}",
    {
      resourceGroupName: resourceGroupName,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-05",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listRGListDeserialize(
  result: PathUncheckedResponse,
): Promise<_GuestConfigurationAssignmentList> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _guestConfigurationAssignmentListDeserializer(result.body);
}

/** List all guest configuration assignments for a resource group. */
export function listRGList(
  context: Client,
  resourceGroupName: string,
  options: GuestConfigurationAssignmentsListRGListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GuestConfigurationAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listRGListSend(context, resourceGroupName, options),
    _listRGListDeserialize,
    ["200", "204"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-05" },
  );
}

export function _listSubscriptionListSend(
  context: Client,
  options: GuestConfigurationAssignmentsListSubscriptionListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2024-04-05",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listSubscriptionListDeserialize(
  result: PathUncheckedResponse,
): Promise<_GuestConfigurationAssignmentList> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _guestConfigurationAssignmentListDeserializer(result.body);
}

/** List all guest configuration assignments for a subscription. */
export function listSubscriptionList(
  context: Client,
  options: GuestConfigurationAssignmentsListSubscriptionListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GuestConfigurationAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSubscriptionListSend(context, options),
    _listSubscriptionListDeserialize,
    ["200", "204"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-05" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: GuestConfigurationAssignmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      "api%2Dversion": context.apiVersion ?? "2024-04-05",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _guestConfigurationAssignmentListDeserializer(result.body);
}

/** List all guest configuration assignments for a virtual machine. */
export function list(
  context: Client,
  resourceGroupName: string,
  vmName: string,
  options: GuestConfigurationAssignmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GuestConfigurationAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, vmName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-05" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  guestConfigurationAssignmentName: string,
  vmName: string,
  options: GuestConfigurationAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      guestConfigurationAssignmentName: guestConfigurationAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-05",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a guest configuration assignment */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  guestConfigurationAssignmentName: string,
  vmName: string,
  options: GuestConfigurationAssignmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    guestConfigurationAssignmentName,
    vmName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  guestConfigurationAssignmentName: string,
  resourceGroupName: string,
  vmName: string,
  parameters: GuestConfigurationAssignment,
  options: GuestConfigurationAssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      guestConfigurationAssignmentName: guestConfigurationAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-05",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return guestConfigurationAssignmentDeserializer(result.body);
}

/** Creates an association between a VM and guest configuration */
export async function createOrUpdate(
  context: Client,
  guestConfigurationAssignmentName: string,
  resourceGroupName: string,
  vmName: string,
  parameters: GuestConfigurationAssignment,
  options: GuestConfigurationAssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GuestConfigurationAssignment> {
  const result = await _createOrUpdateSend(
    context,
    guestConfigurationAssignmentName,
    resourceGroupName,
    vmName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  guestConfigurationAssignmentName: string,
  vmName: string,
  options: GuestConfigurationAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      vmName: vmName,
      guestConfigurationAssignmentName: guestConfigurationAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2024-04-05",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return guestConfigurationAssignmentDeserializer(result.body);
}

/** Get information about a guest configuration assignment */
export async function get(
  context: Client,
  resourceGroupName: string,
  guestConfigurationAssignmentName: string,
  vmName: string,
  options: GuestConfigurationAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<GuestConfigurationAssignment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    guestConfigurationAssignmentName,
    vmName,
    options,
  );
  return _getDeserialize(result);
}
