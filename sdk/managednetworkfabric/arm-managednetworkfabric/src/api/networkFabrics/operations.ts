// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureNetworkFabricManagementServiceAPIContext as Client } from "../index.js";
import type {
  UpdateAdministrativeState,
  UpdateAdministrativeStateResponse,
  OperationStatusResult,
  ValidateConfigurationResponse,
  NetworkFabricResyncCertificatesResponse,
  NetworkFabric,
  NetworkFabricPatch,
  _NetworkFabricsListResult,
  UpgradeNetworkFabricProperties,
  ValidateConfigurationProperties,
  GetTopologyResponse,
  CommitConfigurationResponse,
  CommitBatchStatusRequest,
  CommitBatchStatusOperationResponse,
  DiscardCommitBatchRequest,
  DiscardCommitBatchOperationResponse,
  NetworkFabricLockRequest,
  ViewDeviceConfigurationOperationResponse,
  ArmConfigurationDiffOperationResponse,
  NetworkFabricRotatePasswordsResponse,
  NetworkFabricResyncPasswordsResponse,
  NetworkFabricRotateCertificatesResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  updateAdministrativeStateSerializer,
  updateAdministrativeStateResponseDeserializer,
  operationStatusResultDeserializer,
  validateConfigurationResponseDeserializer,
  networkFabricResyncCertificatesResponseDeserializer,
  networkFabricSerializer,
  networkFabricDeserializer,
  networkFabricPatchSerializer,
  _networkFabricsListResultDeserializer,
  upgradeNetworkFabricPropertiesSerializer,
  validateConfigurationPropertiesSerializer,
  getTopologyResponseDeserializer,
  commitConfigurationRequestSerializer,
  commitConfigurationResponseDeserializer,
  commitBatchStatusRequestSerializer,
  commitBatchStatusOperationResponseDeserializer,
  discardCommitBatchRequestSerializer,
  discardCommitBatchOperationResponseDeserializer,
  networkFabricLockRequestSerializer,
  viewDeviceConfigurationOperationResponseDeserializer,
  armConfigurationDiffOperationResponseDeserializer,
  networkFabricRotatePasswordsResponseDeserializer,
  networkFabricResyncPasswordsResponseDeserializer,
  networkFabricRotateCertificatesResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NetworkFabricsResyncCertificatesOptionalParams,
  NetworkFabricsRotateCertificatesOptionalParams,
  NetworkFabricsResyncPasswordsOptionalParams,
  NetworkFabricsRotatePasswordsOptionalParams,
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

export function _resyncCertificatesSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsResyncCertificatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/resyncCertificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _resyncCertificatesDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkFabricResyncCertificatesResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkFabricResyncCertificatesResponseDeserializer(result.body);
}

