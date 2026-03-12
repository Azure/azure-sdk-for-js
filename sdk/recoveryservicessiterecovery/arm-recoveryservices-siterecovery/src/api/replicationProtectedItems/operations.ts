// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext as Client } from "../index.js";
import type {
  ReplicationProtectedItem,
  EnableProtectionInput,
  UpdateReplicationProtectedItemInput,
  _ReplicationProtectedItemCollection,
  AddDisksInput,
  ApplyRecoveryPointInput,
  PlannedFailoverInput,
  DisableProtectionInput,
  RemoveDisksInput,
  ReverseReplicationInput,
  ResolveHealthInput,
  SwitchProviderInput,
  TestFailoverInput,
  TestFailoverCleanupInput,
  UnplannedFailoverInput,
  UpdateApplianceForReplicationProtectedItemInput,
  UpdateMobilityServiceRequest,
  ReinstallMobilityServiceRequest,
} from "../../models/models.js";
import {
  replicationProtectedItemDeserializer,
  enableProtectionInputSerializer,
  updateReplicationProtectedItemInputSerializer,
  _replicationProtectedItemCollectionDeserializer,
  addDisksInputSerializer,
  applyRecoveryPointInputSerializer,
  plannedFailoverInputSerializer,
  disableProtectionInputSerializer,
  removeDisksInputSerializer,
  reverseReplicationInputSerializer,
  resolveHealthInputSerializer,
  switchProviderInputSerializer,
  testFailoverInputSerializer,
  testFailoverCleanupInputSerializer,
  unplannedFailoverInputSerializer,
  updateApplianceForReplicationProtectedItemInputSerializer,
  updateMobilityServiceRequestSerializer,
  reinstallMobilityServiceRequestSerializer,
  errorResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ReplicationProtectedItemsListOptionalParams,
  ReplicationProtectedItemsReinstallMobilityServiceOptionalParams,
  ReplicationProtectedItemsUpdateMobilityServiceOptionalParams,
  ReplicationProtectedItemsUpdateApplianceOptionalParams,
  ReplicationProtectedItemsUnplannedFailoverOptionalParams,
  ReplicationProtectedItemsTestFailoverCleanupOptionalParams,
  ReplicationProtectedItemsTestFailoverOptionalParams,
  ReplicationProtectedItemsSwitchProviderOptionalParams,
  ReplicationProtectedItemsResolveHealthErrorsOptionalParams,
  ReplicationProtectedItemsReprotectOptionalParams,
  ReplicationProtectedItemsRepairReplicationOptionalParams,
  ReplicationProtectedItemsRemoveDisksOptionalParams,
  ReplicationProtectedItemsDeleteOptionalParams,
  ReplicationProtectedItemsPlannedFailoverOptionalParams,
  ReplicationProtectedItemsFailoverCommitOptionalParams,
  ReplicationProtectedItemsFailoverCancelOptionalParams,
  ReplicationProtectedItemsApplyRecoveryPointOptionalParams,
  ReplicationProtectedItemsAddDisksOptionalParams,
  ReplicationProtectedItemsListByReplicationProtectionContainersOptionalParams,
  ReplicationProtectedItemsPurgeOptionalParams,
  ReplicationProtectedItemsUpdateOptionalParams,
  ReplicationProtectedItemsCreateOptionalParams,
  ReplicationProtectedItemsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationProtectedItemsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationProtectedItems{?api%2Dversion,skipToken,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
      skipToken: options?.skipToken,
      "%24filter": options?.filter,
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
): Promise<_ReplicationProtectedItemCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _replicationProtectedItemCollectionDeserializer(result.body);
}

/** Gets the list of ASR replication protected items in the vault. */
export function list(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ReplicationProtectedItemsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ReplicationProtectedItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, resourceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _reinstallMobilityServiceSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  updateMobilityServiceRequest: ReinstallMobilityServiceRequest,
  options: ReplicationProtectedItemsReinstallMobilityServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/reinstallMobilityService{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: reinstallMobilityServiceRequestSerializer(updateMobilityServiceRequest),
  });
}

export async function _reinstallMobilityServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** The operation to reinstall the installed mobility service software on a replication protected item to the latest available version. */
export function reinstallMobilityService(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  updateMobilityServiceRequest: ReinstallMobilityServiceRequest,
  options: ReplicationProtectedItemsReinstallMobilityServiceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(
    context,
    _reinstallMobilityServiceDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _reinstallMobilityServiceSend(
          context,
          resourceGroupName,
          resourceName,
          fabricName,
          protectionContainerName,
          replicatedProtectedItemName,
          updateMobilityServiceRequest,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2025-08-01",
    },
  ) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _updateMobilityServiceSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  updateMobilityServiceRequest: UpdateMobilityServiceRequest,
  options: ReplicationProtectedItemsUpdateMobilityServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/updateMobilityService{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: updateMobilityServiceRequestSerializer(updateMobilityServiceRequest),
  });
}

