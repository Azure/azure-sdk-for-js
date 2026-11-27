// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContainerAppsAssessmentsManagementContext } from "../../api/migrateContainerAppsAssessmentsManagementContext.js";
import { listByParent } from "../../api/containerAppsCostDetailOperations/operations.js";
import type { ContainerAppsCostDetailOperationsListByParentOptionalParams } from "../../api/containerAppsCostDetailOperations/options.js";
import type { ContainerAppsCostDetail } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsCostDetailOperations operations. */
export interface ContainerAppsCostDetailOperationsOperations {
  /** List ContainerAppsCostDetail resources by ContainerAppsAssessment */
  listByParent: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    options?: ContainerAppsCostDetailOperationsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsCostDetail>;
}

function _getContainerAppsCostDetailOperations(
  context: MigrateContainerAppsAssessmentsManagementContext,
) {
  return {
    listByParent: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      options?: ContainerAppsCostDetailOperationsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, projectName, assessmentName, options),
  };
}

export function _getContainerAppsCostDetailOperationsOperations(
  context: MigrateContainerAppsAssessmentsManagementContext,
): ContainerAppsCostDetailOperationsOperations {
  return {
    ..._getContainerAppsCostDetailOperations(context),
  };
}
