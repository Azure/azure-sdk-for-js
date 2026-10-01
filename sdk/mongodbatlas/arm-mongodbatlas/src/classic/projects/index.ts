// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AtlasContext } from "../../api/atlasContext.js";
import {
  listClusterTierRegions,
  tierLimitReached,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/projects/operations.js";
import type {
  ProjectsListClusterTierRegionsOptionalParams,
  ProjectsTierLimitReachedOptionalParams,
  ProjectsListOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "../../api/projects/options.js";
import type {
  Project,
  TierLimitReachedResponse,
  RegionsByTierResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Projects operations. */
export interface ProjectsOperations {
  /** List available regions by cluster tier for the project. */
  listClusterTierRegions: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    options?: ProjectsListClusterTierRegionsOptionalParams,
  ) => Promise<RegionsByTierResponse>;
  /** Check if tier limit is reached for the project. */
  tierLimitReached: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    options?: ProjectsTierLimitReachedOptionalParams,
  ) => Promise<TierLimitReachedResponse>;
  /** List Project resources by OrganizationResource */
  list: (
    resourceGroupName: string,
    organizationName: string,
    options?: ProjectsListOptionalParams,
  ) => PagedAsyncIterableIterator<Project>;
  /** Delete a Project */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Project */
  createOrUpdate: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    resource: Project,
    options?: ProjectsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Project>, Project>;
  /** Get a Project */
  get: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    options?: ProjectsGetOptionalParams,
  ) => Promise<Project>;
}

function _getProjects(context: AtlasContext) {
  return {
    listClusterTierRegions: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      options?: ProjectsListClusterTierRegionsOptionalParams,
    ) => listClusterTierRegions(context, resourceGroupName, organizationName, projectName, options),
    tierLimitReached: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      options?: ProjectsTierLimitReachedOptionalParams,
    ) => tierLimitReached(context, resourceGroupName, organizationName, projectName, options),
    list: (
      resourceGroupName: string,
      organizationName: string,
      options?: ProjectsListOptionalParams,
    ) => list(context, resourceGroupName, organizationName, options),
    delete: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      options?: ProjectsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, organizationName, projectName, options),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      resource: Project,
      options?: ProjectsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, organizationName, projectName, resource, options),
    get: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      options?: ProjectsGetOptionalParams,
    ) => get(context, resourceGroupName, organizationName, projectName, options),
  };
}

export function _getProjectsOperations(context: AtlasContext): ProjectsOperations {
  return {
    ..._getProjects(context),
  };
}
