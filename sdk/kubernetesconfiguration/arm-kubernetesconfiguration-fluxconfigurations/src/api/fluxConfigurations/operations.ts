// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KubernetesConfigurationContext as Client } from "../index.js";
import type {
  FluxConfiguration,
  FluxConfigurationPatch,
  _FluxConfigurationsList,
} from "../../models/models.js";
import {
  fluxConfigurationSerializer,
  fluxConfigurationDeserializer,
  errorResponseDeserializer,
  fluxConfigurationPatchSerializer,
  _fluxConfigurationsListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FluxConfigurationsListOptionalParams,
  FluxConfigurationsDeleteOptionalParams,
  FluxConfigurationsUpdateOptionalParams,
  FluxConfigurationsCreateOrUpdateOptionalParams,
  FluxConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  options: FluxConfigurationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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
): Promise<_FluxConfigurationsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _fluxConfigurationsListDeserializer(result.body);
}

/** List all Flux Configurations. */
export function list(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  options: FluxConfigurationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FluxConfiguration> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(context, resourceGroupName, clusterRp, clusterResourceName, clusterName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  fluxConfigurationName: string,
  options: FluxConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations/{fluxConfigurationName}{?api%2Dversion,forceDelete}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      fluxConfigurationName: fluxConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
      forceDelete: options?.forceDelete,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** This will delete the YAML file used to set up the Flux Configuration, thus stopping future sync from the source repo. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  fluxConfigurationName: string,
  options: FluxConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  fluxConfigurationName: string,
  fluxConfigurationPatch: FluxConfigurationPatch,
  options: FluxConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations/{fluxConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      fluxConfigurationName: fluxConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fluxConfigurationPatchSerializer(fluxConfigurationPatch),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<FluxConfiguration> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fluxConfigurationDeserializer(result.body);
}

/** Update an existing Kubernetes Flux Configuration. */
export function update(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  fluxConfigurationName: string,
  fluxConfigurationPatch: FluxConfigurationPatch,
  options: FluxConfigurationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FluxConfiguration>, FluxConfiguration> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        fluxConfigurationPatch,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<FluxConfiguration>, FluxConfiguration>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  fluxConfigurationName: string,
  fluxConfiguration: FluxConfiguration,
  options: FluxConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations/{fluxConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      fluxConfigurationName: fluxConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: fluxConfigurationSerializer(fluxConfiguration),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FluxConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fluxConfigurationDeserializer(result.body);
}

/** Create a new Kubernetes Flux Configuration. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  fluxConfigurationName: string,
  fluxConfiguration: FluxConfiguration,
  options: FluxConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FluxConfiguration>, FluxConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        clusterRp,
        clusterResourceName,
        clusterName,
        fluxConfigurationName,
        fluxConfiguration,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-04-01",
  }) as PollerLike<OperationState<FluxConfiguration>, FluxConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  fluxConfigurationName: string,
  options: FluxConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{clusterRp}/{clusterResourceName}/{clusterName}/providers/Microsoft.KubernetesConfiguration/fluxConfigurations/{fluxConfigurationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      clusterRp: clusterRp,
      clusterResourceName: clusterResourceName,
      clusterName: clusterName,
      fluxConfigurationName: fluxConfigurationName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FluxConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return fluxConfigurationDeserializer(result.body);
}

/** Gets details of the Flux Configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  clusterRp: string,
  clusterResourceName: string,
  clusterName: string,
  fluxConfigurationName: string,
  options: FluxConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<FluxConfiguration> {
  const result = await _getSend(
    context,
    resourceGroupName,
    clusterRp,
    clusterResourceName,
    clusterName,
    fluxConfigurationName,
    options,
  );
  return _getDeserialize(result);
}
