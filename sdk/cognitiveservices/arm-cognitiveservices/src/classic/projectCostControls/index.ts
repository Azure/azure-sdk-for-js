// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  checkExistence,
  get,
} from "../../api/projectCostControls/operations.js";
import type {
  ProjectCostControlsListOptionalParams,
  ProjectCostControlsDeleteOptionalParams,
  ProjectCostControlsUpdateOptionalParams,
  ProjectCostControlsCreateOrUpdateOptionalParams,
  ProjectCostControlsCheckExistenceOptionalParams,
  ProjectCostControlsGetOptionalParams,
} from "../../api/projectCostControls/options.js";
import type { CostControlPatch, ProjectCostControl } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProjectCostControls operations. */
export interface ProjectCostControlsOperations {
  /** Lists project-owned cost controls. */
  list: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    options?: ProjectCostControlsListOptionalParams,
  ) => PagedAsyncIterableIterator<ProjectCostControl>;
  /** Deletes a project-owned cost control. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    costControlName: string,
    options?: ProjectCostControlsDeleteOptionalParams,
  ) => Promise<void>;
  /**
   * Updates a Foundry project cost control. Omitting properties preserves all existing cost control properties; setting properties to null or an empty object ({}) clears them all.
   * A non-empty properties object updates selected fields, preserving omitted fields; a successful update that leaves the cost control unchanged retains its entity tag.
   * The complete merged result may contain at most one notification, including disabled notifications, and one Block action.
   * Exceeding either limit returns HTTP 400 without changing the stored definition.
   */
  update: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    costControlName: string,
    properties: CostControlPatch,
    options?: ProjectCostControlsUpdateOptionalParams,
  ) => Promise<ProjectCostControl>;
  /**
   * Creates or replaces a project-owned cost control.
   * The definition may contain at most one notification, including disabled notifications, and one Block action.
   * Exceeding either limit returns HTTP 400 without persisting the request.
   */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    costControlName: string,
    resource: ProjectCostControl,
    options?: ProjectCostControlsCreateOrUpdateOptionalParams,
  ) => Promise<ProjectCostControl>;
  /** Checks whether a project-owned cost control exists without returning its body. */
  checkExistence: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    costControlName: string,
    options?: ProjectCostControlsCheckExistenceOptionalParams,
  ) => Promise<void>;
  /** Gets a project-owned cost control and its representation entity tag. */
  get: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    costControlName: string,
    options?: ProjectCostControlsGetOptionalParams,
  ) => Promise<ProjectCostControl>;
}

function _getProjectCostControls(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      options?: ProjectCostControlsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, projectName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      costControlName: string,
      options?: ProjectCostControlsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, projectName, costControlName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      costControlName: string,
      properties: CostControlPatch,
      options?: ProjectCostControlsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        projectName,
        costControlName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      costControlName: string,
      resource: ProjectCostControl,
      options?: ProjectCostControlsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        costControlName,
        resource,
        options,
      ),
    checkExistence: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      costControlName: string,
      options?: ProjectCostControlsCheckExistenceOptionalParams,
    ) =>
      checkExistence(
        context,
        resourceGroupName,
        accountName,
        projectName,
        costControlName,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      costControlName: string,
      options?: ProjectCostControlsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, projectName, costControlName, options),
  };
}

export function _getProjectCostControlsOperations(
  context: CognitiveServicesManagementContext,
): ProjectCostControlsOperations {
  return {
    ..._getProjectCostControls(context),
  };
}
