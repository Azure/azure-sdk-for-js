// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMapsManagementContext } from "../../api/azureMapsManagementContext.js";
import {
  listByAccount,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/creators/operations.js";
import type {
  CreatorsListByAccountOptionalParams,
  CreatorsDeleteOptionalParams,
  CreatorsUpdateOptionalParams,
  CreatorsCreateOrUpdateOptionalParams,
  CreatorsGetOptionalParams,
} from "../../api/creators/options.js";
import type { Creator, CreatorUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Creators operations. */
export interface CreatorsOperations {
  /** Get all Creator instances for an Azure Maps Account */
  listByAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: CreatorsListByAccountOptionalParams,
  ) => PagedAsyncIterableIterator<Creator>;
  /** Delete a Maps Creator resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    creatorName: string,
    options?: CreatorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the Maps Creator resource. Only a subset of the parameters may be updated after creation, such as Tags. */
  update: (
    resourceGroupName: string,
    accountName: string,
    creatorName: string,
    creatorUpdateParameters: CreatorUpdateParameters,
    options?: CreatorsUpdateOptionalParams,
  ) => Promise<Creator>;
  /** Create or update a Maps Creator resource. Creator resource will manage Azure resources required to populate a custom set of mapping data. It requires an account to exist before it can be created. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    creatorName: string,
    creatorResource: Creator,
    options?: CreatorsCreateOrUpdateOptionalParams,
  ) => Promise<Creator>;
  /** Get a Maps Creator resource. */
  get: (
    resourceGroupName: string,
    accountName: string,
    creatorName: string,
    options?: CreatorsGetOptionalParams,
  ) => Promise<Creator>;
}

function _getCreators(context: AzureMapsManagementContext) {
  return {
    listByAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: CreatorsListByAccountOptionalParams,
    ) => listByAccount(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      creatorName: string,
      options?: CreatorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, creatorName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      creatorName: string,
      creatorUpdateParameters: CreatorUpdateParameters,
      options?: CreatorsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        accountName,
        creatorName,
        creatorUpdateParameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      creatorName: string,
      creatorResource: Creator,
      options?: CreatorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        creatorName,
        creatorResource,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      creatorName: string,
      options?: CreatorsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, creatorName, options),
  };
}

export function _getCreatorsOperations(context: AzureMapsManagementContext): CreatorsOperations {
  return {
    ..._getCreators(context),
  };
}
