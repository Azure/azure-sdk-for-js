// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContainerAppsAssessmentsManagementContext } from "../../api/migrateContainerAppsAssessmentsManagementContext.js";
import { listByParent, get } from "../../api/assessedWebApplicationOperations/operations.js";
import type {
  AssessedWebApplicationOperationsListByParentOptionalParams,
  AssessedWebApplicationOperationsGetOptionalParams,
} from "../../api/assessedWebApplicationOperations/options.js";
import type { AssessedWebApplication } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AssessedWebApplicationOperations operations. */
export interface AssessedWebApplicationOperationsOperations {
  /** List AssessedWebApplication resources by ContainerAppsAssessment */
  listByParent: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    options?: AssessedWebApplicationOperationsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<AssessedWebApplication>;
  /** Get a AssessedWebApplication */
  get: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    assessedWorkload: string,
    options?: AssessedWebApplicationOperationsGetOptionalParams,
  ) => Promise<AssessedWebApplication>;
}

function _getAssessedWebApplicationOperations(
  context: MigrateContainerAppsAssessmentsManagementContext,
) {
  return {
    listByParent: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      options?: AssessedWebApplicationOperationsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, projectName, assessmentName, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      assessedWorkload: string,
      options?: AssessedWebApplicationOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, assessmentName, assessedWorkload, options),
  };
}

export function _getAssessedWebApplicationOperationsOperations(
  context: MigrateContainerAppsAssessmentsManagementContext,
): AssessedWebApplicationOperationsOperations {
  return {
    ..._getAssessedWebApplicationOperations(context),
  };
}
