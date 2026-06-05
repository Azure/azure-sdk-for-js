// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PrivateStore,
  QueryUserOffersProperties,
  CollectionsToSubscriptionsMappingPayload,
  QueryApprovedPlansPayload,
  BulkCollectionsPayload,
  AcknowledgeOfferNotificationProperties,
  StopSellSubscriptions,
  QueryRequestApprovalProperties,
  WithdrawProperties,
  AdminRequestApprovalsResource,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateStoreAdminRequestApprovalsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreUpdateAdminRequestApprovalOptionalParams extends OperationOptions {
  payload?: AdminRequestApprovalsResource;
}

/** Optional parameters. */
export interface PrivateStoreGetAdminRequestApprovalOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreWithdrawPlanOptionalParams extends OperationOptions {
  payload?: WithdrawProperties;
}

/** Optional parameters. */
export interface PrivateStoreQueryRequestApprovalOptionalParams extends OperationOptions {
  payload?: QueryRequestApprovalProperties;
}

/** Optional parameters. */
export interface PrivateStoreGetApprovalRequestsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreCreateApprovalRequestOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreGetRequestApprovalOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreListSubscriptionsContextOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreListStopSellOffersPlansNotificationsOptionalParams extends OperationOptions {
  stopSellSubscriptions?: StopSellSubscriptions;
}

/** Optional parameters. */
export interface PrivateStoreListNewPlansNotificationsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreFetchAllSubscriptionsInTenantOptionalParams extends OperationOptions {
  /** The skip token to get the next page. */
  nextPageToken?: string;
}

/** Optional parameters. */
export interface PrivateStoreAcknowledgeOfferNotificationOptionalParams extends OperationOptions {
  payload?: AcknowledgeOfferNotificationProperties;
}

/** Optional parameters. */
export interface PrivateStoreQueryNotificationsStateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreBulkCollectionsActionOptionalParams extends OperationOptions {
  payload?: BulkCollectionsPayload;
}

/** Optional parameters. */
export interface PrivateStoreQueryApprovedPlansOptionalParams extends OperationOptions {
  payload?: QueryApprovedPlansPayload;
}

/** Optional parameters. */
export interface PrivateStoreCollectionsToSubscriptionsMappingOptionalParams extends OperationOptions {
  payload?: CollectionsToSubscriptionsMappingPayload;
}

/** Optional parameters. */
export interface PrivateStoreBillingAccountsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreQueryUserOffersOptionalParams extends OperationOptions {
  payload?: QueryUserOffersProperties;
}

/** Optional parameters. */
export interface PrivateStoreQueryOffersOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreAnyExistingOffersInTheCollectionsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreListOptionalParams extends OperationOptions {
  /** Determines if to use cache or DB for serving this request */
  useCache?: string;
}

/** Optional parameters. */
export interface PrivateStoreDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateStoreCreateOrUpdateOptionalParams extends OperationOptions {
  payload?: PrivateStore;
}

/** Optional parameters. */
export interface PrivateStoreGetOptionalParams extends OperationOptions {}
