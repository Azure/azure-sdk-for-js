// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  Cluster,
  clusterSerializer,
  clusterDeserializer,
  clusterPatchParametersSerializer,
  _ClusterList,
  _clusterListDeserializer,
  ClusterContinueUpdateVersionParameters,
  clusterContinueUpdateVersionParametersSerializer,
  clusterDeployParametersSerializer,
  clusterInspectParametersSerializer,
  ClusterRotateCredentialParameters,
  clusterRotateCredentialParametersSerializer,
  clusterScanRuntimeParametersSerializer,
  ClusterUpdateVersionParameters,
  clusterUpdateVersionParametersSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ClustersUpdateVersionOptionalParams,
  ClustersScanRuntimeOptionalParams,
  ClustersRotateCredentialOptionalParams,
  ClustersInspectOptionalParams,
  ClustersDeployOptionalParams,
  ClustersContinueUpdateVersionOptionalParams,
  ClustersListBySubscriptionOptionalParams,
  ClustersListByResourceGroupOptionalParams,
  ClustersDeleteOptionalParams,
  ClustersUpdateOptionalParams,
  ClustersCreateOrUpdateOptionalParams,
  ClustersGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _updateVersionSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  clusterUpdateVersionParameters: ClusterUpdateVersionParameters,
  options: ClustersUpdateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/updateVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: clusterUpdateVersionParametersSerializer(clusterUpdateVersionParameters),
    });
}

export async function _updateVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Update the version of the provided cluster to one of the available supported versions. */
export function updateVersion(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  clusterUpdateVersionParameters: ClusterUpdateVersionParameters,
  options: ClustersUpdateVersionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _updateVersionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateVersionSend(
        context,
        resourceGroupName,
        clusterName,
        clusterUpdateVersionParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _scanRuntimeSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersScanRuntimeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/scanRuntime{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: !options?.clusterScanRuntimeParameters
        ? options?.clusterScanRuntimeParameters
        : clusterScanRuntimeParametersSerializer(options?.clusterScanRuntimeParameters),
    });
}

export async function _scanRuntimeDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Triggers the execution of a runtime protection scan to detect and remediate detected issues, in accordance with the cluster configuration. */
export function scanRuntime(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersScanRuntimeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _scanRuntimeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _scanRuntimeSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _rotateCredentialSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: ClusterRotateCredentialParameters,
  options: ClustersRotateCredentialOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/rotateCredential{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: clusterRotateCredentialParametersSerializer(body),
    });
}

export async function _rotateCredentialDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Rotate the specified cluster credential. */
export function rotateCredential(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  body: ClusterRotateCredentialParameters,
  options: ClustersRotateCredentialOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _rotateCredentialDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _rotateCredentialSend(context, resourceGroupName, clusterName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _inspectSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersInspectOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/inspect{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: !options?.clusterInspectParameters
        ? options?.clusterInspectParameters
        : clusterInspectParametersSerializer(options?.clusterInspectParameters),
    });
}

export async function _inspectDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Trigger an inspection of the cluster to perform validation and optional corrective actions based on the supplied additional actions and filters. */
export function inspect(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersInspectOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _inspectDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _inspectSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _deploySend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersDeployOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/deploy{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: !options?.clusterDeployParameters
        ? options?.clusterDeployParameters
        : clusterDeployParametersSerializer(options?.clusterDeployParameters),
    });
}

export async function _deployDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Deploy the cluster using the rack configuration provided during creation. */
export function deploy(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersDeployOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _deployDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _deploySend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _continueUpdateVersionSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  clusterContinueUpdateVersionParameters: ClusterContinueUpdateVersionParameters,
  options: ClustersContinueUpdateVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}/continueUpdateVersion{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      body: clusterContinueUpdateVersionParametersSerializer(
        clusterContinueUpdateVersionParameters,
      ),
    });
}

export async function _continueUpdateVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Trigger the continuation of an update for a cluster with a matching update strategy that has paused after completing a segment of the update. */
export function continueUpdateVersion(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  clusterContinueUpdateVersionParameters: ClusterContinueUpdateVersionParameters,
  options: ClustersContinueUpdateVersionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _continueUpdateVersionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _continueUpdateVersionSend(
        context,
        resourceGroupName,
        clusterName,
        clusterContinueUpdateVersionParameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: ClustersListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetworkCloud/clusters{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _clusterListDeserializer(result.body);
}

/** Get a list of clusters in the provided subscription. */
export function listBySubscription(
  context: Client,
  options: ClustersListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Cluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ClustersListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _clusterListDeserializer(result.body);
}

/** Get a list of clusters in the provided resource group. */
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
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Delete the provided cluster. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: !options?.clusterUpdateParameters
        ? options?.clusterUpdateParameters
        : clusterPatchParametersSerializer(options?.clusterUpdateParameters),
    });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<Cluster> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Patch the properties of the provided cluster, or update the tags associated with the cluster. Properties and tag updates can be done independently. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Cluster>, Cluster> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _updateSend(context, resourceGroupName, clusterName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<Cluster>, Cluster>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  clusterParameters: Cluster,
  options: ClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
      headers: {
        ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
        ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: clusterSerializer(clusterParameters),
    });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<Cluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Create a new cluster or update the properties of the cluster if it exists. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  clusterParameters: Cluster,
  options: ClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Cluster>, Cluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, clusterName, clusterParameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<Cluster>, Cluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/clusters/{clusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return clusterDeserializer(result.body);
}

/** Get properties of the provided cluster. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterName: string,
  options: ClustersGetOptionalParams = { requestOptions: {} },
): Promise<Cluster> {
  const result = await _getSend(context, resourceGroupName, clusterName, options);
  return _getDeserialize(result);
}
