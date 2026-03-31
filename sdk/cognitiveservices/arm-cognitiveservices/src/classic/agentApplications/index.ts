// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  disable,
  enable,
  listAgents,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/agentApplications/operations.js";
import type {
  AgentApplicationsDisableOptionalParams,
  AgentApplicationsEnableOptionalParams,
  AgentApplicationsListAgentsOptionalParams,
  AgentApplicationsListOptionalParams,
  AgentApplicationsDeleteOptionalParams,
  AgentApplicationsCreateOrUpdateOptionalParams,
  AgentApplicationsGetOptionalParams,
} from "../../api/agentApplications/options.js";
import type {
  AgentApplication,
  AgentReferenceResourceArmPaginatedResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AgentApplications operations. */
export interface AgentApplicationsOperations {
  /** Disables an Agent Application. */
  disable: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    name: string,
    options?: AgentApplicationsDisableOptionalParams,
  ) => Promise<void>;
  /** Enables an Agent Application. */
  enable: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    name: string,
    options?: AgentApplicationsEnableOptionalParams,
  ) => Promise<void>;
  /** Lists agents for an Agent Application. */
  listAgents: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    name: string,
    options?: AgentApplicationsListAgentsOptionalParams,
  ) => Promise<AgentReferenceResourceArmPaginatedResult>;
  /** Lists Agent Applications in the project. */
  list: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    options?: AgentApplicationsListOptionalParams,
  ) => PagedAsyncIterableIterator<AgentApplication>;
  /** Delete Agent Application. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    name: string,
    options?: AgentApplicationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    name: string,
    options?: AgentApplicationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    name: string,
    options?: AgentApplicationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an Agent Application (asynchronous). */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    name: string,
    body: AgentApplication,
    options?: AgentApplicationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AgentApplication>, AgentApplication>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    name: string,
    body: AgentApplication,
    options?: AgentApplicationsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AgentApplication>, AgentApplication>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    name: string,
    body: AgentApplication,
    options?: AgentApplicationsCreateOrUpdateOptionalParams,
  ) => Promise<AgentApplication>;
  /** Gets an Agent Application by name. */
  get: (
    resourceGroupName: string,
    accountName: string,
    projectName: string,
    name: string,
    options?: AgentApplicationsGetOptionalParams,
  ) => Promise<AgentApplication>;
}

function _getAgentApplications(context: CognitiveServicesManagementContext) {
  return {
    disable: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      name: string,
      options?: AgentApplicationsDisableOptionalParams,
    ) => disable(context, resourceGroupName, accountName, projectName, name, options),
    enable: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      name: string,
      options?: AgentApplicationsEnableOptionalParams,
    ) => enable(context, resourceGroupName, accountName, projectName, name, options),
    listAgents: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      name: string,
      options?: AgentApplicationsListAgentsOptionalParams,
    ) => listAgents(context, resourceGroupName, accountName, projectName, name, options),
    list: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      options?: AgentApplicationsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, projectName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      name: string,
      options?: AgentApplicationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, projectName, name, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      name: string,
      options?: AgentApplicationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, projectName, name, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      name: string,
      options?: AgentApplicationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, projectName, name, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      name: string,
      body: AgentApplication,
      options?: AgentApplicationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, projectName, name, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      name: string,
      body: AgentApplication,
      options?: AgentApplicationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        name,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      name: string,
      body: AgentApplication,
      options?: AgentApplicationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        projectName,
        name,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      projectName: string,
      name: string,
      options?: AgentApplicationsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, projectName, name, options),
  };
}

export function _getAgentApplicationsOperations(
  context: CognitiveServicesManagementContext,
): AgentApplicationsOperations {
  return {
    ..._getAgentApplications(context),
  };
}
