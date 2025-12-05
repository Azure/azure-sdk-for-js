// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  ElasticVolume,
  ElasticSnapshotPolicy,
  ElasticSnapshotPolicyUpdate,
  _ElasticSnapshotPolicyListResult,
  _ElasticSnapshotPolicyVolumeList,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  elasticSnapshotPolicySerializer,
  elasticSnapshotPolicyDeserializer,
  elasticSnapshotPolicyUpdateSerializer,
  _elasticSnapshotPolicyListResultDeserializer,
  _elasticSnapshotPolicyVolumeListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ElasticSnapshotPoliciesListElasticVolumesOptionalParams,
  ElasticSnapshotPoliciesListByElasticAccountOptionalParams,
  ElasticSnapshotPoliciesDeleteOptionalParams,
  ElasticSnapshotPoliciesUpdateOptionalParams,
  ElasticSnapshotPoliciesCreateOrUpdateOptionalParams,
  ElasticSnapshotPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listElasticVolumesSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: ElasticSnapshotPoliciesListElasticVolumesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticSnapshotPolicies/{snapshotPolicyName}/elasticvolumes{?api%2Dversion}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listElasticVolumesDeserialize(
  result: PathUncheckedResponse,
): Promise<_ElasticSnapshotPolicyVolumeList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _elasticSnapshotPolicyVolumeListDeserializer(result.body);
}

/** Get elastic volumes associated with Elastic Snapshot Policy */
export function listElasticVolumes(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: ElasticSnapshotPoliciesListElasticVolumesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ElasticVolume> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listElasticVolumesSend(context, resourceGroupName, accountName, snapshotPolicyName, options),
    _listElasticVolumesDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByElasticAccountSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ElasticSnapshotPoliciesListByElasticAccountOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticSnapshotPolicies{?api%2Dversion}",
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

export async function _listByElasticAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_ElasticSnapshotPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _elasticSnapshotPolicyListResultDeserializer(result.body);
}

/** List ElasticSnapshotPolicy resources by ElasticAccount */
export function listByElasticAccount(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ElasticSnapshotPoliciesListByElasticAccountOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ElasticSnapshotPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listByElasticAccountSend(context, resourceGroupName, accountName, options),
    _listByElasticAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: ElasticSnapshotPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticSnapshotPolicies/{snapshotPolicyName}{?api%2Dversion}",
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
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a ElasticSnapshotPolicy */
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
  options: ElasticSnapshotPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
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
  body: ElasticSnapshotPolicyUpdate,
  options: ElasticSnapshotPoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticSnapshotPolicies/{snapshotPolicyName}{?api%2Dversion}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: elasticSnapshotPolicyUpdateSerializer(body),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticSnapshotPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticSnapshotPolicyDeserializer(result.body);
}

/** Update a ElasticSnapshotPolicy */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  body: ElasticSnapshotPolicyUpdate,
  options: ElasticSnapshotPoliciesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ElasticSnapshotPolicy>, ElasticSnapshotPolicy> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, snapshotPolicyName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ElasticSnapshotPolicy>, ElasticSnapshotPolicy>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  body: ElasticSnapshotPolicy,
  options: ElasticSnapshotPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticSnapshotPolicies/{snapshotPolicyName}{?api%2Dversion}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: elasticSnapshotPolicySerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticSnapshotPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticSnapshotPolicyDeserializer(result.body);
}

/** Create a ElasticSnapshotPolicy */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  body: ElasticSnapshotPolicy,
  options: ElasticSnapshotPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ElasticSnapshotPolicy>, ElasticSnapshotPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        accountName,
        snapshotPolicyName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ElasticSnapshotPolicy>, ElasticSnapshotPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: ElasticSnapshotPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/elasticAccounts/{accountName}/elasticSnapshotPolicies/{snapshotPolicyName}{?api%2Dversion}",
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
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticSnapshotPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticSnapshotPolicyDeserializer(result.body);
}

/** Get a ElasticSnapshotPolicy */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  snapshotPolicyName: string,
  options: ElasticSnapshotPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ElasticSnapshotPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    snapshotPolicyName,
    options,
  );
  return _getDeserialize(result);
}
