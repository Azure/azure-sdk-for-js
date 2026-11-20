// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MigrateContext } from "../../api/migrateContext.js";
import {
  listByParent,
  get,
} from "../../api/containerAppsManagedEnvironmentOperations/operations.js";
import type {
  ContainerAppsManagedEnvironmentOperationsListByParentOptionalParams,
  ContainerAppsManagedEnvironmentOperationsGetOptionalParams,
} from "../../api/containerAppsManagedEnvironmentOperations/options.js";
import type { ContainerAppsManagedEnvironment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainerAppsManagedEnvironmentOperations operations. */
export interface ContainerAppsManagedEnvironmentOperationsOperations {
  /** List ContainerAppsManagedEnvironment resources by ContainerAppsAssessment */
  listByParent: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    options?: ContainerAppsManagedEnvironmentOperationsListByParentOptionalParams,
  ) => PagedAsyncIterableIterator<ContainerAppsManagedEnvironment>;
  /** Get a ContainerAppsManagedEnvironment */
  get: (
    resourceGroupName: string,
    projectName: string,
    assessmentName: string,
    managedEnvironmentName: string,
    options?: ContainerAppsManagedEnvironmentOperationsGetOptionalParams,
  ) => Promise<ContainerAppsManagedEnvironment>;
}

function _getContainerAppsManagedEnvironmentOperations(context: MigrateContext) {
  return {
    listByParent: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      options?: ContainerAppsManagedEnvironmentOperationsListByParentOptionalParams,
    ) => listByParent(context, resourceGroupName, projectName, assessmentName, options),
    get: (
      resourceGroupName: string,
      projectName: string,
      assessmentName: string,
      managedEnvironmentName: string,
      options?: ContainerAppsManagedEnvironmentOperationsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, projectName, assessmentName, managedEnvironmentName, options),
  };
}

export function _getContainerAppsManagedEnvironmentOperationsOperations(
  context: MigrateContext,
): ContainerAppsManagedEnvironmentOperationsOperations {
  return {
    ..._getContainerAppsManagedEnvironmentOperations(context),
  };
}
