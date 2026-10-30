// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureDataTransferContext as Client } from "../index.js";
import type { FlowProfile, FlowProfilePatch, _FlowProfileListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  flowProfileSerializer,
  flowProfileDeserializer,
  flowProfilePatchSerializer,
  _flowProfileListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FlowProfilesListByPipelineOptionalParams,
  FlowProfilesDeleteOptionalParams,
  FlowProfilesUpdateOptionalParams,
  FlowProfilesCreateOrUpdateOptionalParams,
  FlowProfilesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByPipelineSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  options: FlowProfilesListByPipelineOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/flowProfiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _listByPipelineDeserialize(
  result: PathUncheckedResponse,
): Promise<_FlowProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _flowProfileListResultDeserializer(result.body);
}

/** Lists all FlowProfiles under a given Pipeline. */
export function listByPipeline(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  options: FlowProfilesListByPipelineOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FlowProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPipelineSend(context, resourceGroupName, pipelineName, options),
    _listByPipelineDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-06-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  flowProfileName: string,
  options: FlowProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/flowProfiles/{flowProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      flowProfileName: flowProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified FlowProfile resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  flowProfileName: string,
  options: FlowProfilesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, pipelineName, flowProfileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  flowProfileName: string,
  properties: FlowProfilePatch,
  options: FlowProfilesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/flowProfiles/{flowProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      flowProfileName: flowProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: flowProfilePatchSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<FlowProfile> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowProfileDeserializer(result.body);
}

/** Applies partial updates to an existing FlowProfile resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  flowProfileName: string,
  properties: FlowProfilePatch,
  options: FlowProfilesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FlowProfile>, FlowProfile> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, pipelineName, flowProfileName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<FlowProfile>, FlowProfile>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  flowProfileName: string,
  resource: FlowProfile,
  options: FlowProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/flowProfiles/{flowProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      flowProfileName: flowProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: flowProfileSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FlowProfile> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowProfileDeserializer(result.body);
}

/** Creates a new FlowProfile or updates an existing one. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  flowProfileName: string,
  resource: FlowProfile,
  options: FlowProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FlowProfile>, FlowProfile> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        pipelineName,
        flowProfileName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-06-preview",
  }) as PollerLike<OperationState<FlowProfile>, FlowProfile>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  flowProfileName: string,
  options: FlowProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AzureDataTransfer/pipelines/{pipelineName}/flowProfiles/{flowProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      pipelineName: pipelineName,
      flowProfileName: flowProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-02-06-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FlowProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return flowProfileDeserializer(result.body);
}

/** Retrieves the specified FlowProfile resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  pipelineName: string,
  flowProfileName: string,
  options: FlowProfilesGetOptionalParams = { requestOptions: {} },
): Promise<FlowProfile> {
  const result = await _getSend(context, resourceGroupName, pipelineName, flowProfileName, options);
  return _getDeserialize(result);
}
