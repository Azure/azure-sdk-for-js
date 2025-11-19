// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedNetworkFabricContext as Client } from "../index.js";
import type {
  UpdateAdministrativeState,
  CommonPostActionResponseForStateUpdate,
  ValidateConfigurationResponse,
  CommonPostActionResponseForDeviceUpdate,
  NetworkFabric,
  NetworkFabricPatch,
  _NetworkFabricListResult,
  UpgradeNetworkFabricProperties,
  ValidateConfigurationProperties,
  CommitBatchStatusRequest,
  CommitBatchStatusResponse,
  DiscardCommitBatchRequest,
  DiscardCommitBatchResponse,
  NetworkFabricLockRequest,
  ViewDeviceConfigurationResponse,
  ArmConfigurationDiffResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateAdministrativeStateSerializer,
  commonPostActionResponseForStateUpdateDeserializer,
  validateConfigurationResponseDeserializer,
  commonPostActionResponseForDeviceUpdateDeserializer,
  networkFabricSerializer,
  networkFabricDeserializer,
  networkFabricPatchSerializer,
  _networkFabricListResultDeserializer,
  upgradeNetworkFabricPropertiesSerializer,
  validateConfigurationPropertiesSerializer,
  commitBatchStatusRequestSerializer,
  commitBatchStatusResponseDeserializer,
  discardCommitBatchRequestSerializer,
  discardCommitBatchResponseDeserializer,
  networkFabricLockRequestSerializer,
  viewDeviceConfigurationResponseDeserializer,
  armConfigurationDiffResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkFabricsArmConfigurationDiffOptionalParams,
  NetworkFabricsViewDeviceConfigurationOptionalParams,
  NetworkFabricsLockFabricOptionalParams,
  NetworkFabricsDiscardCommitBatchOptionalParams,
  NetworkFabricsCommitBatchStatusOptionalParams,
  NetworkFabricsCommitConfigurationOptionalParams,
  NetworkFabricsGetTopologyOptionalParams,
  NetworkFabricsValidateConfigurationOptionalParams,
  NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams,
  NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams,
  NetworkFabricsRefreshConfigurationOptionalParams,
  NetworkFabricsUpgradeOptionalParams,
  NetworkFabricsDeprovisionOptionalParams,
  NetworkFabricsProvisionOptionalParams,
  NetworkFabricsListBySubscriptionOptionalParams,
  NetworkFabricsListByResourceGroupOptionalParams,
  NetworkFabricsDeleteOptionalParams,
  NetworkFabricsUpdateOptionalParams,
  NetworkFabricsCreateOptionalParams,
  NetworkFabricsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _armConfigurationDiffSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsArmConfigurationDiffOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/armConfigurationDiff{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _armConfigurationDiffDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmConfigurationDiffResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return armConfigurationDiffResponseDeserializer(result.body);
}

/** Post action: Triggers diff of NetworkFabric ARM Configuration. */
export function armConfigurationDiff(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsArmConfigurationDiffOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ArmConfigurationDiffResponse>, ArmConfigurationDiffResponse> {
  return getLongRunningPoller(context, _armConfigurationDiffDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _armConfigurationDiffSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ArmConfigurationDiffResponse>, ArmConfigurationDiffResponse>;
}

export function _viewDeviceConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsViewDeviceConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/viewDeviceConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _viewDeviceConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<ViewDeviceConfigurationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return viewDeviceConfigurationResponseDeserializer(result.body);
}

/** Post action: Triggers view of network fabric configuration. */
export function viewDeviceConfiguration(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsViewDeviceConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ViewDeviceConfigurationResponse>, ViewDeviceConfigurationResponse> {
  return getLongRunningPoller(context, _viewDeviceConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _viewDeviceConfigurationSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<ViewDeviceConfigurationResponse>,
    ViewDeviceConfigurationResponse
  >;
}

export function _lockFabricSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: NetworkFabricLockRequest,
  options: NetworkFabricsLockFabricOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/lockFabric{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: networkFabricLockRequestSerializer(body),
  });
}

export async function _lockFabricDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForStateUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForStateUpdateDeserializer(result.body);
}

/** Post action: Triggers network fabric lock operation. */
export function lockFabric(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: NetworkFabricLockRequest,
  options: NetworkFabricsLockFabricOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(context, _lockFabricDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _lockFabricSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _discardCommitBatchSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: DiscardCommitBatchRequest,
  options: NetworkFabricsDiscardCommitBatchOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/discardCommitBatch{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: discardCommitBatchRequestSerializer(body),
  });
}

export async function _discardCommitBatchDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscardCommitBatchResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return discardCommitBatchResponseDeserializer(result.body);
}

