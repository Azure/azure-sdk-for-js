// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  membersList,
  membersGet,
  linksList,
  linksGet,
  generateLoa,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/expressRouteLags/operations.js";
import type {
  ExpressRouteLagsMembersListOptionalParams,
  ExpressRouteLagsMembersGetOptionalParams,
  ExpressRouteLagsLinksListOptionalParams,
  ExpressRouteLagsLinksGetOptionalParams,
  ExpressRouteLagsGenerateLoaOptionalParams,
  ExpressRouteLagsListOptionalParams,
  ExpressRouteLagsListByResourceGroupOptionalParams,
  ExpressRouteLagsDeleteOptionalParams,
  ExpressRouteLagsUpdateOptionalParams,
  ExpressRouteLagsCreateOrUpdateOptionalParams,
  ExpressRouteLagsGetOptionalParams,
} from "../../api/expressRouteLags/options.js";
import type {
  ExpressRouteLag,
  ExpressRouteLagLink,
  ExpressRouteLagMember,
  ExpressRouteLagUpdateTagsOrIdentityRequest,
  GenerateExpressRouteLagsLOARequest,
  GenerateExpressRouteLagsLOAResult,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExpressRouteLags operations. */
export interface ExpressRouteLagsOperations {
  /** Retrieve the ExpressRouteLagMember sub-resources of the specified ExpressRouteLagLink resource. */
  membersList: (
    resourceGroupName: string,
    expressRouteLagName: string,
    linkName: string,
    options?: ExpressRouteLagsMembersListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteLagMember>;
  /** Retrieves the specified ExpressRouteLagMember resource. */
  membersGet: (
    resourceGroupName: string,
    expressRouteLagName: string,
    linkName: string,
    memberName: string,
    options?: ExpressRouteLagsMembersGetOptionalParams,
  ) => Promise<ExpressRouteLagMember>;
  /** Retrieve the ExpressRouteLagLink sub-resources of the specified ExpressRouteLag resource. */
  linksList: (
    resourceGroupName: string,
    expressRouteLagName: string,
    options?: ExpressRouteLagsLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteLagLink>;
  /** Retrieves the specified ExpressRouteLagLink resource. */
  linksGet: (
    resourceGroupName: string,
    expressRouteLagName: string,
    linkName: string,
    options?: ExpressRouteLagsLinksGetOptionalParams,
  ) => Promise<ExpressRouteLagLink>;
  /** Generate a letter of authorization for the requested ExpressRouteLag resource. */
  generateLoa: (
    resourceGroupName: string,
    expressRouteLagName: string,
    body: GenerateExpressRouteLagsLOARequest,
    options?: ExpressRouteLagsGenerateLoaOptionalParams,
  ) => Promise<GenerateExpressRouteLagsLOAResult>;
  /** List all the ExpressRouteLag resources in the specified subscription. */
  list: (
    options?: ExpressRouteLagsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteLag>;
  /** List all the ExpressRouteLag resources in the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ExpressRouteLagsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteLag>;
  /** Deletes the specified ExpressRouteLag resource. */
  delete: (
    resourceGroupName: string,
    expressRouteLagName: string,
    options?: ExpressRouteLagsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    expressRouteLagName: string,
    options?: ExpressRouteLagsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    expressRouteLagName: string,
    options?: ExpressRouteLagsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update ExpressRouteLag tags or identity. */
  update: (
    resourceGroupName: string,
    expressRouteLagName: string,
    properties: ExpressRouteLagUpdateTagsOrIdentityRequest,
    options?: ExpressRouteLagsUpdateOptionalParams,
  ) => Promise<ExpressRouteLag>;
  /** Creates or updates the specified ExpressRouteLag resource. */
  createOrUpdate: (
    resourceGroupName: string,
    expressRouteLagName: string,
    resource: ExpressRouteLag,
    options?: ExpressRouteLagsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteLag>, ExpressRouteLag>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    expressRouteLagName: string,
    resource: ExpressRouteLag,
    options?: ExpressRouteLagsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ExpressRouteLag>, ExpressRouteLag>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    expressRouteLagName: string,
    resource: ExpressRouteLag,
    options?: ExpressRouteLagsCreateOrUpdateOptionalParams,
  ) => Promise<ExpressRouteLag>;
  /** Retrieves the requested ExpressRouteLag resource. */
  get: (
    resourceGroupName: string,
    expressRouteLagName: string,
    options?: ExpressRouteLagsGetOptionalParams,
  ) => Promise<ExpressRouteLag>;
}

function _getExpressRouteLags(context: NetworkManagementContext) {
  return {
    membersList: (
      resourceGroupName: string,
      expressRouteLagName: string,
      linkName: string,
      options?: ExpressRouteLagsMembersListOptionalParams,
    ) => membersList(context, resourceGroupName, expressRouteLagName, linkName, options),
    membersGet: (
      resourceGroupName: string,
      expressRouteLagName: string,
      linkName: string,
      memberName: string,
      options?: ExpressRouteLagsMembersGetOptionalParams,
    ) => membersGet(context, resourceGroupName, expressRouteLagName, linkName, memberName, options),
    linksList: (
      resourceGroupName: string,
      expressRouteLagName: string,
      options?: ExpressRouteLagsLinksListOptionalParams,
    ) => linksList(context, resourceGroupName, expressRouteLagName, options),
    linksGet: (
      resourceGroupName: string,
      expressRouteLagName: string,
      linkName: string,
      options?: ExpressRouteLagsLinksGetOptionalParams,
    ) => linksGet(context, resourceGroupName, expressRouteLagName, linkName, options),
    generateLoa: (
      resourceGroupName: string,
      expressRouteLagName: string,
      body: GenerateExpressRouteLagsLOARequest,
      options?: ExpressRouteLagsGenerateLoaOptionalParams,
    ) => generateLoa(context, resourceGroupName, expressRouteLagName, body, options),
    list: (options?: ExpressRouteLagsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ExpressRouteLagsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      expressRouteLagName: string,
      options?: ExpressRouteLagsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, expressRouteLagName, options),
    beginDelete: async (
      resourceGroupName: string,
      expressRouteLagName: string,
      options?: ExpressRouteLagsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, expressRouteLagName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      expressRouteLagName: string,
      options?: ExpressRouteLagsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, expressRouteLagName, options);
    },
    update: (
      resourceGroupName: string,
      expressRouteLagName: string,
      properties: ExpressRouteLagUpdateTagsOrIdentityRequest,
      options?: ExpressRouteLagsUpdateOptionalParams,
    ) => update(context, resourceGroupName, expressRouteLagName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      expressRouteLagName: string,
      resource: ExpressRouteLag,
      options?: ExpressRouteLagsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, expressRouteLagName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      expressRouteLagName: string,
      resource: ExpressRouteLag,
      options?: ExpressRouteLagsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        expressRouteLagName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      expressRouteLagName: string,
      resource: ExpressRouteLag,
      options?: ExpressRouteLagsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        expressRouteLagName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      expressRouteLagName: string,
      options?: ExpressRouteLagsGetOptionalParams,
    ) => get(context, resourceGroupName, expressRouteLagName, options),
  };
}

export function _getExpressRouteLagsOperations(
  context: NetworkManagementContext,
): ExpressRouteLagsOperations {
  return {
    ..._getExpressRouteLags(context),
  };
}
