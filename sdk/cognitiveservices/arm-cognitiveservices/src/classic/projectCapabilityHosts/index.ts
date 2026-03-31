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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    options?: ProjectCapabilityHostsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    options?: ProjectCapabilityHostsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update project capabilityHost. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    capabilityHost: ProjectCapabilityHost,
    options?: ProjectCapabilityHostsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ProjectCapabilityHost>, ProjectCapabilityHost>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    capabilityHost: ProjectCapabilityHost,
    options?: ProjectCapabilityHostsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ProjectCapabilityHost>, ProjectCapabilityHost>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    capabilityHostName: string,
    capabilityHost: ProjectCapabilityHost,
    options?: ProjectCapabilityHostsCreateOrUpdateOptionalParams,
  ) => Promise<ProjectCapabilityHost>;
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
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      capabilityHostName: string,
      options?: ProjectCapabilityHostsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        accountName,
        projectName,
        capabilityHostName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      capabilityHostName: string,
      options?: ProjectCapabilityHostsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        accountName,
        projectName,
        capabilityHostName,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      capabilityHostName: string,
      capabilityHost: ProjectCapabilityHost,
      options?: ProjectCapabilityHostsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        capabilityHostName,
        capabilityHost,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      capabilityHostName: string,
      capabilityHost: ProjectCapabilityHost,
      options?: ProjectCapabilityHostsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        capabilityHostName,
        capabilityHost,
        options,
      );
    },
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
