// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext } from "../../api/migrateContext.js";
import { listByParent, get } from "../../api/containerAppsOptionsOperations/operations.js";
import type {
  ContainerAppsOptionsOperationsListByParentOptionalParams,
  ContainerAppsOptionsOperationsGetOptionalParams,
} from "../../api/containerAppsOptionsOperations/options.js";
import type { ContainerAppsAssessmentOptions } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsOptionsOperations operations. */
export interface ContainerAppsOptionsOperationsOperations {
  /** List ContainerAppsAssessmentOptions resources by AssessmentProject */
  listByParent: (
    resourceGroupName: string,
    projectName: string,
    options?: ContainerAppsOptionsOperationsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsAssessmentOptions>;
  /** Get a ContainerAppsAssessmentOptions */
  get: (
    resourceGroupName: string,
    projectName: string,
    assessmentOptionsName: string,
    options?: ContainerAppsOptionsOperationsGetOptionalParams,
  ) => Promise<ContainerAppsAssessmentOptions>;
}

function _getContainerAppsOptionsOperations(context: MigrateContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      projectName: string,
      options?: ContainerAppsOptionsOperationsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, projectName, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      assessmentOptionsName: string,
      options?: ContainerAppsOptionsOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, projectName, assessmentOptionsName, options),
  };
}

export function _getContainerAppsOptionsOperationsOperations(
  context: MigrateContext,
): ContainerAppsOptionsOperationsOperations {
  return {
    ..._getContainerAppsOptionsOperations(context),
  };
}
