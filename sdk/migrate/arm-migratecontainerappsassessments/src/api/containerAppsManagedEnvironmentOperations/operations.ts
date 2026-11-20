// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext as Client } from "../index.js";
import type {
  ContainerAppsManagedEnvironment,
  _ContainerAppsManagedEnvironmentListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  containerAppsManagedEnvironmentDeserializer,
  _containerAppsManagedEnvironmentListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ContainerAppsManagedEnvironmentOperationsListByParentOptionalParams,
  ContainerAppsManagedEnvironmentOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  options: ContainerAppsManagedEnvironmentOperationsListByParentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/containerAppsAssessments/{assessmentName}/managedEnvironments{?api%2Dversion}",
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_ContainerAppsManagedEnvironmentListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _containerAppsManagedEnvironmentListResultDeserializer(result.body);
}

/** List ContainerAppsManagedEnvironment resources by ContainerAppsAssessment */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  options: ContainerAppsManagedEnvironmentOperationsListByParentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ContainerAppsManagedEnvironment> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, projectName, assessmentName, options),
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
  managedEnvironmentName: string,
  options: ContainerAppsManagedEnvironmentOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/containerAppsAssessments/{assessmentName}/managedEnvironments/{managedEnvironmentName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      projectName: projectName,
      assessmentName: assessmentName,
      managedEnvironmentName: managedEnvironmentName,
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
): Promise<ContainerAppsManagedEnvironment> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return containerAppsManagedEnvironmentDeserializer(result.body);
}

/** Get a ContainerAppsManagedEnvironment */
export async function get(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  managedEnvironmentName: string,
  options: ContainerAppsManagedEnvironmentOperationsGetOptionalParams = { requestOptions: {} },
): Promise<ContainerAppsManagedEnvironment> {
  const result = await _getSend(
    context,
    resourceGroupName,
    projectName,
    assessmentName,
    managedEnvironmentName,
    options,
  );
  return _getDeserialize(result);
}
