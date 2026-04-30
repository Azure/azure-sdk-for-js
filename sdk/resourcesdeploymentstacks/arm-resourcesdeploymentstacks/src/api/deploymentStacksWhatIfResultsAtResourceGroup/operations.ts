// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeploymentStacksContext as Client } from "../index.js";
import type {
  DeploymentStacksWhatIfResult,
  _DeploymentStacksWhatIfResultListResult,
} from "../../models/models.js";
import {
  deploymentStacksWhatIfResultSerializer,
  deploymentStacksWhatIfResultDeserializer,
  errorResponseDeserializer,
  _deploymentStacksWhatIfResultListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupDeleteOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupListOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _whatIfSend(
  context: Client,
  resourceGroupName: string,
  deploymentStacksWhatIfResultName: string,
  options: DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}/whatIf{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentStacksWhatIfResultName: deploymentStacksWhatIfResultName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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

export async function _whatIfDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStacksWhatIfResult> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStacksWhatIfResultDeserializer(result.body);
}

/** Returns property-level changes that will be made by the deployment if executed. */
export function whatIf(
  context: Client,
  resourceGroupName: string,
  deploymentStacksWhatIfResultName: string,
  options: DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult> {
  return getLongRunningPoller(context, _whatIfDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _whatIfSend(context, resourceGroupName, deploymentStacksWhatIfResultName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  deploymentStacksWhatIfResultName: string,
  options: DeploymentStacksWhatIfResultsAtResourceGroupDeleteOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}{?api%2Dversion,unmanageAction.Resources,unmanageAction.ResourceGroups,unmanageAction.ManagementGroups,unmanageAction.ResourcesWithoutDeleteSupport,bypassStackOutOfSyncError}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentStacksWhatIfResultName: deploymentStacksWhatIfResultName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
      "unmanageAction.Resources": options?.unmanageActionResources,
      "unmanageAction.ResourceGroups": options?.unmanageActionResourceGroups,
      "unmanageAction.ManagementGroups": options?.unmanageActionManagementGroups,
      "unmanageAction.ResourcesWithoutDeleteSupport":
        options?.unmanageActionResourcesWithoutDeleteSupport,
      bypassStackOutOfSyncError: options?.bypassStackOutOfSyncError,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  deploymentStacksWhatIfResultName: string,
  options: DeploymentStacksWhatIfResultsAtResourceGroupDeleteOptionalParams = {
    requestOptions: {},
  },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    deploymentStacksWhatIfResultName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  deploymentStacksWhatIfResultName: string,
  resource: DeploymentStacksWhatIfResult,
  options: DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentStacksWhatIfResultName: deploymentStacksWhatIfResultName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: deploymentStacksWhatIfResultSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeploymentStacksWhatIfResult> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStacksWhatIfResultDeserializer(result.body);
}

/** Creates or updates a Deployment stack at the specified scope. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  deploymentStacksWhatIfResultName: string,
  resource: DeploymentStacksWhatIfResult,
  options: DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        deploymentStacksWhatIfResultName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-07-01",
  }) as PollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: DeploymentStacksWhatIfResultsAtResourceGroupListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacksWhatIfResults{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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
): Promise<_DeploymentStacksWhatIfResultListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _deploymentStacksWhatIfResultListResultDeserializer(result.body);
}

/** Lists Deployment stacks at the specified scope. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: DeploymentStacksWhatIfResultsAtResourceGroupListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeploymentStacksWhatIfResult> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-07-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  deploymentStacksWhatIfResultName: string,
  options: DeploymentStacksWhatIfResultsAtResourceGroupGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Resources/deploymentStacksWhatIfResults/{deploymentStacksWhatIfResultName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      deploymentStacksWhatIfResultName: deploymentStacksWhatIfResultName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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
): Promise<DeploymentStacksWhatIfResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return deploymentStacksWhatIfResultDeserializer(result.body);
}

/** Gets the Deployment stack with the given name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  deploymentStacksWhatIfResultName: string,
  options: DeploymentStacksWhatIfResultsAtResourceGroupGetOptionalParams = { requestOptions: {} },
): Promise<DeploymentStacksWhatIfResult> {
  const result = await _getSend(
    context,
    resourceGroupName,
    deploymentStacksWhatIfResultName,
    options,
  );
  return _getDeserialize(result);
}
