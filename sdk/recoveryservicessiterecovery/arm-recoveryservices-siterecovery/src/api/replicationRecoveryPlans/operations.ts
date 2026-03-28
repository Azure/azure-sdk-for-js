// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  RecoveryPlan,
  CreateRecoveryPlanInput,
  UpdateRecoveryPlanInput,
  _RecoveryPlanCollection,
  RecoveryPlanPlannedFailoverInput,
  RecoveryPlanTestFailoverInput,
  RecoveryPlanTestFailoverCleanupInput,
  RecoveryPlanUnplannedFailoverInput,
} from "../../models/models.js";
import {
  recoveryPlanDeserializer,
  createRecoveryPlanInputSerializer,
  updateRecoveryPlanInputSerializer,
  _recoveryPlanCollectionDeserializer,
  recoveryPlanPlannedFailoverInputSerializer,
  recoveryPlanTestFailoverInputSerializer,
  recoveryPlanTestFailoverCleanupInputSerializer,
  recoveryPlanUnplannedFailoverInputSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationRecoveryPlansUnplannedFailoverOptionalParams,
  ReplicationRecoveryPlansTestFailoverCleanupOptionalParams,
  ReplicationRecoveryPlansTestFailoverOptionalParams,
  ReplicationRecoveryPlansReprotectOptionalParams,
  ReplicationRecoveryPlansPlannedFailoverOptionalParams,
  ReplicationRecoveryPlansFailoverCommitOptionalParams,
  ReplicationRecoveryPlansFailoverCancelOptionalParams,
  ReplicationRecoveryPlansListOptionalParams,
  ReplicationRecoveryPlansDeleteOptionalParams,
  ReplicationRecoveryPlansUpdateOptionalParams,
  ReplicationRecoveryPlansCreateOptionalParams,
  ReplicationRecoveryPlansGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _unplannedFailoverSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: RecoveryPlanUnplannedFailoverInput,
  options: ReplicationRecoveryPlansUnplannedFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/unplannedFailover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: recoveryPlanUnplannedFailoverInputSerializer(input),
  });
}

export async function _unplannedFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryPlanDeserializer(result.body);
}

/** The operation to start the unplanned failover of a recovery plan. */
export function unplannedFailover(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: RecoveryPlanUnplannedFailoverInput,
  options: ReplicationRecoveryPlansUnplannedFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlan>, RecoveryPlan> {
  return getLongRunningPoller(context, _unplannedFailoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _unplannedFailoverSend(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
}

export function _testFailoverCleanupSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: RecoveryPlanTestFailoverCleanupInput,
  options: ReplicationRecoveryPlansTestFailoverCleanupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/testFailoverCleanup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: recoveryPlanTestFailoverCleanupInputSerializer(input),
  });
}

export async function _testFailoverCleanupDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryPlanDeserializer(result.body);
}

/** The operation to cleanup test failover of a recovery plan. */
export function testFailoverCleanup(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: RecoveryPlanTestFailoverCleanupInput,
  options: ReplicationRecoveryPlansTestFailoverCleanupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlan>, RecoveryPlan> {
  return getLongRunningPoller(context, _testFailoverCleanupDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testFailoverCleanupSend(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
}

export function _testFailoverSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: RecoveryPlanTestFailoverInput,
  options: ReplicationRecoveryPlansTestFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/testFailover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: recoveryPlanTestFailoverInputSerializer(input),
  });
}

export async function _testFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryPlanDeserializer(result.body);
}

