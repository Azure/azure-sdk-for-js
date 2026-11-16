// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext as Client } from "../index.js";
import type {
  ContainerAppsAssessmentOptions,
  _ContainerAppsAssessmentOptionsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  containerAppsAssessmentOptionsDeserializer,
  _containerAppsAssessmentOptionsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContainerAppsOptionsOperationsListByParentOptionalParams,
  ContainerAppsOptionsOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: ContainerAppsOptionsOperationsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/containerAppsAssessmentOptions{?api%2Dversion}",
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
): Promise<_ContainerAppsAssessmentOptionsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _containerAppsAssessmentOptionsListResultDeserializer(result.body);
}

/** List ContainerAppsAssessmentOptions resources by AssessmentProject */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  options: ContainerAppsOptionsOperationsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerAppsAssessmentOptions> {
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
  assessmentOptionsName: string,
  options: ContainerAppsOptionsOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/containerAppsAssessmentOptions/{assessmentOptionsName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      assessmentOptionsName: assessmentOptionsName,
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
): Promise<ContainerAppsAssessmentOptions> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppsAssessmentOptionsDeserializer(result.body);
}

/** Get a ContainerAppsAssessmentOptions */
export async function get(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentOptionsName: string,
  options: ContainerAppsOptionsOperationsGetOptionalParams = { requestOptions: {} },
): Promise<ContainerAppsAssessmentOptions> {
  const result = await _getSend(
    context,
    resourceGroupName,
    projectName,
    assessmentOptionsName,
    options,
  );
  return _getDeserialize(result);
}
