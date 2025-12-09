// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  SnapshotPolicy,
  SnapshotPolicyPatch,
  _SnapshotPoliciesList,
  SnapshotPolicyVolumeList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  snapshotPolicySerializer,
  snapshotPolicyDeserializer,
  snapshotPolicyPatchSerializer,
  _snapshotPoliciesListDeserializer,
  snapshotPolicyVolumeListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SnapshotPoliciesListVolumesOptionalParams,
  SnapshotPoliciesListOptionalParams,
  SnapshotPoliciesDeleteOptionalParams,
  SnapshotPoliciesUpdateOptionalParams,
  SnapshotPoliciesCreateOptionalParams,
  SnapshotPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listVolumesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: SnapshotPoliciesListVolumesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}/volumes{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      snapshotPolicyName: snapshotPolicyName,
      "api%2Dversion": context.apiVersion,
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

export async function _listVolumesDeserialize(
  result: PathUncheckedResponse,
): Promise<SnapshotPolicyVolumeList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return snapshotPolicyVolumeListDeserializer(result.body);
}

/** Get volumes associated with snapshot policy */
export async function listVolumes(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: SnapshotPoliciesListVolumesOptionalParams = { requestOptions: {} },
): Promise<SnapshotPolicyVolumeList> {
  const result = await _listVolumesSend(
    context,
    resourceGroupName,
    accountName,
    snapshotPolicyName,
    options,
  );
  return _listVolumesDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: SnapshotPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_SnapshotPoliciesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _snapshotPoliciesListDeserializer(result.body);
}

/** List snapshot policy */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: SnapshotPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SnapshotPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: SnapshotPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      snapshotPolicyName: snapshotPolicyName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete snapshot policy */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: SnapshotPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, snapshotPolicyName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  body: SnapshotPolicyPatch,
  options: SnapshotPoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      snapshotPolicyName: snapshotPolicyName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: snapshotPolicyPatchSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SnapshotPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return snapshotPolicyDeserializer(result.body);
}

/** Patch a snapshot policy */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  body: SnapshotPolicyPatch,
  options: SnapshotPoliciesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SnapshotPolicy>, SnapshotPolicy> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, snapshotPolicyName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SnapshotPolicy>, SnapshotPolicy>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  body: SnapshotPolicy,
  options: SnapshotPoliciesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      snapshotPolicyName: snapshotPolicyName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: snapshotPolicySerializer(body),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<SnapshotPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return snapshotPolicyDeserializer(result.body);
}

/** Create a snapshot policy */
export async function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  body: SnapshotPolicy,
  options: SnapshotPoliciesCreateOptionalParams = { requestOptions: {} },
): Promise<SnapshotPolicy> {
  const result = await _createSend(
    context,
    resourceGroupName,
    accountName,
    snapshotPolicyName,
    body,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: SnapshotPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/snapshotPolicies/{snapshotPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      snapshotPolicyName: snapshotPolicyName,
      "api%2Dversion": context.apiVersion,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SnapshotPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return snapshotPolicyDeserializer(result.body);
}

/** Get a snapshot Policy */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: SnapshotPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<SnapshotPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    snapshotPolicyName,
    options,
  );
  return _getDeserialize(result);
}
