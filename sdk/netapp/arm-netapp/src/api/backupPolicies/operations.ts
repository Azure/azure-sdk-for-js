// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type { BackupPolicy, BackupPolicyPatch, _BackupPoliciesList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  backupPolicySerializer,
  backupPolicyDeserializer,
  backupPolicyPatchSerializer,
  _backupPoliciesListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BackupPoliciesListOptionalParams,
  BackupPoliciesDeleteOptionalParams,
  BackupPoliciesUpdateOptionalParams,
  BackupPoliciesCreateOptionalParams,
  BackupPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: BackupPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_BackupPoliciesList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _backupPoliciesListDeserializer(result.body);
}

/** List backup policies for Netapp Account */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: BackupPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackupPolicy> {
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
  backupPolicyName: string,
  options: BackupPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupPolicyName: backupPolicyName,
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

/** Delete backup policy */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupPolicyName: string,
  options: BackupPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, backupPolicyName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupPolicyName: string,
  body: BackupPolicyPatch,
  options: BackupPoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupPolicyName: backupPolicyName,
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
    body: backupPolicyPatchSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<BackupPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupPolicyDeserializer(result.body);
}

/** Patch a backup policy for Netapp Account */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupPolicyName: string,
  body: BackupPolicyPatch,
  options: BackupPoliciesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BackupPolicy>, BackupPolicy> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, backupPolicyName, body, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<BackupPolicy>, BackupPolicy>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupPolicyName: string,
  body: BackupPolicy,
  options: BackupPoliciesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupPolicyName: backupPolicyName,
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
    body: backupPolicySerializer(body),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<BackupPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupPolicyDeserializer(result.body);
}

/** Create a backup policy for Netapp Account */
export function create(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupPolicyName: string,
  body: BackupPolicy,
  options: BackupPoliciesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BackupPolicy>, BackupPolicy> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, accountName, backupPolicyName, body, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<BackupPolicy>, BackupPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupPolicyName: string,
  options: BackupPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/netAppAccounts/{accountName}/backupPolicies/{backupPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      backupPolicyName: backupPolicyName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BackupPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return backupPolicyDeserializer(result.body);
}

/** Get a particular backup Policy */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  backupPolicyName: string,
  options: BackupPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<BackupPolicy> {
  const result = await _getSend(context, resourceGroupName, accountName, backupPolicyName, options);
  return _getDeserialize(result);
}
