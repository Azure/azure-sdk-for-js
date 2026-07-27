// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
  KubernetesClusterFeature,
  kubernetesClusterFeatureSerializer,
  kubernetesClusterFeatureDeserializer,
  kubernetesClusterFeaturePatchParametersSerializer,
  _KubernetesClusterFeatureList,
  _kubernetesClusterFeatureListDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  KubernetesClusterFeaturesListByKubernetesClusterOptionalParams,
  KubernetesClusterFeaturesDeleteOptionalParams,
  KubernetesClusterFeaturesUpdateOptionalParams,
  KubernetesClusterFeaturesCreateOrUpdateOptionalParams,
  KubernetesClusterFeaturesGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByKubernetesClusterSend(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  options: KubernetesClusterFeaturesListByKubernetesClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      kubernetesClusterName: kubernetesClusterName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listByKubernetesClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_KubernetesClusterFeatureList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _kubernetesClusterFeatureListDeserializer(result.body);
}

/** Get a list of features for the provided Kubernetes cluster. */
export function listByKubernetesCluster(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  options: KubernetesClusterFeaturesListByKubernetesClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KubernetesClusterFeature> {
  return buildPagedAsyncIterator(
    context,
    () => _listByKubernetesClusterSend(context, resourceGroupName, kubernetesClusterName, options),
    _listByKubernetesClusterDeserialize,
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
  kubernetesClusterName: string,
  featureName: string,
  options: KubernetesClusterFeaturesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      kubernetesClusterName: kubernetesClusterName,
      featureName: featureName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Delete the provided Kubernetes cluster feature. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  featureName: string,
  options: KubernetesClusterFeaturesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperationStatusResult>, OperationStatusResult> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, kubernetesClusterName, featureName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<OperationStatusResult>, OperationStatusResult>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  featureName: string,
  options: KubernetesClusterFeaturesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      kubernetesClusterName: kubernetesClusterName,
      featureName: featureName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["kubernetesClusterFeatureUpdateParameters"]
      ? options["kubernetesClusterFeatureUpdateParameters"]
      : kubernetesClusterFeaturePatchParametersSerializer(
          options["kubernetesClusterFeatureUpdateParameters"],
        ),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<KubernetesClusterFeature> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return kubernetesClusterFeatureDeserializer(result.body);
}

/** Patch properties of the provided Kubernetes cluster feature. */
export function update(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  featureName: string,
  options: KubernetesClusterFeaturesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<KubernetesClusterFeature>, KubernetesClusterFeature> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, kubernetesClusterName, featureName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<KubernetesClusterFeature>, KubernetesClusterFeature>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  featureName: string,
  kubernetesClusterFeatureParameters: KubernetesClusterFeature,
  options: KubernetesClusterFeaturesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      kubernetesClusterName: kubernetesClusterName,
      featureName: featureName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: kubernetesClusterFeatureSerializer(kubernetesClusterFeatureParameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<KubernetesClusterFeature> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return kubernetesClusterFeatureDeserializer(result.body);
}

/** Create a new Kubernetes cluster feature or update properties of the Kubernetes cluster feature if it exists. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  featureName: string,
  kubernetesClusterFeatureParameters: KubernetesClusterFeature,
  options: KubernetesClusterFeaturesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<KubernetesClusterFeature>, KubernetesClusterFeature> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        kubernetesClusterName,
        featureName,
        kubernetesClusterFeatureParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<KubernetesClusterFeature>, KubernetesClusterFeature>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  featureName: string,
  options: KubernetesClusterFeaturesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkCloud/kubernetesClusters/{kubernetesClusterName}/features/{featureName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      kubernetesClusterName: kubernetesClusterName,
      featureName: featureName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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
): Promise<KubernetesClusterFeature> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return kubernetesClusterFeatureDeserializer(result.body);
}

/** Get properties of the provided the Kubernetes cluster feature. */
export async function get(
  context: Client,
  resourceGroupName: string,
  kubernetesClusterName: string,
  featureName: string,
  options: KubernetesClusterFeaturesGetOptionalParams = { requestOptions: {} },
): Promise<KubernetesClusterFeature> {
  const result = await _getSend(
    context,
    resourceGroupName,
    kubernetesClusterName,
    featureName,
    options,
  );
  return _getDeserialize(result);
}