/** Post action: Discards a Batch operation in progress. */
export function discardCommitBatch(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: DiscardCommitBatchRequest,
  options: NetworkFabricsDiscardCommitBatchOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DiscardCommitBatchResponse>, DiscardCommitBatchResponse> {
  return getLongRunningPoller(context, _discardCommitBatchDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _discardCommitBatchSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DiscardCommitBatchResponse>, DiscardCommitBatchResponse>;
}

export function _commitBatchStatusSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: CommitBatchStatusRequest,
  options: NetworkFabricsCommitBatchStatusOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/commitBatchStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: commitBatchStatusRequestSerializer(body),
  });
}

export async function _commitBatchStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<CommitBatchStatusResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commitBatchStatusResponseDeserializer(result.body);
}

/** Post action: Returns a status of commit batch operation. */
export function commitBatchStatus(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: CommitBatchStatusRequest,
  options: NetworkFabricsCommitBatchStatusOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<CommitBatchStatusResponse>, CommitBatchStatusResponse> {
  return getLongRunningPoller(context, _commitBatchStatusDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _commitBatchStatusSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<CommitBatchStatusResponse>, CommitBatchStatusResponse>;
}

export function _commitConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsCommitConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/commitConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _commitConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForStateUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForStateUpdateDeserializer(result.body);
}

/** Atomic update of the given Network Fabric instance. Sync update of NFA resources at Fabric level. */
export function commitConfiguration(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsCommitConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(context, _commitConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _commitConfigurationSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _getTopologySend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsGetTopologyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/getTopology{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getTopologyDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateConfigurationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return validateConfigurationResponseDeserializer(result.body);
}

/** Gets Topology of the underlying resources in the given Network Fabric instance. */
export function getTopology(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsGetTopologyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse> {
  return getLongRunningPoller(context, _getTopologyDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getTopologySend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
}

export function _validateConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: ValidateConfigurationProperties,
  options: NetworkFabricsValidateConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/validateConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: validateConfigurationPropertiesSerializer(body),
  });
}

export async function _validateConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateConfigurationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return validateConfigurationResponseDeserializer(result.body);
}

/** Validates the configuration of the underlying resources in the given Network Fabric instance. */
export function validateConfiguration(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: ValidateConfigurationProperties,
  options: NetworkFabricsValidateConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse> {
  return getLongRunningPoller(context, _validateConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateConfigurationSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse>;
}

export function _updateInfraManagementBfdConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: UpdateAdministrativeState,
  options: NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/updateInfraManagementBfdConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateAdministrativeStateSerializer(body),
  });
}

export async function _updateInfraManagementBfdConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForStateUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForStateUpdateDeserializer(result.body);
}

/** Updates the Infra Management BFD Configuration of the underlying resources in the given Network Fabric instance. */
export function updateInfraManagementBfdConfiguration(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: UpdateAdministrativeState,
  options: NetworkFabricsUpdateInfraManagementBfdConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(
    context,
    _updateInfraManagementBfdConfigurationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateInfraManagementBfdConfigurationSend(
          context,
          resourceGroupName,
          networkFabricName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _updateWorkloadManagementBfdConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: UpdateAdministrativeState,
  options: NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/updateWorkloadManagementBfdConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: updateAdministrativeStateSerializer(body),
  });
}

export async function _updateWorkloadManagementBfdConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForStateUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForStateUpdateDeserializer(result.body);
}

