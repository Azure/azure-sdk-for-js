// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext as Client } from "../index.js";
import type {
  FeaturesetVersion,
  _FeaturesetVersionResourceArmPaginatedResult,
  FeaturesetVersionBackfillRequest,
  FeaturesetVersionBackfillResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  featuresetVersionSerializer,
  featuresetVersionDeserializer,
  _featuresetVersionResourceArmPaginatedResultDeserializer,
  featuresetVersionBackfillRequestSerializer,
  featuresetVersionBackfillResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FeaturesetVersionsBackfillOptionalParams,
  FeaturesetVersionsListOptionalParams,
  FeaturesetVersionsDeleteOptionalParams,
  FeaturesetVersionsCreateOrUpdateOptionalParams,
  FeaturesetVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _backfillSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  version: string,
  body: FeaturesetVersionBackfillRequest,
  options: FeaturesetVersionsBackfillOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}/backfill{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: featuresetVersionBackfillRequestSerializer(body),
  });
}

export async function _backfillDeserialize(
  result: PathUncheckedResponse,
): Promise<FeaturesetVersionBackfillResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return featuresetVersionBackfillResponseDeserializer(result.body);
}

/** Backfill. */
export function backfill(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  version: string,
  body: FeaturesetVersionBackfillRequest,
  options: FeaturesetVersionsBackfillOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<FeaturesetVersionBackfillResponse>,
  FeaturesetVersionBackfillResponse
> {
  return getLongRunningPoller(context, _backfillDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _backfillSend(context, resourceGroupName, workspaceName, name, version, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<
    OperationState<FeaturesetVersionBackfillResponse>,
    FeaturesetVersionBackfillResponse
  >;
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: FeaturesetVersionsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions{?api%2Dversion,%24skip,tags,listViewType,pageSize,versionName,version,description,createdBy,stage}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
      "%24skip": options?.skip,
      tags: options?.tags,
      listViewType: options?.listViewType,
      pageSize: options?.pageSize ?? 20,
      versionName: options?.versionName,
      version: options?.version,
      description: options?.description,
      createdBy: options?.createdBy,
      stage: options?.stage,
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
): Promise<_FeaturesetVersionResourceArmPaginatedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _featuresetVersionResourceArmPaginatedResultDeserializer(result.body);
}

/** List versions. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  options: FeaturesetVersionsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FeaturesetVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, name, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  version: string,
  options: FeaturesetVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      version: version,
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

/** Delete version. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  version: string,
  options: FeaturesetVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, workspaceName, name, version, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  version: string,
  body: FeaturesetVersion,
  options: FeaturesetVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      version: version,
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
    body: featuresetVersionSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FeaturesetVersion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return featuresetVersionDeserializer(result.body);
}

/** Create or update version. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  version: string,
  body: FeaturesetVersion,
  options: FeaturesetVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FeaturesetVersion>, FeaturesetVersion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, workspaceName, name, version, body, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<FeaturesetVersion>, FeaturesetVersion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  version: string,
  options: FeaturesetVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/{workspaceName}/featuresets/{name}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      name: name,
      version: version,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FeaturesetVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return featuresetVersionDeserializer(result.body);
}

/** Get version. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  name: string,
  version: string,
  options: FeaturesetVersionsGetOptionalParams = { requestOptions: {} },
): Promise<FeaturesetVersion> {
  const result = await _getSend(context, resourceGroupName, workspaceName, name, version, options);
  return _getDeserialize(result);
}
