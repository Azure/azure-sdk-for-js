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
  GuestConfigurationHcrpAssignmentsListOptionalParams,
  GuestConfigurationHcrpAssignmentsDeleteOptionalParams,
  GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationHcrpAssignmentsGetOptionalParams,
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
  machineName: string,
  options: GuestConfigurationHcrpAssignmentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
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

/** List all guest configuration assignments for an ARC machine. */
export function list(
  context: Client,
  resourceGroupName: string,
  machineName: string,
  options: GuestConfigurationHcrpAssignmentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<GuestConfigurationAssignment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, machineName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-04-05" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  guestConfigurationAssignmentName: string,
  machineName: string,
  options: GuestConfigurationHcrpAssignmentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
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
  machineName: string,
  options: GuestConfigurationHcrpAssignmentsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    guestConfigurationAssignmentName,
    machineName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  guestConfigurationAssignmentName: string,
  resourceGroupName: string,
  machineName: string,
  parameters: GuestConfigurationAssignment,
  options: GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
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

/** Creates an association between a ARC machine and guest configuration */
export async function createOrUpdate(
  context: Client,
  guestConfigurationAssignmentName: string,
  resourceGroupName: string,
  machineName: string,
  parameters: GuestConfigurationAssignment,
  options: GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<GuestConfigurationAssignment> {
  const result = await _createOrUpdateSend(
    context,
    guestConfigurationAssignmentName,
    resourceGroupName,
    machineName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  guestConfigurationAssignmentName: string,
  machineName: string,
  options: GuestConfigurationHcrpAssignmentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HybridCompute/machines/{machineName}/providers/Microsoft.GuestConfiguration/guestConfigurationAssignments/{guestConfigurationAssignmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      machineName: machineName,
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
  machineName: string,
  options: GuestConfigurationHcrpAssignmentsGetOptionalParams = { requestOptions: {} },
): Promise<GuestConfigurationAssignment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    guestConfigurationAssignmentName,
    machineName,
    options,
  );
  return _getDeserialize(result);
}