export async function _updateMobilityServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** The operation to update(push update) the installed mobility service software on a replication protected item to the latest available version. */
export function updateMobilityService(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  updateMobilityServiceRequest: UpdateMobilityServiceRequest,
  options: ReplicationProtectedItemsUpdateMobilityServiceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _updateMobilityServiceDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateMobilityServiceSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateMobilityServiceRequest,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _updateApplianceSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  applianceUpdateInput: UpdateApplianceForReplicationProtectedItemInput,
  options: ReplicationProtectedItemsUpdateApplianceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/updateAppliance{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: updateApplianceForReplicationProtectedItemInputSerializer(applianceUpdateInput),
  });
}

export async function _updateApplianceDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** The operation to update appliance of an ASR replication protected item. */
export function updateAppliance(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  applianceUpdateInput: UpdateApplianceForReplicationProtectedItemInput,
  options: ReplicationProtectedItemsUpdateApplianceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _updateApplianceDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateApplianceSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        applianceUpdateInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _unplannedFailoverSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  failoverInput: UnplannedFailoverInput,
  options: ReplicationProtectedItemsUnplannedFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/unplannedFailover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: unplannedFailoverInputSerializer(failoverInput),
  });
}

export async function _unplannedFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to initiate a failover of the replication protected item. */
export function unplannedFailover(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  failoverInput: UnplannedFailoverInput,
  options: ReplicationProtectedItemsUnplannedFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _unplannedFailoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _unplannedFailoverSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        failoverInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _testFailoverCleanupSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  cleanupInput: TestFailoverCleanupInput,
  options: ReplicationProtectedItemsTestFailoverCleanupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/testFailoverCleanup{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: testFailoverCleanupInputSerializer(cleanupInput),
  });
}

export async function _testFailoverCleanupDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to clean up the test failover of a replication protected item. */
export function testFailoverCleanup(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  cleanupInput: TestFailoverCleanupInput,
  options: ReplicationProtectedItemsTestFailoverCleanupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _testFailoverCleanupDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testFailoverCleanupSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        cleanupInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _testFailoverSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  testfailoverInput: TestFailoverInput,
  options: ReplicationProtectedItemsTestFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/testFailover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: testFailoverInputSerializer(testfailoverInput),
  });
}

export async function _testFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to perform a test failover of the replication protected item. */
export function testFailover(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  testfailoverInput: TestFailoverInput,
  options: ReplicationProtectedItemsTestFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _testFailoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _testFailoverSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        testfailoverInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _switchProviderSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  switchProviderInput: SwitchProviderInput,
  options: ReplicationProtectedItemsSwitchProviderOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/switchProvider{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: switchProviderInputSerializer(switchProviderInput),
  });
}

export async function _switchProviderDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to initiate a switch provider of the replication protected item. */
export function switchProvider(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  switchProviderInput: SwitchProviderInput,
  options: ReplicationProtectedItemsSwitchProviderOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _switchProviderDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _switchProviderSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        switchProviderInput,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _resolveHealthErrorsSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  resolveHealthInput: ResolveHealthInput,
  options: ReplicationProtectedItemsResolveHealthErrorsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/resolveHealthErrors{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: resolveHealthInputSerializer(resolveHealthInput),
  });
}

export async function _resolveHealthErrorsDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to resolve health issues of the replication protected item. */
export function resolveHealthErrors(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  resolveHealthInput: ResolveHealthInput,
  options: ReplicationProtectedItemsResolveHealthErrorsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _resolveHealthErrorsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resolveHealthErrorsSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        resolveHealthInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _reprotectSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  reprotectInput: ReverseReplicationInput,
  options: ReplicationProtectedItemsReprotectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/reProtect{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: reverseReplicationInputSerializer(reprotectInput),
  });
}

export async function _reprotectDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to reprotect or reverse replicate a failed over replication protected item. */
export function reprotect(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  reprotectInput: ReverseReplicationInput,
  options: ReplicationProtectedItemsReprotectOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _reprotectDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _reprotectSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        reprotectInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _repairReplicationSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: ReplicationProtectedItemsRepairReplicationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/repairReplication{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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

export async function _repairReplicationDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** The operation to start resynchronize/repair replication for a replication protected item requiring resynchronization. */
export function repairReplication(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: ReplicationProtectedItemsRepairReplicationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _repairReplicationDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _repairReplicationSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _removeDisksSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  removeDisksInput: RemoveDisksInput,
  options: ReplicationProtectedItemsRemoveDisksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/removeDisks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: removeDisksInputSerializer(removeDisksInput),
  });
}

