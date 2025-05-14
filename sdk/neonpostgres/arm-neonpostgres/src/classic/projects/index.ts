// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresContext } from "../../api/postgresContext.js";
import { Project, ConnectionUriProperties } from "../../models/models.js";
import {
  ProjectsGetConnectionUriOptionalParams,
  ProjectsListOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "../../api/projects/options.js";
import {
  getConnectionUri,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/projects/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Projects operations. */
export interface ProjectsOperations {
  /** Action to retrieve the connection URI for the Neon Database. */
  getConnectionUri: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    connectionUriParameters: ConnectionUriProperties,
    options?: ProjectsGetConnectionUriOptionalParams,
  ) => Promise<ConnectionUriProperties>;
  /** List Project resources by OrganizationResource */
  list: (
    resourceGroupName: string,
    organizationName: string,
    options?: ProjectsListOptionalParams,
  ) => PagedAsyncIterableIterator<Project>;
  /** Delete a Project */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    organizationName: string,
    projectName: string,
    options?: ProjectsDeleteOptionalParams,
  ) => Promise<void>;
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

function _getProjects(context: PostgresContext) {
  return {
    getConnectionUri: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      connectionUriParameters: ConnectionUriProperties,
      options?: ProjectsGetConnectionUriOptionalParams,
    ) =>
      getConnectionUri(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        connectionUriParameters,
        options,
      ),
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
    ) =>
      $delete(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      resource: Project,
      options?: ProjectsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        organizationName,
        projectName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      organizationName: string,
      projectName: string,
      options?: ProjectsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, organizationName, projectName, options),
  };
}

export function _getProjectsOperations(
  context: PostgresContext,
): ProjectsOperations {
  return {
    ..._getProjects(context),
  };
}