/** The operation to start the test failover of a recovery plan. */
export function testFailover(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: RecoveryPlanTestFailoverInput,
  options: ReplicationRecoveryPlansTestFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlan>, RecoveryPlan> {
  return getLongRunningPoller(context, _testFailoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testFailoverSend(context, resourceGroupName, resourceName, recoveryPlanName, input, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
}

export function _reprotectSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  options: ReplicationRecoveryPlansReprotectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/reProtect{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _reprotectDeserialize(result: PathUncheckedResponse): Promise<RecoveryPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryPlanDeserializer(result.body);
}

/** The operation to reprotect(reverse replicate) a recovery plan. This api is for deprecated scenarios and no longer works. */
export function reprotect(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  options: ReplicationRecoveryPlansReprotectOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlan>, RecoveryPlan> {
  return getLongRunningPoller(context, _reprotectDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reprotectSend(context, resourceGroupName, resourceName, recoveryPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
}

export function _plannedFailoverSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: RecoveryPlanPlannedFailoverInput,
  options: ReplicationRecoveryPlansPlannedFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/plannedFailover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: recoveryPlanPlannedFailoverInputSerializer(input),
  });
}

export async function _plannedFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryPlanDeserializer(result.body);
}

/** The operation to start the planned failover of a recovery plan. */
export function plannedFailover(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: RecoveryPlanPlannedFailoverInput,
  options: ReplicationRecoveryPlansPlannedFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlan>, RecoveryPlan> {
  return getLongRunningPoller(context, _plannedFailoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _plannedFailoverSend(
        context,
        resourceGroupName,
        resourceName,
        recoveryPlanName,
        input,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
}

export function _failoverCommitSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  options: ReplicationRecoveryPlansFailoverCommitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/failoverCommit{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _failoverCommitDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryPlanDeserializer(result.body);
}

/** The operation to commit the failover of a recovery plan. */
export function failoverCommit(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  options: ReplicationRecoveryPlansFailoverCommitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlan>, RecoveryPlan> {
  return getLongRunningPoller(context, _failoverCommitDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverCommitSend(context, resourceGroupName, resourceName, recoveryPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
}

export function _failoverCancelSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  options: ReplicationRecoveryPlansFailoverCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}/failoverCancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _failoverCancelDeserialize(
  result: PathUncheckedResponse,
): Promise<RecoveryPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryPlanDeserializer(result.body);
}

/** The operation to cancel the failover of a recovery plan. */
export function failoverCancel(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  options: ReplicationRecoveryPlansFailoverCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlan>, RecoveryPlan> {
  return getLongRunningPoller(context, _failoverCancelDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverCancelSend(context, resourceGroupName, resourceName, recoveryPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationRecoveryPlansListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
): Promise<_RecoveryPlanCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _recoveryPlanCollectionDeserializer(result.body);
}

/** Lists the recovery plans in the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationRecoveryPlansListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecoveryPlan> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  options: ReplicationRecoveryPlansDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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
    throw createRestError(result);
  }

  return;
}

/** Delete a recovery plan. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  options: ReplicationRecoveryPlansDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, resourceName, recoveryPlanName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: UpdateRecoveryPlanInput,
  options: ReplicationRecoveryPlansUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateRecoveryPlanInputSerializer(input),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<RecoveryPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryPlanDeserializer(result.body);
}

/** The operation to update a recovery plan. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: UpdateRecoveryPlanInput,
  options: ReplicationRecoveryPlansUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlan>, RecoveryPlan> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, resourceName, recoveryPlanName, input, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: CreateRecoveryPlanInput,
  options: ReplicationRecoveryPlansCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: createRecoveryPlanInputSerializer(input),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<RecoveryPlan> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryPlanDeserializer(result.body);
}

/** The operation to create a recovery plan. */
export function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  input: CreateRecoveryPlanInput,
  options: ReplicationRecoveryPlansCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RecoveryPlan>, RecoveryPlan> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, resourceName, recoveryPlanName, input, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<RecoveryPlan>, RecoveryPlan>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  options: ReplicationRecoveryPlansGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationRecoveryPlans/{recoveryPlanName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RecoveryPlan> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return recoveryPlanDeserializer(result.body);
}

/** Gets the details of the recovery plan. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  recoveryPlanName: string,
  options: ReplicationRecoveryPlansGetOptionalParams = { requestOptions: {} },
): Promise<RecoveryPlan> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    recoveryPlanName,
    options,
  );
  return _getDeserialize(result);
}
