// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "../index.js";
import type { AdapterDeployment, _AdapterDeploymentListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  adapterDeploymentSerializer,
  adapterDeploymentDeserializer,
  _adapterDeploymentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AdapterDeploymentsDeleteOptionalParams,
  AdapterDeploymentsListOptionalParams,
  AdapterDeploymentsCreateOrUpdateOptionalParams,
  AdapterDeploymentsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  adapterDeploymentName: string,
  options: AdapterDeploymentsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/adapterDeployments/{adapterDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      adapterDeploymentName: adapterDeploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-09-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
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

/** Drains requests and deletes an adapter deployment and its serving snapshot. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  adapterDeploymentName: string,
  options: AdapterDeploymentsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, accountName, adapterDeploymentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AdapterDeploymentsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/adapterDeployments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      "api%2Dversion": context.apiVersion ?? "2026-09-15-preview",
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
): Promise<_AdapterDeploymentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _adapterDeploymentListResultDeserializer(result.body);
}

/** Lists adapter deployments associated with the Cognitive Services account. */
export function list(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  options: AdapterDeploymentsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AdapterDeployment> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, accountName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-09-15-preview",
    },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  adapterDeploymentName: string,
  resource: AdapterDeployment,
  options: AdapterDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/adapterDeployments/{adapterDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      adapterDeploymentName: adapterDeploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-09-15-preview",
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
    body: adapterDeploymentSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AdapterDeployment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return adapterDeploymentDeserializer(result.body);
}

/**
 * Creates an adapter deployment or re-targets it to another compatible
 * managed compute deployment. The source model ID is immutable.
 * Returns 201 for a new adapter or 200 for an existing adapter, including retries.
 * Either response may require polling while provisioning is in progress.
 * After polling completes, retrieve the final resource from the original resource URL.
 * Omit conditional headers to allow either creation or update.
 * To create only when absent, send If-None-Match: *.
 * To update only a matching version, send If-Match with the ETag returned by GET.
 * Conditional requests, including retries, return 412 if the precondition is not met.
 */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  adapterDeploymentName: string,
  resource: AdapterDeployment,
  options: AdapterDeploymentsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AdapterDeployment>, AdapterDeployment> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        accountName,
        adapterDeploymentName,
        resource,
        options,
      ),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2026-09-15-preview",
  }) as PollerLike<OperationState<AdapterDeployment>, AdapterDeployment>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  adapterDeploymentName: string,
  options: AdapterDeploymentsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CognitiveServices/accounts/{accountName}/adapterDeployments/{adapterDeploymentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      accountName: accountName,
      adapterDeploymentName: adapterDeploymentName,
      "api%2Dversion": context.apiVersion ?? "2026-09-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AdapterDeployment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return adapterDeploymentDeserializer(result.body);
}

/** Gets an adapter deployment by name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  accountName: string,
  adapterDeploymentName: string,
  options: AdapterDeploymentsGetOptionalParams = { requestOptions: {} },
): Promise<AdapterDeployment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    accountName,
    adapterDeploymentName,
    options,
  );
  return _getDeserialize(result);
}
