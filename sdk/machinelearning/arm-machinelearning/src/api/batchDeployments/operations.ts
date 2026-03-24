// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  BatchDeployment,
  PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
  _BatchDeploymentTrackedResourceArmPaginatedResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  batchDeploymentSerializer,
  batchDeploymentDeserializer,
  partialBatchDeploymentPartialMinimalTrackedResourceWithPropertiesSerializer,
  _batchDeploymentTrackedResourceArmPaginatedResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  BatchDeploymentsListOptionalParams,
  BatchDeploymentsDeleteOptionalParams,
  BatchDeploymentsUpdateOptionalParams,
  BatchDeploymentsCreateOrUpdateOptionalParams,
  BatchDeploymentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: BatchDeploymentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments{?api%2Dversion,%24orderBy,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      "%24orderBy": options?.orderBy,
      "%24top": options?.top,
      "%24skip": options?.skip,
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
): Promise<_BatchDeploymentTrackedResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _batchDeploymentTrackedResourceArmPaginatedResultDeserializer(result.body);
}

/** Lists Batch inference deployments in the workspace. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  options: BatchDeploymentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BatchDeployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, endpointName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  options: BatchDeploymentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

/** Delete Batch Inference deployment (asynchronous). */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  options: BatchDeploymentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  body: PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
  options: BatchDeploymentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partialBatchDeploymentPartialMinimalTrackedResourceWithPropertiesSerializer(body),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<BatchDeployment> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return batchDeploymentDeserializer(result.body);
}

/** Update a batch inference deployment (asynchronous). */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  body: PartialBatchDeploymentPartialMinimalTrackedResourceWithProperties,
  options: BatchDeploymentsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BatchDeployment>, BatchDeployment> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<BatchDeployment>, BatchDeployment>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  body: BatchDeployment,
  options: BatchDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: batchDeploymentSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchDeployment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return batchDeploymentDeserializer(result.body);
}

/** Creates/updates a batch inference deployment (asynchronous). */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  body: BatchDeployment,
  options: BatchDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BatchDeployment>, BatchDeployment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        workspaceName,
        endpointName,
        deploymentName,
        body,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<BatchDeployment>, BatchDeployment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  options: BatchDeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/batchEndpoints/{endpointName}/deployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      endpointName: endpointName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BatchDeployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return batchDeploymentDeserializer(result.body);
}

/** Gets a batch inference deployment by id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  endpointName: string,
  deploymentName: string,
  options: BatchDeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<BatchDeployment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    endpointName,
    deploymentName,
    options,
  );
  return _getDeserialize(result);
}
