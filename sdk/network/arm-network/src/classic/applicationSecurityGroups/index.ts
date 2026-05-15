// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  listAll,
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/applicationSecurityGroups/operations.js";
import {
  ApplicationSecurityGroupsListAllOptionalParams,
  ApplicationSecurityGroupsListOptionalParams,
  ApplicationSecurityGroupsDeleteOptionalParams,
  ApplicationSecurityGroupsUpdateTagsOptionalParams,
  ApplicationSecurityGroupsCreateOrUpdateOptionalParams,
  ApplicationSecurityGroupsGetOptionalParams,
} from "../../api/applicationSecurityGroups/options.js";
import { ApplicationSecurityGroup } from "../../models/common/models.js";
import { TagsObject } from "../../models/microsoft/network/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ApplicationSecurityGroups operations. */
export interface ApplicationSecurityGroupsOperations {
  /** Gets all application security groups in a subscription. */
  listAll: (
    options?: ApplicationSecurityGroupsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationSecurityGroup>;
  /** Gets all the application security groups in a resource group. */
  list: (
    resourceGroupName: string,
    options?: ApplicationSecurityGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<ApplicationSecurityGroup>;
  /** Deletes the specified application security group. */
  delete: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    options?: ApplicationSecurityGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    options?: ApplicationSecurityGroupsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    options?: ApplicationSecurityGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an application security group's tags. */
  updateTags: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    parameters: TagsObject,
    options?: ApplicationSecurityGroupsUpdateTagsOptionalParams,
  ) => Promise<ApplicationSecurityGroup>;
  /** Creates or updates an application security group. */
  createOrUpdate: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    parameters: ApplicationSecurityGroup,
    options?: ApplicationSecurityGroupsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ApplicationSecurityGroup>, ApplicationSecurityGroup>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    parameters: ApplicationSecurityGroup,
    options?: ApplicationSecurityGroupsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ApplicationSecurityGroup>, ApplicationSecurityGroup>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    parameters: ApplicationSecurityGroup,
    options?: ApplicationSecurityGroupsCreateOrUpdateOptionalParams,
  ) => Promise<ApplicationSecurityGroup>;
  /** Gets information about the specified application security group. */
  get: (
    resourceGroupName: string,
    applicationSecurityGroupName: string,
    options?: ApplicationSecurityGroupsGetOptionalParams,
  ) => Promise<ApplicationSecurityGroup>;
}

function _getApplicationSecurityGroups(context: NetworkManagementContext) {
  return {
    listAll: (options?: ApplicationSecurityGroupsListAllOptionalParams) =>
      listAll(context, options),
    list: (resourceGroupName: string, options?: ApplicationSecurityGroupsListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      options?: ApplicationSecurityGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, applicationSecurityGroupName, options),
    beginDelete: async (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      options?: ApplicationSecurityGroupsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, applicationSecurityGroupName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      options?: ApplicationSecurityGroupsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, applicationSecurityGroupName, options);
    },
    updateTags: (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      parameters: TagsObject,
      options?: ApplicationSecurityGroupsUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, applicationSecurityGroupName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      parameters: ApplicationSecurityGroup,
      options?: ApplicationSecurityGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, applicationSecurityGroupName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      parameters: ApplicationSecurityGroup,
      options?: ApplicationSecurityGroupsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        applicationSecurityGroupName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      parameters: ApplicationSecurityGroup,
      options?: ApplicationSecurityGroupsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        applicationSecurityGroupName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      applicationSecurityGroupName: string,
      options?: ApplicationSecurityGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, applicationSecurityGroupName, options),
  };
}

export function _getApplicationSecurityGroupsOperations(
  context: NetworkManagementContext,
): ApplicationSecurityGroupsOperations {
  return {
    ..._getApplicationSecurityGroups(context),
  };
}
