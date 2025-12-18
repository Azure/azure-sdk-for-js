// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Cluster,
  clusterSerializer,
  clusterDeserializer,
  ClusterPatch,
  clusterPatchSerializer,
  _ClusterList,
  _clusterListDeserializer,
  SecretsLocationsChangeRequest,
  secretsLocationsChangeRequestSerializer,
  UploadCertificateRequest,
  uploadCertificateRequestSerializer,
  ClusterIdentityResponse,
  clusterIdentityResponseDeserializer,
  SoftwareAssuranceChangeRequest,
  softwareAssuranceChangeRequestSerializer,
  ChangeRingRequest,
  changeRingRequestSerializer,
  LogCollectionRequest,
  logCollectionRequestSerializer,
  RemoteSupportRequest,
  remoteSupportRequestSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ClustersConfigureRemoteSupportOptionalParams,
  ClustersTriggerLogCollectionOptionalParams,
  ClustersChangeRingOptionalParams,
  ClustersExtendSoftwareAssuranceBenefitOptionalParams,
  ClustersCreateIdentityOptionalParams,
  ClustersUploadCertificateOptionalParams,
  ClustersUpdateSecretsLocationsOptionalParams,
  ClustersListBySubscriptionOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOptionalParams,
  ClustersGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _configureRemoteSupportSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  remoteSupportRequest: RemoteSupportRequest,
  options: ClustersConfigureRemoteSupportOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/configureRemoteSupport{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: remoteSupportRequestSerializer(remoteSupportRequest),
    });
}

export async function _configureRemoteSupportDeserialize(
  result: PathUncheckedResponse,
): Promise<Cluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Configure RemoteSupport on a cluster */
export function configureRemoteSupport(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  remoteSupportRequest: RemoteSupportRequest,
  options: ClustersConfigureRemoteSupportOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Cluster>, Cluster> {
  return getLongRunningPoller(context, _configureRemoteSupportDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _configureRemoteSupportSend(
        context,
        resourceGroupName,
        clusterName,
        remoteSupportRequest,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Cluster>, Cluster>;
}

export function _triggerLogCollectionSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  logCollectionRequest: LogCollectionRequest,
  options: ClustersTriggerLogCollectionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/triggerLogCollection{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: logCollectionRequestSerializer(logCollectionRequest),
    });
}

export async function _triggerLogCollectionDeserialize(
  result: PathUncheckedResponse,
): Promise<Cluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Trigger Log Collection on a cluster */
export function triggerLogCollection(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  logCollectionRequest: LogCollectionRequest,
  options: ClustersTriggerLogCollectionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Cluster>, Cluster> {
  return getLongRunningPoller(context, _triggerLogCollectionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _triggerLogCollectionSend(
        context,
        resourceGroupName,
        clusterName,
        logCollectionRequest,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Cluster>, Cluster>;
}

export function _changeRingSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  changeRingRequest: ChangeRingRequest,
  options: ClustersChangeRingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/changeRing{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: changeRingRequestSerializer(changeRingRequest),
    });
}

export async function _changeRingDeserialize(result: PathUncheckedResponse): Promise<Cluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Changes ring of a cluster */
export function changeRing(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  changeRingRequest: ChangeRingRequest,
  options: ClustersChangeRingOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Cluster>, Cluster> {
  return getLongRunningPoller(context, _changeRingDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _changeRingSend(context, resourceGroupName, clusterName, changeRingRequest, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Cluster>, Cluster>;
}

export function _extendSoftwareAssuranceBenefitSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  softwareAssuranceChangeRequest: SoftwareAssuranceChangeRequest,
  options: ClustersExtendSoftwareAssuranceBenefitOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/extendSoftwareAssuranceBenefit{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: softwareAssuranceChangeRequestSerializer(softwareAssuranceChangeRequest),
    });
}

export async function _extendSoftwareAssuranceBenefitDeserialize(
  result: PathUncheckedResponse,
): Promise<Cluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Extends Software Assurance Benefit to a cluster */
export function extendSoftwareAssuranceBenefit(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  softwareAssuranceChangeRequest: SoftwareAssuranceChangeRequest,
  options: ClustersExtendSoftwareAssuranceBenefitOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Cluster>, Cluster> {
  return getLongRunningPoller(
    context,
    _extendSoftwareAssuranceBenefitDeserialize,
    ["202", "200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _extendSoftwareAssuranceBenefitSend(
          context,
          resourceGroupName,
          clusterName,
          softwareAssuranceChangeRequest,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<Cluster>, Cluster>;
}

export function _createIdentitySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersCreateIdentityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/createClusterIdentity{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _createIdentityDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterIdentityResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return clusterIdentityResponseDeserializer(result.body);
}

/** Create cluster identity. */
export function createIdentity(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersCreateIdentityOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ClusterIdentityResponse>, ClusterIdentityResponse> {
  return getLongRunningPoller(context, _createIdentityDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createIdentitySend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ClusterIdentityResponse>, ClusterIdentityResponse>;
}

export function _uploadCertificateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  uploadCertificateRequest: UploadCertificateRequest,
  options: ClustersUploadCertificateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/uploadCertificate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      body: uploadCertificateRequestSerializer(uploadCertificateRequest),
    });
}

export async function _uploadCertificateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Upload certificate. */
export function uploadCertificate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  uploadCertificateRequest: UploadCertificateRequest,
  options: ClustersUploadCertificateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _uploadCertificateDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _uploadCertificateSend(
        context,
        resourceGroupName,
        clusterName,
        uploadCertificateRequest,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSecretsLocationsSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: SecretsLocationsChangeRequest,
  options: ClustersUpdateSecretsLocationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}/updateSecretsLocations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: secretsLocationsChangeRequestSerializer(body),
    });
}

export async function _updateSecretsLocationsDeserialize(
  result: PathUncheckedResponse,
): Promise<Cluster> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Update cluster secrets locations. */
export function updateSecretsLocations(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: SecretsLocationsChangeRequest,
  options: ClustersUpdateSecretsLocationsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Cluster>, Cluster> {
  return getLongRunningPoller(context, _updateSecretsLocationsDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSecretsLocationsSend(context, resourceGroupName, clusterName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<Cluster>, Cluster>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: ClustersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AzureStackHCI/clusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClusterList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _clusterListDeserializer(result.body);
}

/** List all HCI clusters in a subscription. */
export function listBySubscription(
  context: Client,
  options: ClustersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Cluster> {
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
  options: ClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ClusterList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _clusterListDeserializer(result.body);
}

/** List all HCI clusters in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Cluster> {
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
  clusterName: string,
  options: ClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
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

/** Delete an HCI cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  cluster: ClusterPatch,
  options: ClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: clusterPatchSerializer(cluster),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Cluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Update an HCI cluster. */
export async function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  cluster: ClusterPatch,
  options: ClustersUpdateOptionalParams = { requestOptions: {} },
): Promise<Cluster> {
  const result = await _updateSend(context, resourceGroupName, clusterName, cluster, options);
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  cluster: Cluster,
  options: ClustersCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: clusterSerializer(cluster),
    });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Cluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Create an HCI cluster. */
export async function create(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  cluster: Cluster,
  options: ClustersCreateOptionalParams = { requestOptions: {} },
): Promise<Cluster> {
  const result = await _createSend(context, resourceGroupName, clusterName, cluster, options);
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureStackHCI/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Cluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Get HCI cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersGetOptionalParams = { requestOptions: {} },
): Promise<Cluster> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}
