// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext } from "../../api/oracleDatabaseManagementContext.js";
import {
  addAzureSubscriptions,
  listActivationLinks,
  listSaasSubscriptionDetails,
  listCloudAccountDetails,
  $delete,
  update,
  get,
  createOrUpdate,
  listBySubscription,
} from "../../api/oracleSubscriptions/operations.js";
import type {
  OracleSubscriptionsAddAzureSubscriptionsOptionalParams,
  OracleSubscriptionsListActivationLinksOptionalParams,
  OracleSubscriptionsListSaasSubscriptionDetailsOptionalParams,
  OracleSubscriptionsListCloudAccountDetailsOptionalParams,
  OracleSubscriptionsDeleteOptionalParams,
  OracleSubscriptionsUpdateOptionalParams,
  OracleSubscriptionsGetOptionalParams,
  OracleSubscriptionsCreateOrUpdateOptionalParams,
  OracleSubscriptionsListBySubscriptionOptionalParams,
} from "../../api/oracleSubscriptions/options.js";
import type {
  OracleSubscription,
  OracleSubscriptionUpdate,
  CloudAccountDetails,
  SaasSubscriptionDetails,
  ActivationLinks,
  AzureSubscriptions,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OracleSubscriptions operations. */
export interface OracleSubscriptionsOperations {
  /** Add Azure Subscriptions */
  addAzureSubscriptions: (
    body: AzureSubscriptions,
    options?: OracleSubscriptionsAddAzureSubscriptionsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Activation Links */
  listActivationLinks: (
    options?: OracleSubscriptionsListActivationLinksOptionalParams,
  ) => PollerLike<OperationState<ActivationLinks>, ActivationLinks>;
  /** List Saas Subscription Details */
  listSaasSubscriptionDetails: (
    options?: OracleSubscriptionsListSaasSubscriptionDetailsOptionalParams,
  ) => PollerLike<OperationState<SaasSubscriptionDetails>, SaasSubscriptionDetails>;
  /** List Cloud Account Details */
  listCloudAccountDetails: (
    options?: OracleSubscriptionsListCloudAccountDetailsOptionalParams,
  ) => PollerLike<OperationState<CloudAccountDetails>, CloudAccountDetails>;
  /** Delete a OracleSubscription */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    options?: OracleSubscriptionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a OracleSubscription */
  update: (
    properties: OracleSubscriptionUpdate,
    options?: OracleSubscriptionsUpdateOptionalParams,
  ) => PollerLike<OperationState<OracleSubscription>, OracleSubscription>;
  /** Get a OracleSubscription */
  get: (options?: OracleSubscriptionsGetOptionalParams) => Promise<OracleSubscription>;
  /** Create a OracleSubscription */
  createOrUpdate: (
    resource: OracleSubscription,
    options?: OracleSubscriptionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OracleSubscription>, OracleSubscription>;
  /** List OracleSubscription resources by subscription ID */
  listBySubscription: (
    options?: OracleSubscriptionsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<OracleSubscription>;
}

function _getOracleSubscriptions(context: OracleDatabaseManagementContext) {
  return {
    addAzureSubscriptions: (
      body: AzureSubscriptions,
      options?: OracleSubscriptionsAddAzureSubscriptionsOptionalParams,
    ) => addAzureSubscriptions(context, body, options),
    listActivationLinks: (options?: OracleSubscriptionsListActivationLinksOptionalParams) =>
      listActivationLinks(context, options),
    listSaasSubscriptionDetails: (
      options?: OracleSubscriptionsListSaasSubscriptionDetailsOptionalParams,
    ) => listSaasSubscriptionDetails(context, options),
    listCloudAccountDetails: (options?: OracleSubscriptionsListCloudAccountDetailsOptionalParams) =>
      listCloudAccountDetails(context, options),
    delete: (options?: OracleSubscriptionsDeleteOptionalParams) => $delete(context, options),
    update: (
      properties: OracleSubscriptionUpdate,
      options?: OracleSubscriptionsUpdateOptionalParams,
    ) => update(context, properties, options),
    get: (options?: OracleSubscriptionsGetOptionalParams) => get(context, options),
    createOrUpdate: (
      resource: OracleSubscription,
      options?: OracleSubscriptionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resource, options),
    listBySubscription: (options?: OracleSubscriptionsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}

export function _getOracleSubscriptionsOperations(
  context: OracleDatabaseManagementContext,
): OracleSubscriptionsOperations {
  return {
    ..._getOracleSubscriptions(context),
  };
}