/** Updates all Network Devices to use the latest certificates. Does not generate new certificates. Allows network devices missed during a previous certificate rotation to be brought back into sync. */
export function resyncCertificates(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsResyncCertificatesOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkFabricResyncCertificatesResponse>,
  NetworkFabricResyncCertificatesResponse
> {
  return getLongRunningPoller(context, _resyncCertificatesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resyncCertificatesSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkFabricResyncCertificatesResponse>,
    NetworkFabricResyncCertificatesResponse
  >;
}

export function _rotateCertificatesSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsRotateCertificatesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/rotateCertificates{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _rotateCertificatesDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkFabricRotateCertificatesResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkFabricRotateCertificatesResponseDeserializer(result.body);
}

/** Creates new certificates, then updates the Network Devices to use the new certificates. Note that disabled devices cannot be updated and must be resynchronized with the new certificates once they are enabled. */
export function rotateCertificates(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsRotateCertificatesOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkFabricRotateCertificatesResponse>,
  NetworkFabricRotateCertificatesResponse
> {
  return getLongRunningPoller(context, _rotateCertificatesDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rotateCertificatesSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkFabricRotateCertificatesResponse>,
    NetworkFabricRotateCertificatesResponse
  >;
}

export function _resyncPasswordsSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsResyncPasswordsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/resyncPasswords{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _resyncPasswordsDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkFabricResyncPasswordsResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkFabricResyncPasswordsResponseDeserializer(result.body);
}

/**
 * Updates the Terminal Server and all Network Devices to use the latest passwords. Does not generate new passwords.
 *
 * Allows devices to be brought back in sync after a partially successful password rotation.
 */
export function resyncPasswords(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsResyncPasswordsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkFabricResyncPasswordsResponse>,
  NetworkFabricResyncPasswordsResponse
> {
  return getLongRunningPoller(context, _resyncPasswordsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resyncPasswordsSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkFabricResyncPasswordsResponse>,
    NetworkFabricResyncPasswordsResponse
  >;
}

export function _rotatePasswordsSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsRotatePasswordsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/rotatePasswords{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _rotatePasswordsDeserialize(
  result: PathUncheckedResponse,
): Promise<NetworkFabricRotatePasswordsResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return networkFabricRotatePasswordsResponseDeserializer(result.body);
}

/**
 * Creates new passwords, then updates the Terminal Server and Network Devices to use the new passwords.
 *
 * Note that disabled devices cannot be updated and must be resynchronized with the new passwords once they are enabled.
 *
 * Fails if any of the devices could not be updated with the new password.
 * Failed devices should be resynchronized with the new passwords once possible.
 */
export function rotatePasswords(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsRotatePasswordsOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<NetworkFabricRotatePasswordsResponse>,
  NetworkFabricRotatePasswordsResponse
> {
  return getLongRunningPoller(context, _rotatePasswordsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rotatePasswordsSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<NetworkFabricRotatePasswordsResponse>,
    NetworkFabricRotatePasswordsResponse
  >;
}

export function _armConfigurationDiffSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsArmConfigurationDiffOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/armConfigurationDiff{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _armConfigurationDiffDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmConfigurationDiffOperationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return armConfigurationDiffOperationResponseDeserializer(result.body);
}

/** Post action: Triggers diff of NetworkFabric ARM Configuration. */
export function armConfigurationDiff(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsArmConfigurationDiffOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ArmConfigurationDiffOperationResponse>,
  ArmConfigurationDiffOperationResponse
> {
  return getLongRunningPoller(context, _armConfigurationDiffDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _armConfigurationDiffSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<ArmConfigurationDiffOperationResponse>,
    ArmConfigurationDiffOperationResponse
  >;
}

export function _viewDeviceConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsViewDeviceConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/viewDeviceConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _viewDeviceConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<ViewDeviceConfigurationOperationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return viewDeviceConfigurationOperationResponseDeserializer(result.body);
}

/** Post action: Triggers view of network fabric configuration. */
export function viewDeviceConfiguration(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsViewDeviceConfigurationOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<ViewDeviceConfigurationOperationResponse>,
  ViewDeviceConfigurationOperationResponse
> {
  return getLongRunningPoller(context, _viewDeviceConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _viewDeviceConfigurationSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<ViewDeviceConfigurationOperationResponse>,
    ViewDeviceConfigurationOperationResponse
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkFabricLockRequestSerializer(body),
  });
}

export async function _lockFabricDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Post action: Triggers network fabric lock operation. */
export function lockFabric(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: NetworkFabricLockRequest,
  options: NetworkFabricsLockFabricOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _lockFabricDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _lockFabricSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _discardCommitBatchSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: DiscardCommitBatchRequest,
  options: NetworkFabricsDiscardCommitBatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/discardCommitBatch{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: discardCommitBatchRequestSerializer(body),
  });
}

export async function _discardCommitBatchDeserialize(
  result: PathUncheckedResponse,
): Promise<DiscardCommitBatchOperationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return discardCommitBatchOperationResponseDeserializer(result.body);
}

/** Post action: Discards a Batch operation in progress. */
export function discardCommitBatch(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: DiscardCommitBatchRequest,
  options: NetworkFabricsDiscardCommitBatchOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<DiscardCommitBatchOperationResponse>,
  DiscardCommitBatchOperationResponse
> {
  return getLongRunningPoller(context, _discardCommitBatchDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _discardCommitBatchSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<DiscardCommitBatchOperationResponse>,
    DiscardCommitBatchOperationResponse
  >;
}

export function _commitBatchStatusSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: CommitBatchStatusRequest,
  options: NetworkFabricsCommitBatchStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/commitBatchStatus{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: commitBatchStatusRequestSerializer(body),
  });
}

export async function _commitBatchStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<CommitBatchStatusOperationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commitBatchStatusOperationResponseDeserializer(result.body);
}

/** Post action: Returns a status of commit batch operation. */
export function commitBatchStatus(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: CommitBatchStatusRequest,
  options: NetworkFabricsCommitBatchStatusOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<CommitBatchStatusOperationResponse>,
  CommitBatchStatusOperationResponse
> {
  return getLongRunningPoller(context, _commitBatchStatusDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _commitBatchStatusSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<
    OperationState<CommitBatchStatusOperationResponse>,
    CommitBatchStatusOperationResponse
  >;
}

export function _commitConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsCommitConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/commitConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"]
      ? options["body"]
      : commitConfigurationRequestSerializer(options["body"]),
  });
}

export async function _commitConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<CommitConfigurationResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return commitConfigurationResponseDeserializer(result.body);
}

/** Atomic update of the given Network Fabric instance. Sync update of NFA resources at Fabric level. */
export function commitConfiguration(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsCommitConfigurationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommitConfigurationResponse>, CommitConfigurationResponse> {
  return getLongRunningPoller(context, _commitConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _commitConfigurationSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<CommitConfigurationResponse>, CommitConfigurationResponse>;
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _getTopologyDeserialize(
  result: PathUncheckedResponse,
): Promise<GetTopologyResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return getTopologyResponseDeserializer(result.body);
}

/** Gets Topology of the underlying resources in the given Network Fabric instance. */
export function getTopology(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsGetTopologyOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<GetTopologyResponse>, GetTopologyResponse> {
  return getLongRunningPoller(context, _getTopologyDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getTopologySend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<GetTopologyResponse>, GetTopologyResponse>;
}

export function _validateConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: ValidateConfigurationProperties,
  options: NetworkFabricsValidateConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/validateConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
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
  options: NetworkFabricsValidateConfigurationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ValidateConfigurationResponse>, ValidateConfigurationResponse> {
  return getLongRunningPoller(context, _validateConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _validateConfigurationSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateAdministrativeStateSerializer(body),
  });
}

export async function _updateInfraManagementBfdConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return updateAdministrativeStateResponseDeserializer(result.body);
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
  OperationState<UpdateAdministrativeStateResponse>,
  UpdateAdministrativeStateResponse
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
      apiVersion: context.apiVersion ?? "2025-07-15",
    },
  ) as PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: updateAdministrativeStateSerializer(body),
  });
}

export async function _updateWorkloadManagementBfdConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<UpdateAdministrativeStateResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return updateAdministrativeStateResponseDeserializer(result.body);
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
  OperationState<UpdateAdministrativeStateResponse>,
  UpdateAdministrativeStateResponse
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
      apiVersion: context.apiVersion ?? "2025-07-15",
    },
  ) as PollerLike<
    OperationState<UpdateAdministrativeStateResponse>,
    UpdateAdministrativeStateResponse
  >;
}

