// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import type {
  SolutionTemplateVersion,
  _SolutionTemplateVersionListResult,
  BulkDeploySolutionParameter,
  BulkPublishSolutionParameter,
  BulkReviewSolutionParameter,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  solutionTemplateVersionSerializer,
  solutionTemplateVersionDeserializer,
  _solutionTemplateVersionListResultDeserializer,
  bulkDeploySolutionParameterSerializer,
  bulkPublishSolutionParameterSerializer,
  bulkReviewSolutionParameterSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SolutionTemplateVersionsBulkReviewSolutionOptionalParams,
  SolutionTemplateVersionsBulkPublishSolutionOptionalParams,
  SolutionTemplateVersionsBulkDeploySolutionOptionalParams,
  SolutionTemplateVersionsListBySolutionTemplateOptionalParams,
  SolutionTemplateVersionsDeleteOptionalParams,
  SolutionTemplateVersionsUpdateOptionalParams,
  SolutionTemplateVersionsCreateOrUpdateOptionalParams,
  SolutionTemplateVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _bulkReviewSolutionSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  body: BulkReviewSolutionParameter,
  options: SolutionTemplateVersionsBulkReviewSolutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/bulkReviewSolution{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: bulkReviewSolutionParameterSerializer(body),
  });
}

export async function _bulkReviewSolutionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Post request for bulk review */
export function bulkReviewSolution(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  body: BulkReviewSolutionParameter,
  options: SolutionTemplateVersionsBulkReviewSolutionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _bulkReviewSolutionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _bulkReviewSolutionSend(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _bulkPublishSolutionSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  body: BulkPublishSolutionParameter,
  options: SolutionTemplateVersionsBulkPublishSolutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/bulkPublishSolution{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: bulkPublishSolutionParameterSerializer(body),
  });
}

export async function _bulkPublishSolutionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Post request for bulk publish */
export function bulkPublishSolution(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  body: BulkPublishSolutionParameter,
  options: SolutionTemplateVersionsBulkPublishSolutionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _bulkPublishSolutionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _bulkPublishSolutionSend(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _bulkDeploySolutionSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  body: BulkDeploySolutionParameter,
  options: SolutionTemplateVersionsBulkDeploySolutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/bulkDeploySolution{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: bulkDeploySolutionParameterSerializer(body),
  });
}

export async function _bulkDeploySolutionDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Post request for bulk deploy */
export function bulkDeploySolution(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  body: BulkDeploySolutionParameter,
  options: SolutionTemplateVersionsBulkDeploySolutionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _bulkDeploySolutionDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _bulkDeploySolutionSend(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySolutionTemplateSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  options: SolutionTemplateVersionsListBySolutionTemplateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
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

export async function _listBySolutionTemplateDeserialize(
  result: PathUncheckedResponse,
): Promise<_SolutionTemplateVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _solutionTemplateVersionListResultDeserializer(result.body);
}

/** List Solution Template Version Resources */
export function listBySolutionTemplate(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  options: SolutionTemplateVersionsListBySolutionTemplateOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SolutionTemplateVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySolutionTemplateSend(context, resourceGroupName, solutionTemplateName, options),
    _listBySolutionTemplateDeserialize,
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
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  options: SolutionTemplateVersionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
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

/** Delete a Solution Template Version Resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  options: SolutionTemplateVersionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  properties: SolutionTemplateVersion,
  options: SolutionTemplateVersionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: solutionTemplateVersionSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionTemplateVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return solutionTemplateVersionDeserializer(result.body);
}

/** Update a Solution Template Version Resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  properties: SolutionTemplateVersion,
  options: SolutionTemplateVersionsUpdateOptionalParams = { requestOptions: {} },
): Promise<SolutionTemplateVersion> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    solutionTemplateName,
    solutionTemplateVersionName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  resource: SolutionTemplateVersion,
  options: SolutionTemplateVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: solutionTemplateVersionSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionTemplateVersion> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return solutionTemplateVersionDeserializer(result.body);
}

/** Create or update a Solution Template Version Resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  resource: SolutionTemplateVersion,
  options: SolutionTemplateVersionsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SolutionTemplateVersion>, SolutionTemplateVersion> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        solutionTemplateName,
        solutionTemplateVersionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01-preview",
  }) as PollerLike<OperationState<SolutionTemplateVersion>, SolutionTemplateVersion>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  options: SolutionTemplateVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
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
): Promise<SolutionTemplateVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return solutionTemplateVersionDeserializer(result.body);
}

/** Get a Solution Template Version Resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  options: SolutionTemplateVersionsGetOptionalParams = { requestOptions: {} },
): Promise<SolutionTemplateVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    solutionTemplateName,
    solutionTemplateVersionName,
    options,
  );
  return _getDeserialize(result);
}
