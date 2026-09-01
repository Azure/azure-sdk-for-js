// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type {
  ArcDeployment,
  ArcDeploymentUpdate,
  _ArcDeploymentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  arcDeploymentSerializer,
  arcDeploymentDeserializer,
  arcDeploymentUpdateSerializer,
  _arcDeploymentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ArcDeploymentsListOptionalParams,
  ArcDeploymentsDeleteOptionalParams,
  ArcDeploymentsUpdateOptionalParams,
  ArcDeploymentsCreateOrUpdateOptionalParams,
  ArcDeploymentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ArcDeploymentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/arcDeployments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-07-15-preview",
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
): Promise<_ArcDeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _arcDeploymentListResultDeserializer(result.body);
}

/** Gets the Arc deployments associated with the Cognitive Services account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: ArcDeploymentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ArcDeployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  options: ArcDeploymentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/arcDeployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-07-15-preview",
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

/** Deletes the specified Arc deployment associated with the Cognitive Services account. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  options: ArcDeploymentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, deploymentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  properties: ArcDeploymentUpdate,
  options: ArcDeploymentsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/arcDeployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: arcDeploymentUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ArcDeployment> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return arcDeploymentDeserializer(result.body);
}

/** Updates the specified Arc deployment associated with the Cognitive Services account. */
export function update(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  properties: ArcDeploymentUpdate,
  options: ArcDeploymentsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArcDeployment>, ArcDeployment> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, accountName, deploymentName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-15-preview",
  }) as PollerLike<OperationState<ArcDeployment>, ArcDeployment>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  resource: ArcDeployment,
  options: ArcDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/arcDeployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: arcDeploymentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ArcDeployment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return arcDeploymentDeserializer(result.body);
}

/** Creates or updates an Arc deployment associated with the Cognitive Services account. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  resource: ArcDeployment,
  options: ArcDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArcDeployment>, ArcDeployment> {
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
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-15-preview",
  }) as PollerLike<OperationState<ArcDeployment>, ArcDeployment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  options: ArcDeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/arcDeployments/{deploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      deploymentName: deploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-07-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ArcDeployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return arcDeploymentDeserializer(result.body);
}

/** Gets the specified Arc deployment associated with the Cognitive Services account. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  deploymentName: string,
  options: ArcDeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<ArcDeployment> {
  const result = await _getSend(context, resourceGroupName, accountName, deploymentName, options);
  return _getDeserialize(result);
}
