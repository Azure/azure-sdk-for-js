// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { AddressPrefixSet } from "../../models/microsoft/network/models.js";
import {
  addressPrefixSetSerializer,
  addressPrefixSetDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _AddressPrefixSetListResult } from "../../models/models.js";
import { _addressPrefixSetListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AddressPrefixSetsListOptionalParams,
  AddressPrefixSetsDeleteOptionalParams,
  AddressPrefixSetsCreateOrUpdateOptionalParams,
  AddressPrefixSetsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  applicationSecurityGroupName: string,
  options: AddressPrefixSetsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationSecurityGroups/{applicationSecurityGroupName}/addressPrefixSets{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationSecurityGroupName: applicationSecurityGroupName,
      "api%2Dversion": "2025-09-01",
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
): Promise<_AddressPrefixSetListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _addressPrefixSetListResultDeserializer(result.body);
}

/** Gets all address prefix sets in an application security group. */
export function list(
  context: Client,
  resourceGroupName: string,
  applicationSecurityGroupName: string,
  options: AddressPrefixSetsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AddressPrefixSet> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, applicationSecurityGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  applicationSecurityGroupName: string,
  addressPrefixSetName: string,
  options: AddressPrefixSetsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationSecurityGroups/{applicationSecurityGroupName}/addressPrefixSets/{addressPrefixSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationSecurityGroupName: applicationSecurityGroupName,
      addressPrefixSetName: addressPrefixSetName,
      "api%2Dversion": "2025-09-01",
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
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified address prefix set. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  applicationSecurityGroupName: string,
  addressPrefixSetName: string,
  options: AddressPrefixSetsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        applicationSecurityGroupName,
        addressPrefixSetName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: "2025-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  applicationSecurityGroupName: string,
  addressPrefixSetName: string,
  resource: AddressPrefixSet,
  options: AddressPrefixSetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationSecurityGroups/{applicationSecurityGroupName}/addressPrefixSets/{addressPrefixSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationSecurityGroupName: applicationSecurityGroupName,
      addressPrefixSetName: addressPrefixSetName,
      "api%2Dversion": "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: addressPrefixSetSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AddressPrefixSet> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return addressPrefixSetDeserializer(result.body);
}

/** Creates or updates an address prefix set. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  applicationSecurityGroupName: string,
  addressPrefixSetName: string,
  resource: AddressPrefixSet,
  options: AddressPrefixSetsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AddressPrefixSet>, AddressPrefixSet> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        applicationSecurityGroupName,
        addressPrefixSetName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-09-01",
  }) as PollerLike<OperationState<AddressPrefixSet>, AddressPrefixSet>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  applicationSecurityGroupName: string,
  addressPrefixSetName: string,
  options: AddressPrefixSetsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationSecurityGroups/{applicationSecurityGroupName}/addressPrefixSets/{addressPrefixSetName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      applicationSecurityGroupName: applicationSecurityGroupName,
      addressPrefixSetName: addressPrefixSetName,
      "api%2Dversion": "2025-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AddressPrefixSet> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return addressPrefixSetDeserializer(result.body);
}

/** Gets the specified address prefix set. */
export async function get(
  context: Client,
  resourceGroupName: string,
  applicationSecurityGroupName: string,
  addressPrefixSetName: string,
  options: AddressPrefixSetsGetOptionalParams = { requestOptions: {} },
): Promise<AddressPrefixSet> {
  const result = await _getSend(
    context,
    resourceGroupName,
    applicationSecurityGroupName,
    addressPrefixSetName,
    options,
  );
  return _getDeserialize(result);
}
