// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext as Client } from "../index.js";
import type {
  ContainerAppsAssessment,
  _ContainerAppsAssessmentListResult,
  DownloadUrl,
} from "../../models/models.js";
import {
  containerAppsAssessmentSerializer,
  containerAppsAssessmentDeserializer,
  errorResponseDeserializer,
  _containerAppsAssessmentListResultDeserializer,
  downloadUrlDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContainerAppsAssessmentOperationsDownloadUrlOptionalParams,
  ContainerAppsAssessmentOperationsDeleteOptionalParams,
  ContainerAppsAssessmentOperationsListByParentOptionalParams,
  ContainerAppsAssessmentOperationsGetOptionalParams,
  ContainerAppsAssessmentOperationsCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _downloadUrlSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  options: ContainerAppsAssessmentOperationsDownloadUrlOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/containerAppsAssessments/{assessmentName}/downloadUrl{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      assessmentName: assessmentName,
      "api%2Dversion": context.apiVersion ?? "2025-09-09-preview",
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

export async function _downloadUrlDeserialize(result: PathUncheckedResponse): Promise<DownloadUrl> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return downloadUrlDeserializer(result.body);
}

/** Get URL for downloading Azure Container Apps Assessment Report. */
export function downloadUrl(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  options: ContainerAppsAssessmentOperationsDownloadUrlOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DownloadUrl>, DownloadUrl> {
  return getLongRunningPoller(context, _downloadUrlDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _downloadUrlSend(context, resourceGroupName, projectName, assessmentName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-09-09-preview",
  }) as PollerLike<OperationState<DownloadUrl>, DownloadUrl>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  options: ContainerAppsAssessmentOperationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/containerAppsAssessments/{assessmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      assessmentName: assessmentName,
      "api%2Dversion": context.apiVersion ?? "2025-09-09-preview",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a ContainerAppsAssessment */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  options: ContainerAppsAssessmentOperationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    projectName,
    assessmentName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: ContainerAppsAssessmentOperationsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/containerAppsAssessments{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      "api%2Dversion": context.apiVersion ?? "2025-09-09-preview",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContainerAppsAssessmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _containerAppsAssessmentListResultDeserializer(result.body);
}

/** List ContainerAppsAssessment resources by AssessmentProject */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: ContainerAppsAssessmentOperationsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerAppsAssessment> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, projectName, options),
    _listByParentDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-09-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  options: ContainerAppsAssessmentOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/containerAppsAssessments/{assessmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      assessmentName: assessmentName,
      "api%2Dversion": context.apiVersion ?? "2025-09-09-preview",
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
): Promise<ContainerAppsAssessment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppsAssessmentDeserializer(result.body);
}

/** Get a ContainerAppsAssessment */
export async function get(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  options: ContainerAppsAssessmentOperationsGetOptionalParams = { requestOptions: {} },
): Promise<ContainerAppsAssessment> {
  const result = await _getSend(context, resourceGroupName, projectName, assessmentName, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  resource: ContainerAppsAssessment,
  options: ContainerAppsAssessmentOperationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/containerAppsAssessments/{assessmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      assessmentName: assessmentName,
      "api%2Dversion": context.apiVersion ?? "2025-09-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: containerAppsAssessmentSerializer(resource),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ContainerAppsAssessment> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppsAssessmentDeserializer(result.body);
}

/** Create a ContainerAppsAssessment */
export function create(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  resource: ContainerAppsAssessment,
  options: ContainerAppsAssessmentOperationsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ContainerAppsAssessment>, ContainerAppsAssessment> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, projectName, assessmentName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-09-09-preview",
  }) as PollerLike<OperationState<ContainerAppsAssessment>, ContainerAppsAssessment>;
}
