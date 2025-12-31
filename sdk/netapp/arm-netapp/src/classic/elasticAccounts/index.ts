// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/elasticAccounts/operations.js";
import type {
  ElasticAccountsListBySubscriptionOptionalParams,
  ElasticAccountsListByResourceGroupOptionalParams,
  ElasticAccountsDeleteOptionalParams,
  ElasticAccountsUpdateOptionalParams,
  ElasticAccountsCreateOrUpdateOptionalParams,
  ElasticAccountsGetOptionalParams,
} from "../../api/elasticAccounts/options.js";
import type { ElasticAccount, ElasticAccountUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ElasticAccounts operations. */
export interface ElasticAccountsOperations {
  /** List and describe all NetApp elastic accounts in the subscription. */
  listBySubscription: (
    options?: ElasticAccountsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticAccount>;
  /** List and describe all NetApp elastic accounts in the resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ElasticAccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ElasticAccount>;
  /** Delete the specified NetApp elastic account */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    options?: ElasticAccountsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Patch the specified NetApp Elastic Account */
  update: (
    resourceGroupName: string,
    accountName: string,
    body: ElasticAccountUpdate,
    options?: ElasticAccountsUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticAccount>, ElasticAccount>;
  /** Create or update the specified NetApp Elastic Account within the resource group */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    body: ElasticAccount,
    options?: ElasticAccountsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ElasticAccount>, ElasticAccount>;
  /** Get the NetApp Elastic Account */
  get: (
    resourceGroupName: string,
    accountName: string,
    options?: ElasticAccountsGetOptionalParams,
  ) => Promise<ElasticAccount>;
}

function _getElasticAccounts(context: NetAppManagementContext) {
  return {
    listBySubscription: (options?: ElasticAccountsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ElasticAccountsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      options?: ElasticAccountsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, options),
    update: (
      resourceGroupName: string,
      accountName: string,
      body: ElasticAccountUpdate,
      options?: ElasticAccountsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      body: ElasticAccount,
      options?: ElasticAccountsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, body, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      options?: ElasticAccountsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, options),
  };
}

export function _getElasticAccountsOperations(
  context: NetAppManagementContext,
): ElasticAccountsOperations {
  return {
    ..._getElasticAccounts(context),
  };
}
