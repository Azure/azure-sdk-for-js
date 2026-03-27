// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  batchDelete,
  batchAdd,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/raiBlocklistItems/operations.js";
import type {
  RaiBlocklistItemsBatchDeleteOptionalParams,
  RaiBlocklistItemsBatchAddOptionalParams,
  RaiBlocklistItemsListOptionalParams,
  RaiBlocklistItemsDeleteOptionalParams,
  RaiBlocklistItemsCreateOrUpdateOptionalParams,
  RaiBlocklistItemsGetOptionalParams,
} from "../../api/raiBlocklistItems/options.js";
import type {
  RaiBlocklistItem,
  RaiBlocklistItemBulkRequest,
  RaiBlocklist,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RaiBlocklistItems operations. */
export interface RaiBlocklistItemsOperations {
  /** Batch operation to delete blocklist items. */
  batchDelete: (
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    raiBlocklistItemsNames: string[],
    options?: RaiBlocklistItemsBatchDeleteOptionalParams,
  ) => Promise<void>;
  /** Batch operation to add blocklist items. */
  batchAdd: (
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    raiBlocklistItems: RaiBlocklistItemBulkRequest[],
    options?: RaiBlocklistItemsBatchAddOptionalParams,
  ) => Promise<RaiBlocklist>;
  /** Gets the blocklist items associated with the custom blocklist. */
  list: (
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    options?: RaiBlocklistItemsListOptionalParams,
  ) => PagedAsyncIterableIterator<RaiBlocklistItem>;
  /** Deletes the specified blocklist Item associated with the custom blocklist. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    raiBlocklistItemName: string,
    options?: RaiBlocklistItemsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the state of specified blocklist item associated with the Azure OpenAI account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    raiBlocklistItemName: string,
    raiBlocklistItem: RaiBlocklistItem,
    options?: RaiBlocklistItemsCreateOrUpdateOptionalParams,
  ) => Promise<RaiBlocklistItem>;
  /** Gets the specified custom blocklist Item associated with the custom blocklist. */
  get: (
    resourceGroupName: string,
    accountName: string,
    raiBlocklistName: string,
    raiBlocklistItemName: string,
    options?: RaiBlocklistItemsGetOptionalParams,
  ) => Promise<RaiBlocklistItem>;
}

function _getRaiBlocklistItems(context: CognitiveServicesManagementContext) {
  return {
    batchDelete: (
      resourceGroupName: string,
      accountName: string,
      raiBlocklistName: string,
      raiBlocklistItemsNames: string[],
      options?: RaiBlocklistItemsBatchDeleteOptionalParams,
    ) =>
      batchDelete(
        context,
        resourceGroupName,
        accountName,
        raiBlocklistName,
        raiBlocklistItemsNames,
        options,
      ),
    batchAdd: (
      resourceGroupName: string,
      accountName: string,
      raiBlocklistName: string,
      raiBlocklistItems: RaiBlocklistItemBulkRequest[],
      options?: RaiBlocklistItemsBatchAddOptionalParams,
    ) =>
      batchAdd(
        context,
        resourceGroupName,
        accountName,
        raiBlocklistName,
        raiBlocklistItems,
        options,
      ),
    list: (
      resourceGroupName: string,
      accountName: string,
      raiBlocklistName: string,
      options?: RaiBlocklistItemsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, raiBlocklistName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      raiBlocklistName: string,
      raiBlocklistItemName: string,
      options?: RaiBlocklistItemsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        accountName,
        raiBlocklistName,
        raiBlocklistItemName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      raiBlocklistName: string,
      raiBlocklistItemName: string,
      raiBlocklistItem: RaiBlocklistItem,
      options?: RaiBlocklistItemsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        raiBlocklistName,
        raiBlocklistItemName,
        raiBlocklistItem,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      raiBlocklistName: string,
      raiBlocklistItemName: string,
      options?: RaiBlocklistItemsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, accountName, raiBlocklistName, raiBlocklistItemName, options),
  };
}

export function _getRaiBlocklistItemsOperations(
  context: CognitiveServicesManagementContext,
): RaiBlocklistItemsOperations {
  return {
    ..._getRaiBlocklistItems(context),
  };
}