export async function _removeDisksDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to remove disk(s) from the replication protected item. */
export function removeDisks(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  removeDisksInput: RemoveDisksInput,
  options: ReplicationProtectedItemsRemoveDisksOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _removeDisksDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _removeDisksSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        removeDisksInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  disableProtectionInput: DisableProtectionInput,
  options: ReplicationProtectedItemsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/remove{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: disableProtectionInputSerializer(disableProtectionInput),
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** The operation to disable replication on a replication protected item. This will also remove the item. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  disableProtectionInput: DisableProtectionInput,
  options: ReplicationProtectedItemsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["204", "202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        disableProtectionInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _plannedFailoverSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  failoverInput: PlannedFailoverInput,
  options: ReplicationProtectedItemsPlannedFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/plannedFailover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: plannedFailoverInputSerializer(failoverInput),
  });
}

export async function _plannedFailoverDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to initiate a planned failover of the replication protected item. */
export function plannedFailover(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  failoverInput: PlannedFailoverInput,
  options: ReplicationProtectedItemsPlannedFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _plannedFailoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _plannedFailoverSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        failoverInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _failoverCommitSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: ReplicationProtectedItemsFailoverCommitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/failoverCommit{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to commit the failover of the replication protected item. */
export function failoverCommit(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: ReplicationProtectedItemsFailoverCommitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _failoverCommitDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverCommitSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _failoverCancelSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: ReplicationProtectedItemsFailoverCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/failoverCancel{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to cancel the failover of the replication protected item. */
export function failoverCancel(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: ReplicationProtectedItemsFailoverCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _failoverCancelDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _failoverCancelSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _applyRecoveryPointSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  applyRecoveryPointInput: ApplyRecoveryPointInput,
  options: ReplicationProtectedItemsApplyRecoveryPointOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/applyRecoveryPoint{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: applyRecoveryPointInputSerializer(applyRecoveryPointInput),
  });
}

export async function _applyRecoveryPointDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** The operation to change the recovery point of a failed over replication protected item. */
export function applyRecoveryPoint(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  applyRecoveryPointInput: ApplyRecoveryPointInput,
  options: ReplicationProtectedItemsApplyRecoveryPointOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _applyRecoveryPointDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _applyRecoveryPointSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        applyRecoveryPointInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _addDisksSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  addDisksInput: AddDisksInput,
  options: ReplicationProtectedItemsAddDisksOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}/addDisks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: addDisksInputSerializer(addDisksInput),
  });
}

export async function _addDisksDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Operation to add disks(s) to the replication protected item. */
export function addDisks(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  addDisksInput: AddDisksInput,
  options: ReplicationProtectedItemsAddDisksOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _addDisksDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _addDisksSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        addDisksInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _listByReplicationProtectionContainersSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationProtectedItemsListByReplicationProtectionContainersOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
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

export async function _listByReplicationProtectionContainersDeserialize(
  result: PathUncheckedResponse,
): Promise<_ReplicationProtectedItemCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _replicationProtectedItemCollectionDeserializer(result.body);
}

/** Gets the list of ASR replication protected items in the protection container. */
export function listByReplicationProtectionContainers(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  options: ReplicationProtectedItemsListByReplicationProtectionContainersOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ReplicationProtectedItem> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByReplicationProtectionContainersSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      ),
    _listByReplicationProtectionContainersDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-08-01" },
  );
}

export function _purgeSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: ReplicationProtectedItemsPurgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _purgeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** The operation to delete or purge a replication protected item. This operation will force delete the replication protected item. Use the remove operation on replication protected item to perform a clean disable replication for the item. */
export function purge(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: ReplicationProtectedItemsPurgeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _purgeSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  updateProtectionInput: UpdateReplicationProtectedItemInput,
  options: ReplicationProtectedItemsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: updateReplicationProtectedItemInputSerializer(updateProtectionInput),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** The operation to update the recovery settings of an ASR replication protected item. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  updateProtectionInput: UpdateReplicationProtectedItemInput,
  options: ReplicationProtectedItemsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        updateProtectionInput,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  input: EnableProtectionInput,
  options: ReplicationProtectedItemsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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
    body: enableProtectionInputSerializer(input),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** The operation to create an ASR replication protected item (Enable replication). */
export function create(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  input: EnableProtectionInput,
  options: ReplicationProtectedItemsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        input,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-01",
  }) as PollerLike<OperationState<ReplicationProtectedItem>, ReplicationProtectedItem>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: ReplicationProtectedItemsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{resourceName}/replicationFabrics/{fabricName}/replicationProtectionContainers/{protectionContainerName}/replicationProtectedItems/{replicatedProtectedItemName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      fabricName: fabricName,
      protectionContainerName: protectionContainerName,
      replicatedProtectedItemName: replicatedProtectedItemName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ReplicationProtectedItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return replicationProtectedItemDeserializer(result.body);
}

/** Gets the details of an ASR replication protected item. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  fabricName: string,
  protectionContainerName: string,
  replicatedProtectedItemName: string,
  options: ReplicationProtectedItemsGetOptionalParams = { requestOptions: {} },
): Promise<ReplicationProtectedItem> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    replicatedProtectedItemName,
    options,
  );
  return _getDeserialize(result);
}
