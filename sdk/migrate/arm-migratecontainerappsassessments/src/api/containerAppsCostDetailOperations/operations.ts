// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContainerAppsAssessmentsManagementContext as Client } from "../index.js";
import type {
  _ContainerAppsCostDetailListResult,
  ContainerAppsCostDetail,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _containerAppsCostDetailListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { ContainerAppsCostDetailOperationsListByParentOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  options: ContainerAppsCostDetailOperationsListByParentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Migrate/assessmentProjects/{projectName}/containerAppsAssessments/{assessmentName}/costDetails{?api%2Dversion}",
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
): Promise<_ContainerAppsCostDetailListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _containerAppsCostDetailListResultDeserializer(result.body);
}

/** List ContainerAppsCostDetail resources by ContainerAppsAssessment */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  projectName: string,
  assessmentName: string,
  options: ContainerAppsCostDetailOperationsListByParentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ContainerAppsCostDetail> {
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
