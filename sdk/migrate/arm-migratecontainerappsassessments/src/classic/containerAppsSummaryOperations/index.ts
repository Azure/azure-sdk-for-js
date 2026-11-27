// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContainerAppsAssessmentsManagementContext } from "../../api/migrateContainerAppsAssessmentsManagementContext.js";
import { listByParent, get } from "../../api/containerAppsSummaryOperations/operations.js";
import type {
  ContainerAppsSummaryOperationsListByParentOptionalParams,
  ContainerAppsSummaryOperationsGetOptionalParams,
} from "../../api/containerAppsSummaryOperations/options.js";
import type { ContainerAppsSummary } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsSummaryOperations operations. */
export interface ContainerAppsSummaryOperationsOperations {
  /** List ContainerAppsSummary resources by ContainerAppsAssessment */
  listByParent: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    options?: ContainerAppsSummaryOperationsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsSummary>;
  /** Get a ContainerAppsSummary */
  get: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    summaryName: string,
    options?: ContainerAppsSummaryOperationsGetOptionalParams,
  ) => Promise<ContainerAppsSummary>;
}

function _getContainerAppsSummaryOperations(
  context: MigrateContainerAppsAssessmentsManagementContext,
) {
  return {
    listByParent: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      options?: ContainerAppsSummaryOperationsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, projectName, assessmentName, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      summaryName: string,
      options?: ContainerAppsSummaryOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, assessmentName, summaryName, options),
  };
}

export function _getContainerAppsSummaryOperationsOperations(
  context: MigrateContainerAppsAssessmentsManagementContext,
): ContainerAppsSummaryOperationsOperations {
  return {
    ..._getContainerAppsSummaryOperations(context),
  };
}