/** Updates the Workload Management BFD Configuration of the underlying resources in the given Network Fabric instance. */
export function updateWorkloadManagementBfdConfiguration(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: UpdateAdministrativeState,
  options: NetworkFabricsUpdateWorkloadManagementBfdConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(
    context,
    _updateWorkloadManagementBfdConfigurationDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _updateWorkloadManagementBfdConfigurationSend(
          context,
          resourceGroupName,
          networkFabricName,
          body,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _refreshConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsRefreshConfigurationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/refreshConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _refreshConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForStateUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForStateUpdateDeserializer(result.body);
}

/** Refreshes the configuration of the underlying resources in the given Network Fabric instance. */
export function refreshConfiguration(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsRefreshConfigurationOptionalParams = {
    requestOptions: {},
  },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(context, _refreshConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshConfigurationSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _upgradeSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: UpgradeNetworkFabricProperties,
  options: NetworkFabricsUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/upgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: upgradeNetworkFabricPropertiesSerializer(body),
  });
}

export async function _upgradeDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForStateUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForStateUpdateDeserializer(result.body);
}

/** Upgrades the version of the underlying resources in the given Network Fabric instance. */
export function upgrade(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: UpgradeNetworkFabricProperties,
  options: NetworkFabricsUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CommonPostActionResponseForStateUpdate>,
  CommonPostActionResponseForStateUpdate
> {
  return getLongRunningPoller(context, _upgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradeSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForStateUpdate>,
    CommonPostActionResponseForStateUpdate
  >;
}

export function _deprovisionSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsDeprovisionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/deprovision{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _deprovisionDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForDeviceUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForDeviceUpdateDeserializer(result.body);
}

/** Deprovisions the underlying resources in the given Network Fabric instance. */
export function deprovision(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsDeprovisionOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CommonPostActionResponseForDeviceUpdate>,
  CommonPostActionResponseForDeviceUpdate
> {
  return getLongRunningPoller(context, _deprovisionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deprovisionSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForDeviceUpdate>,
    CommonPostActionResponseForDeviceUpdate
  >;
}

export function _provisionSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsProvisionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/provision{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _provisionDeserialize(
  result: PathUncheckedResponse,
): Promise<CommonPostActionResponseForDeviceUpdate> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return commonPostActionResponseForDeviceUpdateDeserializer(result.body);
}

/** Provisions the underlying resources in the given Network Fabric instance. */
export function provision(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsProvisionOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CommonPostActionResponseForDeviceUpdate>,
  CommonPostActionResponseForDeviceUpdate
> {
  return getLongRunningPoller(context, _provisionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _provisionSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<CommonPostActionResponseForDeviceUpdate>,
    CommonPostActionResponseForDeviceUpdate
  >;
}

export function _listBySubscriptionSend(
  context: Client,
  options: NetworkFabricsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkFabrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkFabricListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _networkFabricListResultDeserializer(result.body);
}

/** List all the Network Fabric resources in the given subscription. */
export function listBySubscription(
  context: Client,
  options: NetworkFabricsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkFabric> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: NetworkFabricsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkFabricListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _networkFabricListResultDeserializer(result.body);
}

/** List all the Network Fabric resources in the given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: NetworkFabricsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<NetworkFabric> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
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

/** Delete Network Fabric resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  properties: NetworkFabricPatch,
  options: NetworkFabricsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
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
    body: networkFabricPatchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<NetworkFabric> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkFabricDeserializer(result.body);
}

/** Update certain properties of the Network Fabric resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  properties: NetworkFabricPatch,
  options: NetworkFabricsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkFabric>, NetworkFabric> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, networkFabricName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<NetworkFabric>, NetworkFabric>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  resource: NetworkFabric,
  options: NetworkFabricsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
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
    body: networkFabricSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<NetworkFabric> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkFabricDeserializer(result.body);
}

/** Create Network Fabric resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  resource: NetworkFabric,
  options: NetworkFabricsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkFabric>, NetworkFabric> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, networkFabricName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<NetworkFabric>, NetworkFabric>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<NetworkFabric> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return networkFabricDeserializer(result.body);
}

/** Get Network Fabric resource details. */
export async function get(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsGetOptionalParams = { requestOptions: {} },
): Promise<NetworkFabric> {
  const result = await _getSend(context, resourceGroupName, networkFabricName, options);
  return _getDeserialize(result);
}
