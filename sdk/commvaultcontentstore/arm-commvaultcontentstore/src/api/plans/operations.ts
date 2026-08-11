// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext as Client } from "../index.js";
import type { CommvaultPlan, _CommvaultPlanListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  commvaultPlanSerializer,
  commvaultPlanDeserializer,
  _commvaultPlanListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PlansListByCloudAccountOptionalParams,
  PlansDeleteOptionalParams,
  PlansCreateOrupdateOptionalParams,
  PlansGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByCloudAccountSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: PlansListByCloudAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/plans{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

export async function _listByCloudAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_CommvaultPlanListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _commvaultPlanListResultDeserializer(result.body);
}

/** List CommvaultPlan resources by CloudAccount */
export function listByCloudAccount(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  options: PlansListByCloudAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommvaultPlan> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCloudAccountSend(context, resourceGroupName, cloudAccountName, options),
    _listByCloudAccountDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-03-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  planName: string,
  options: PlansDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/plans/{planName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      planName: planName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

/** Delete a CommvaultPlan */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  planName: string,
  options: PlansDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cloudAccountName, planName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-03-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrupdateSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  planName: string,
  resource: CommvaultPlan,
  options: PlansCreateOrupdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/plans/{planName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      planName: planName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: commvaultPlanSerializer(resource),
  });
}

export async function _createOrupdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CommvaultPlan> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return commvaultPlanDeserializer(result.body);
}

/** Create a CommvaultPlan */
export function createOrupdate(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  planName: string,
  resource: CommvaultPlan,
  options: PlansCreateOrupdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CommvaultPlan>, CommvaultPlan> {
  return getLongRunningPoller(context, _createOrupdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrupdateSend(
        context,
        resourceGroupName,
        cloudAccountName,
        planName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-03-preview",
  }) as PollerLike<OperationState<CommvaultPlan>, CommvaultPlan>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  planName: string,
  options: PlansGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Commvault.ContentStore/cloudAccounts/{cloudAccountName}/plans/{planName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudAccountName: cloudAccountName,
      planName: planName,
      "api%2Dversion": context.apiVersion ?? "2026-07-03-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CommvaultPlan> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return commvaultPlanDeserializer(result.body);
}

/** Get a CommvaultPlan */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudAccountName: string,
  planName: string,
  options: PlansGetOptionalParams = { requestOptions: {} },
): Promise<CommvaultPlan> {
  const result = await _getSend(context, resourceGroupName, cloudAccountName, planName, options);
  return _getDeserialize(result);
}
