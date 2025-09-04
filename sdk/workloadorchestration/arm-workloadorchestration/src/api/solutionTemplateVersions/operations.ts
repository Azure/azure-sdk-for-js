// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadOrchestrationManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SolutionTemplateVersion,
  solutionTemplateVersionDeserializer,
  _SolutionTemplateVersionListResult,
  _solutionTemplateVersionListResultDeserializer,
  BulkDeploySolutionParameter,
  bulkDeploySolutionParameterSerializer,
  BulkPublishSolutionParameter,
  bulkPublishSolutionParameterSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  SolutionTemplateVersionsBulkPublishSolutionOptionalParams,
  SolutionTemplateVersionsBulkDeploySolutionOptionalParams,
  SolutionTemplateVersionsListBySolutionTemplateOptionalParams,
  SolutionTemplateVersionsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _bulkPublishSolutionSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  body: BulkPublishSolutionParameter,
  options: SolutionTemplateVersionsBulkPublishSolutionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/bulkPublishSolution{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
      "api%2Dversion": context.apiVersion,
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
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
  options: SolutionTemplateVersionsBulkPublishSolutionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _bulkPublishSolutionDeserialize, ["202", "200"], {
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
  }) as PollerLike<OperationState<void>, void>;
}

export function _bulkDeploySolutionSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  solutionTemplateVersionName: string,
  body: BulkDeploySolutionParameter,
  options: SolutionTemplateVersionsBulkDeploySolutionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions/{solutionTemplateVersionName}/bulkDeploySolution{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      solutionTemplateVersionName: solutionTemplateVersionName,
      "api%2Dversion": context.apiVersion,
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
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
  options: SolutionTemplateVersionsBulkDeploySolutionOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _bulkDeploySolutionDeserialize, ["202", "200"], {
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
  }) as PollerLike<OperationState<void>, void>;
}

export function _listBySolutionTemplateSend(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  options: SolutionTemplateVersionsListBySolutionTemplateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Edge/solutionTemplates/{solutionTemplateName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      solutionTemplateName: solutionTemplateName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySolutionTemplateDeserialize(
  result: PathUncheckedResponse,
): Promise<_SolutionTemplateVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _solutionTemplateVersionListResultDeserializer(result.body);
}

/** List Solution Template Version Resources */
export function listBySolutionTemplate(
  context: Client,
  resourceGroupName: string,
  solutionTemplateName: string,
  options: SolutionTemplateVersionsListBySolutionTemplateOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SolutionTemplateVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySolutionTemplateSend(context, resourceGroupName, solutionTemplateName, options),
    _listBySolutionTemplateDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
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
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SolutionTemplateVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
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
