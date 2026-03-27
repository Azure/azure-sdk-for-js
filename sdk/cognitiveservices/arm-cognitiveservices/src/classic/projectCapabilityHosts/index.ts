// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/projectCapabilityHosts/operations.js";
import type {
  ProjectCapabilityHostsListOptionalParams,
  ProjectCapabilityHostsDeleteOptionalParams,
  ProjectCapabilityHostsCreateOrUpdateOptionalParams,
  ProjectCapabilityHostsGetOptionalParams,
} from "../../api/projectCapabilityHosts/options.js";
import type { ProjectCapabilityHost } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ProjectCapabilityHosts operations. */
export interface ProjectCapabilityHostsOperations {
  /** List capabilityHost. */
  list: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    options?: ProjectCapabilityHostsListOptionalParams,
  ) => PagedAsyncIterableIterator<ProjectCapabilityHost>;
  /** Delete project capabilityHost. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    options?: ProjectCapabilityHostsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update project capabilityHost. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    capabilityHost: ProjectCapabilityHost,
    options?: ProjectCapabilityHostsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ProjectCapabilityHost>, ProjectCapabilityHost>;
  /** Get project capabilityHost. */
  get: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    options?: ProjectCapabilityHostsGetOptionalParams,
  ) => Promise<ProjectCapabilityHost>;
}

function _getProjectCapabilityHosts(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      options?: ProjectCapabilityHostsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, projectName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      capabilityHostName: string,
      options?: ProjectCapabilityHostsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, projectName, capabilityHostName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      capabilityHostName: string,
      capabilityHost: ProjectCapabilityHost,
      options?: ProjectCapabilityHostsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        capabilityHostName,
        capabilityHost,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      capabilityHostName: string,
      options?: ProjectCapabilityHostsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, projectName, capabilityHostName, options),
  };
}

export function _getProjectCapabilityHostsOperations(
  context: CognitiveServicesManagementContext,
): ProjectCapabilityHostsOperations {
  return {
    ..._getProjectCapabilityHosts(context),
  };
}
