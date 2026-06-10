// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext } from "../../api/devCenterContext.js";
import {
  listByDevCenter,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/projectPolicies/operations.js";
import type {
  ProjectPoliciesListByDevCenterOptionalParams,
  ProjectPoliciesDeleteOptionalParams,
  ProjectPoliciesUpdateOptionalParams,
  ProjectPoliciesCreateOrUpdateOptionalParams,
  ProjectPoliciesGetOptionalParams,
} from "../../api/projectPolicies/options.js";
import type { ProjectPolicy, ProjectPolicyUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProjectPolicies operations. */
export interface ProjectPoliciesOperations {
  /** Lists all project policies in the dev center. */
  listByDevCenter: (
    resourceGroupName: string,
    devCenterName: string,
    options?: ProjectPoliciesListByDevCenterOptionalParams,
  ) => PagedAsyncIterableIterator<ProjectPolicy>;
  /** Deletes an project policy. */
  delete: (
    resourceGroupName: string,
    devCenterName: string,
    projectPolicyName: string,
    options?: ProjectPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Partially updates an project policy. */
  update: (
    resourceGroupName: string,
    devCenterName: string,
    projectPolicyName: string,
    body: ProjectPolicyUpdate,
    options?: ProjectPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<ProjectPolicy>, ProjectPolicy>;
  /** Creates or updates an project policy. */
  createOrUpdate: (
    resourceGroupName: string,
    devCenterName: string,
    projectPolicyName: string,
    body: ProjectPolicy,
    options?: ProjectPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ProjectPolicy>, ProjectPolicy>;
  /** Gets a specific project policy. */
  get: (
    resourceGroupName: string,
    devCenterName: string,
    projectPolicyName: string,
    options?: ProjectPoliciesGetOptionalParams,
  ) => Promise<ProjectPolicy>;
}

function _getProjectPolicies(context: DevCenterContext) {
  return {
    listByDevCenter: (
      resourceGroupName: string,
      devCenterName: string,
      options?: ProjectPoliciesListByDevCenterOptionalParams,
    ) => listByDevCenter(context, resourceGroupName, devCenterName, options),
    delete: (
      resourceGroupName: string,
      devCenterName: string,
      projectPolicyName: string,
      options?: ProjectPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, devCenterName, projectPolicyName, options),
    update: (
      resourceGroupName: string,
      devCenterName: string,
      projectPolicyName: string,
      body: ProjectPolicyUpdate,
      options?: ProjectPoliciesUpdateOptionalParams,
    ) => update(context, resourceGroupName, devCenterName, projectPolicyName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      devCenterName: string,
      projectPolicyName: string,
      body: ProjectPolicy,
      options?: ProjectPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, devCenterName, projectPolicyName, body, options),
    get: (
      resourceGroupName: string,
      devCenterName: string,
      projectPolicyName: string,
      options?: ProjectPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, devCenterName, projectPolicyName, options),
  };
}

export function _getProjectPoliciesOperations(
  context: DevCenterContext,
): ProjectPoliciesOperations {
  return {
    ..._getProjectPolicies(context),
  };
}
