// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  ManagedComputeDeployment,
  PatchResourceSku,
  _ManagedComputeDeploymentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedComputeDeploymentSerializer,
  managedComputeDeploymentDeserializer,
  patchResourceSkuSerializer,
  _managedComputeDeploymentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedComputeDeploymentsListOptionalParams,
  ManagedComputeDeploymentsDeleteOptionalParams,
  ManagedComputeDeploymentsUpdateOptionalParams,
  ManagedComputeDeploymentsCreateOrUpdateOptionalParams,
  ManagedComputeDeploymentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ManagedComputeDeploymentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedComputeDeployments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-05-15-preview",
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
): Promise<_ManagedComputeDeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _managedComputeDeploymentListResultDeserializer(result.body);
}

/** Gets the managed compute deployments associated with the Cognitive Services account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ManagedComputeDeploymentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedComputeDeployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-05-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  options: ManagedComputeDeploymentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedComputeDeployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-05-15-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified managed compute deployment associated with the Cognitive Services account. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  options: ManagedComputeDeploymentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, deploymentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  properties: PatchResourceSku,
  options: ManagedComputeDeploymentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedComputeDeployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-05-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: patchResourceSkuSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedComputeDeployment> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedComputeDeploymentDeserializer(result.body);
}

/** Updates the specified managed compute deployment associated with the Cognitive Services account. */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  properties: PatchResourceSku,
  options: ManagedComputeDeploymentsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedComputeDeployment>, ManagedComputeDeployment> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, deploymentName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-15-preview",
  }) as PollerLike<OperationState<ManagedComputeDeployment>, ManagedComputeDeployment>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  resource: ManagedComputeDeployment,
  options: ManagedComputeDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedComputeDeployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-05-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: managedComputeDeploymentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedComputeDeployment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedComputeDeploymentDeserializer(result.body);
}

/** Creates or updates a managed compute deployment associated with the Cognitive Services account. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  resource: ManagedComputeDeployment,
  options: ManagedComputeDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedComputeDeployment>, ManagedComputeDeployment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        accountName,
        deploymentName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-15-preview",
  }) as PollerLike<OperationState<ManagedComputeDeployment>, ManagedComputeDeployment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  options: ManagedComputeDeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/managedComputeDeployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-05-15-preview",
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
): Promise<ManagedComputeDeployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return managedComputeDeploymentDeserializer(result.body);
}

/** Gets the specified managed compute deployment associated with the Cognitive Services account. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  options: ManagedComputeDeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedComputeDeployment> {
  const result = await _getSend(context, resourceGroupName, accountName, deploymentName, options);
  return _getDeserialize(result);
}
