// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type {
  ManagedBackupShortTermRetentionPolicy,
  ManagedShortTermRetentionPolicyName,
  _ManagedBackupShortTermRetentionPolicyListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedBackupShortTermRetentionPolicySerializer,
  managedBackupShortTermRetentionPolicyDeserializer,
  _managedBackupShortTermRetentionPolicyListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedBackupShortTermRetentionPoliciesListByDatabaseOptionalParams,
  ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams,
  ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams,
  ManagedBackupShortTermRetentionPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByDatabaseSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedBackupShortTermRetentionPoliciesListByDatabaseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupShortTermRetentionPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByDatabaseDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedBackupShortTermRetentionPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _managedBackupShortTermRetentionPolicyListResultDeserializer(result.body);
}

/** Gets a managed database's short term retention policy list. */
export function listByDatabase(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  options: ManagedBackupShortTermRetentionPoliciesListByDatabaseOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedBackupShortTermRetentionPolicy> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByDatabaseSend(context, resourceGroupName, managedInstanceName, databaseName, options),
    _listByDatabaseDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  policyName: ManagedShortTermRetentionPolicyName,
  parameters: ManagedBackupShortTermRetentionPolicy,
  options: ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedBackupShortTermRetentionPolicySerializer(parameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedBackupShortTermRetentionPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedBackupShortTermRetentionPolicyDeserializer(result.body);
}

/** Updates a managed database's short term retention policy. */
export function update(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  policyName: ManagedShortTermRetentionPolicyName,
  parameters: ManagedBackupShortTermRetentionPolicy,
  options: ManagedBackupShortTermRetentionPoliciesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ManagedBackupShortTermRetentionPolicy>,
  ManagedBackupShortTermRetentionPolicy
> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        policyName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<ManagedBackupShortTermRetentionPolicy>,
    ManagedBackupShortTermRetentionPolicy
  >;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  policyName: ManagedShortTermRetentionPolicyName,
  parameters: ManagedBackupShortTermRetentionPolicy,
  options: ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedBackupShortTermRetentionPolicySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedBackupShortTermRetentionPolicy> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedBackupShortTermRetentionPolicyDeserializer(result.body);
}

/** Updates a managed database's short term retention policy. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  policyName: ManagedShortTermRetentionPolicyName,
  parameters: ManagedBackupShortTermRetentionPolicy,
  options: ManagedBackupShortTermRetentionPoliciesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<ManagedBackupShortTermRetentionPolicy>,
  ManagedBackupShortTermRetentionPolicy
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        managedInstanceName,
        databaseName,
        policyName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-02-01-preview",
  }) as PollerLike<
    OperationState<ManagedBackupShortTermRetentionPolicy>,
    ManagedBackupShortTermRetentionPolicy
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  policyName: ManagedShortTermRetentionPolicyName,
  options: ManagedBackupShortTermRetentionPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/managedInstances/{managedInstanceName}/databases/{databaseName}/backupShortTermRetentionPolicies/{policyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      managedInstanceName: managedInstanceName,
      databaseName: databaseName,
      policyName: policyName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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
): Promise<ManagedBackupShortTermRetentionPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return managedBackupShortTermRetentionPolicyDeserializer(result.body);
}

/** Gets a managed database's short term retention policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  managedInstanceName: string,
  databaseName: string,
  policyName: ManagedShortTermRetentionPolicyName,
  options: ManagedBackupShortTermRetentionPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<ManagedBackupShortTermRetentionPolicy> {
  const result = await _getSend(
    context,
    resourceGroupName,
    managedInstanceName,
    databaseName,
    policyName,
    options,
  );
  return _getDeserialize(result);
}
