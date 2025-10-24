// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type { VolumeGroupDetails, _VolumeGroupList, VolumeGroup } from "../../models/models.js";
import {
  errorResponseDeserializer,
  volumeGroupDetailsSerializer,
  volumeGroupDetailsDeserializer,
  _volumeGroupListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VolumeGroupsListByNetAppAccountOptionalParams,
  VolumeGroupsDeleteOptionalParams,
  VolumeGroupsCreateOptionalParams,
  VolumeGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByNetAppAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: VolumeGroupsListByNetAppAccountOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/volumeGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
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

export async function _listByNetAppAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_VolumeGroupList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _volumeGroupListDeserializer(result.body);
}

/** List all volume groups for given account */
export function listByNetAppAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: VolumeGroupsListByNetAppAccountOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VolumeGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByNetAppAccountSend(context, resourceGroupName, accountName, options),
    _listByNetAppAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  volumeGroupName: string,
  options: VolumeGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/volumeGroups/{volumeGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      volumeGroupName: volumeGroupName,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete the specified volume group only if there are no volumes under volume group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  volumeGroupName: string,
  options: VolumeGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, volumeGroupName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  volumeGroupName: string,
  body: VolumeGroupDetails,
  options: VolumeGroupsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/volumeGroups/{volumeGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      volumeGroupName: volumeGroupName,
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
    body: volumeGroupDetailsSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<VolumeGroupDetails> {
  const expectedStatuses = ["201", "200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return volumeGroupDetailsDeserializer(result.body);
}

/** Create a volume group along with specified volumes */
export function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  volumeGroupName: string,
  body: VolumeGroupDetails,
  options: VolumeGroupsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VolumeGroupDetails>, VolumeGroupDetails> {
  return getLongRunningPoller(context, _createDeserialize, ["201", "200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, accountName, volumeGroupName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<VolumeGroupDetails>, VolumeGroupDetails>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  volumeGroupName: string,
  options: VolumeGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/volumeGroups/{volumeGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      volumeGroupName: volumeGroupName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VolumeGroupDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return volumeGroupDetailsDeserializer(result.body);
}

/** Get details of the specified volume group */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  volumeGroupName: string,
  options: VolumeGroupsGetOptionalParams = { requestOptions: {} },
): Promise<VolumeGroupDetails> {
  const result = await _getSend(context, resourceGroupName, accountName, volumeGroupName, options);
  return _getDeserialize(result);
}