export function _refreshConfigurationSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsRefreshConfigurationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}/refreshConfiguration{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _refreshConfigurationDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Refreshes the configuration of the underlying resources in the given Network Fabric instance. */
export function refreshConfiguration(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsRefreshConfigurationOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _refreshConfigurationDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _refreshConfigurationSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: upgradeNetworkFabricPropertiesSerializer(body),
  });
}

export async function _upgradeDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Upgrades the version of the underlying resources in the given Network Fabric instance. */
export function upgrade(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: UpgradeNetworkFabricProperties,
  options: NetworkFabricsUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _upgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _upgradeSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _deprovisionDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Deprovisions the underlying resources in the given Network Fabric instance. */
export function deprovision(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsDeprovisionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _deprovisionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deprovisionSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _provisionDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Provisions the underlying resources in the given Network Fabric instance. */
export function provision(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  options: NetworkFabricsProvisionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _provisionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _provisionSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: NetworkFabricsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ManagedNetworkFabric/networkFabrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkFabricsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkFabricsListResultDeserializer(result.body);
}

/** List all the Network Fabric resources in the given subscription. */
export function listBySubscription(
  context: Client,
  options: NetworkFabricsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkFabric> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-15" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: NetworkFabricsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_NetworkFabricsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _networkFabricsListResultDeserializer(result.body);
}

/** List all the Network Fabric resources in the given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: NetworkFabricsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NetworkFabric> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-15" },
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, networkFabricName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: NetworkFabricPatch,
  options: NetworkFabricsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkFabricPatchSerializer(body),
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
  body: NetworkFabricPatch,
  options: NetworkFabricsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkFabric>, NetworkFabric> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15",
  }) as PollerLike<OperationState<NetworkFabric>, NetworkFabric>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  networkFabricName: string,
  body: NetworkFabric,
  options: NetworkFabricsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedNetworkFabric/networkFabrics/{networkFabricName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      networkFabricName: networkFabricName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: networkFabricSerializer(body),
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
  body: NetworkFabric,
  options: NetworkFabricsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NetworkFabric>, NetworkFabric> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, networkFabricName, body, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-15",
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
      "api%2Dversion": context.apiVersion ?? "2025-07-15",
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
