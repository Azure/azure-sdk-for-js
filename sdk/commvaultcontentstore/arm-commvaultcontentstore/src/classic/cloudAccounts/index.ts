// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext } from "../../api/contentStoreContext.js";
import {
  latestLinkedSaaS,
  linkSaaS,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/cloudAccounts/operations.js";
import type {
  CloudAccountsLatestLinkedSaaSOptionalParams,
  CloudAccountsLinkSaaSOptionalParams,
  CloudAccountsListBySubscriptionOptionalParams,
  CloudAccountsListByResourceGroupOptionalParams,
  CloudAccountsDeleteOptionalParams,
  CloudAccountsUpdateOptionalParams,
  CloudAccountsCreateOrUpdateOptionalParams,
  CloudAccountsGetOptionalParams,
} from "../../api/cloudAccounts/options.js";
import type {
  CloudAccount,
  CloudAccountUpdate,
  SaaSData,
  LatestLinkedSaaSResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudAccounts operations. */
export interface CloudAccountsOperations {
  /** Returns the latest SaaS linked to the cloud account. */
  latestLinkedSaaS: (
    resourceGroupName: string,
    cloudAccountName: string,
    options?: CloudAccountsLatestLinkedSaaSOptionalParams,
  ) => Promise<LatestLinkedSaaSResponse>;
  /** Links a new SaaS to the cloud account. */
  linkSaaS: (
    resourceGroupName: string,
    cloudAccountName: string,
    body: SaaSData,
    options?: CloudAccountsLinkSaaSOptionalParams,
  ) => PollerLike<OperationState<CloudAccount>, CloudAccount>;
  /** List CloudAccount resources by subscription ID */
  listBySubscription: (
    options?: CloudAccountsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CloudAccount>;
  /** List CloudAccount resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CloudAccountsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CloudAccount>;
  /** Delete a CloudAccount */
  delete: (
    resourceGroupName: string,
    cloudAccountName: string,
    options?: CloudAccountsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a CloudAccount */
  update: (
    resourceGroupName: string,
    cloudAccountName: string,
    properties: CloudAccountUpdate,
    options?: CloudAccountsUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudAccount>, CloudAccount>;
  /** Create a CloudAccount */
  createOrUpdate: (
    resourceGroupName: string,
    cloudAccountName: string,
    resource: CloudAccount,
    options?: CloudAccountsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudAccount>, CloudAccount>;
  /** Get a CloudAccount */
  get: (
    resourceGroupName: string,
    cloudAccountName: string,
    options?: CloudAccountsGetOptionalParams,
  ) => Promise<CloudAccount>;
}

function _getCloudAccounts(context: ContentStoreContext) {
  return {
    latestLinkedSaaS: (
      resourceGroupName: string,
      cloudAccountName: string,
      options?: CloudAccountsLatestLinkedSaaSOptionalParams,
    ) => latestLinkedSaaS(context, resourceGroupName, cloudAccountName, options),
    linkSaaS: (
      resourceGroupName: string,
      cloudAccountName: string,
      body: SaaSData,
      options?: CloudAccountsLinkSaaSOptionalParams,
    ) => linkSaaS(context, resourceGroupName, cloudAccountName, body, options),
    listBySubscription: (options?: CloudAccountsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CloudAccountsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      cloudAccountName: string,
      options?: CloudAccountsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudAccountName, options),
    update: (
      resourceGroupName: string,
      cloudAccountName: string,
      properties: CloudAccountUpdate,
      options?: CloudAccountsUpdateOptionalParams,
    ) => update(context, resourceGroupName, cloudAccountName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudAccountName: string,
      resource: CloudAccount,
      options?: CloudAccountsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, cloudAccountName, resource, options),
    get: (
      resourceGroupName: string,
      cloudAccountName: string,
      options?: CloudAccountsGetOptionalParams,
    ) => get(context, resourceGroupName, cloudAccountName, options),
  };
}

export function _getCloudAccountsOperations(context: ContentStoreContext): CloudAccountsOperations {
  return {
    ..._getCloudAccounts(context),
  };
}
