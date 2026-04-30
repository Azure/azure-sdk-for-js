// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext } from "../../api/marketplaceContext.js";
import {
  adminRequestApprovalsList,
  updateAdminRequestApproval,
  getAdminRequestApproval,
  withdrawPlan,
  queryRequestApproval,
  getApprovalRequestsList,
  createApprovalRequest,
  getRequestApproval,
  listSubscriptionsContext,
  listStopSellOffersPlansNotifications,
  listNewPlansNotifications,
  fetchAllSubscriptionsInTenant,
  acknowledgeOfferNotification,
  queryNotificationsState,
  bulkCollectionsAction,
  queryApprovedPlans,
  collectionsToSubscriptionsMapping,
  billingAccounts,
  queryUserOffers,
  queryOffers,
  anyExistingOffersInTheCollections,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/privateStore/operations.js";
import type {
  PrivateStoreAdminRequestApprovalsListOptionalParams,
  PrivateStoreUpdateAdminRequestApprovalOptionalParams,
  PrivateStoreGetAdminRequestApprovalOptionalParams,
  PrivateStoreWithdrawPlanOptionalParams,
  PrivateStoreQueryRequestApprovalOptionalParams,
  PrivateStoreGetApprovalRequestsListOptionalParams,
  PrivateStoreCreateApprovalRequestOptionalParams,
  PrivateStoreGetRequestApprovalOptionalParams,
  PrivateStoreListSubscriptionsContextOptionalParams,
  PrivateStoreListStopSellOffersPlansNotificationsOptionalParams,
  PrivateStoreListNewPlansNotificationsOptionalParams,
  PrivateStoreFetchAllSubscriptionsInTenantOptionalParams,
  PrivateStoreAcknowledgeOfferNotificationOptionalParams,
  PrivateStoreQueryNotificationsStateOptionalParams,
  PrivateStoreBulkCollectionsActionOptionalParams,
  PrivateStoreQueryApprovedPlansOptionalParams,
  PrivateStoreCollectionsToSubscriptionsMappingOptionalParams,
  PrivateStoreBillingAccountsOptionalParams,
  PrivateStoreQueryUserOffersOptionalParams,
  PrivateStoreQueryOffersOptionalParams,
  PrivateStoreAnyExistingOffersInTheCollectionsOptionalParams,
  PrivateStoreListOptionalParams,
  PrivateStoreDeleteOptionalParams,
  PrivateStoreCreateOrUpdateOptionalParams,
  PrivateStoreGetOptionalParams,
} from "../../api/privateStore/options.js";
import type {
  PrivateStore,
  AnyExistingOffersInTheCollectionsResponse,
  QueryOffers,
  BillingAccountsResponse,
  CollectionsToSubscriptionsMappingResponse,
  QueryApprovedPlansResponse,
  BulkCollectionsResponse,
  PrivateStoreNotificationsState,
  SubscriptionsResponse,
  NewPlansNotificationsList,
  StopSellOffersPlansNotificationsList,
  SubscriptionsContextList,
  RequestApprovalResource,
  RequestApprovalsList,
  QueryRequestApproval,
  AdminRequestApprovalsResource,
  AdminRequestApprovalsList,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateStore operations. */
export interface PrivateStoreOperations {
  /** Get list of admin request approvals */
  adminRequestApprovalsList: (
    privateStoreId: string,
    options?: PrivateStoreAdminRequestApprovalsListOptionalParams,
  ) => Promise<AdminRequestApprovalsList>;
  /** Update the admin action, weather the request is approved or rejected and the approved plans */
  updateAdminRequestApproval: (
    privateStoreId: string,
    adminRequestApprovalId: string,
    options?: PrivateStoreUpdateAdminRequestApprovalOptionalParams,
  ) => Promise<AdminRequestApprovalsResource>;
  /** Get open approval requests */
  getAdminRequestApproval: (
    privateStoreId: string,
    adminRequestApprovalId: string,
    publisherId: string,
    options?: PrivateStoreGetAdminRequestApprovalOptionalParams,
  ) => Promise<AdminRequestApprovalsResource>;
  /** Withdraw a user request approval on specific plan */
  withdrawPlan: (
    privateStoreId: string,
    requestApprovalId: string,
    options?: PrivateStoreWithdrawPlanOptionalParams,
  ) => Promise<void>;
  /** Get request statuses foreach plan, this api is used as a complex GET action. */
  queryRequestApproval: (
    privateStoreId: string,
    requestApprovalId: string,
    options?: PrivateStoreQueryRequestApprovalOptionalParams,
  ) => Promise<QueryRequestApproval>;
  /** Get all open approval requests of current user */
  getApprovalRequestsList: (
    privateStoreId: string,
    options?: PrivateStoreGetApprovalRequestsListOptionalParams,
  ) => Promise<RequestApprovalsList>;
  /** Create approval request */
  createApprovalRequest: (
    privateStoreId: string,
    requestApprovalId: string,
    payload: RequestApprovalResource,
    options?: PrivateStoreCreateApprovalRequestOptionalParams,
  ) => Promise<RequestApprovalResource>;
  /** Get open request approval details */
  getRequestApproval: (
    privateStoreId: string,
    requestApprovalId: string,
    options?: PrivateStoreGetRequestApprovalOptionalParams,
  ) => Promise<RequestApprovalResource>;
  /** List all the subscriptions in the private store context */
  listSubscriptionsContext: (
    privateStoreId: string,
    options?: PrivateStoreListSubscriptionsContextOptionalParams,
  ) => Promise<SubscriptionsContextList>;
  /** List stop sell notifications for both stop sell offers and stop sell plans */
  listStopSellOffersPlansNotifications: (
    privateStoreId: string,
    options?: PrivateStoreListStopSellOffersPlansNotificationsOptionalParams,
  ) => Promise<StopSellOffersPlansNotificationsList>;
  /** List new plans notifications */
  listNewPlansNotifications: (
    privateStoreId: string,
    options?: PrivateStoreListNewPlansNotificationsOptionalParams,
  ) => Promise<NewPlansNotificationsList>;
  /** Fetch all subscriptions in tenant, only for marketplace admin */
  fetchAllSubscriptionsInTenant: (
    privateStoreId: string,
    options?: PrivateStoreFetchAllSubscriptionsInTenantOptionalParams,
  ) => Promise<SubscriptionsResponse>;
  /** Acknowledge notification for offer */
  acknowledgeOfferNotification: (
    privateStoreId: string,
    offerId: string,
    options?: PrivateStoreAcknowledgeOfferNotificationOptionalParams,
  ) => Promise<void>;
  /** Get private store notifications state */
  queryNotificationsState: (
    privateStoreId: string,
    options?: PrivateStoreQueryNotificationsStateOptionalParams,
  ) => Promise<PrivateStoreNotificationsState>;
  /** Perform an action on bulk collections */
  bulkCollectionsAction: (
    privateStoreId: string,
    options?: PrivateStoreBulkCollectionsActionOptionalParams,
  ) => Promise<BulkCollectionsResponse>;
  /** Get map of plans and related approved subscriptions. */
  queryApprovedPlans: (
    privateStoreId: string,
    options?: PrivateStoreQueryApprovedPlansOptionalParams,
  ) => Promise<QueryApprovedPlansResponse>;
  /** For a given subscriptions list, the API will return a map of collections and the related subscriptions from the supplied list. */
  collectionsToSubscriptionsMapping: (
    privateStoreId: string,
    options?: PrivateStoreCollectionsToSubscriptionsMappingOptionalParams,
  ) => Promise<CollectionsToSubscriptionsMappingResponse>;
  /** Tenant billing accounts names */
  billingAccounts: (
    privateStoreId: string,
    options?: PrivateStoreBillingAccountsOptionalParams,
  ) => Promise<BillingAccountsResponse>;
  /** List of user's approved offers for the provided offers and subscriptions */
  queryUserOffers: (
    privateStoreId: string,
    options?: PrivateStoreQueryUserOffersOptionalParams,
  ) => Promise<QueryOffers>;
  /** List of offers, regardless the collections */
  queryOffers: (
    privateStoreId: string,
    options?: PrivateStoreQueryOffersOptionalParams,
  ) => Promise<QueryOffers>;
  /** Query whether exists any offer in the collections. */
  anyExistingOffersInTheCollections: (
    privateStoreId: string,
    options?: PrivateStoreAnyExistingOffersInTheCollectionsOptionalParams,
  ) => Promise<AnyExistingOffersInTheCollectionsResponse>;
  /** Gets the list of available private stores. */
  list: (options?: PrivateStoreListOptionalParams) => PagedAsyncIterableIterator<PrivateStore>;
  /** Deletes the private store. All that is not saved will be lost. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (privateStoreId: string, options?: PrivateStoreDeleteOptionalParams) => Promise<void>;
  /** Changes private store properties */
  createOrUpdate: (
    privateStoreId: string,
    options?: PrivateStoreCreateOrUpdateOptionalParams,
  ) => Promise<void>;
  /** Get information about the private store */
  get: (privateStoreId: string, options?: PrivateStoreGetOptionalParams) => Promise<PrivateStore>;
}

function _getPrivateStore(context: MarketplaceContext) {
  return {
    adminRequestApprovalsList: (
      privateStoreId: string,
      options?: PrivateStoreAdminRequestApprovalsListOptionalParams,
    ) => adminRequestApprovalsList(context, privateStoreId, options),
    updateAdminRequestApproval: (
      privateStoreId: string,
      adminRequestApprovalId: string,
      options?: PrivateStoreUpdateAdminRequestApprovalOptionalParams,
    ) => updateAdminRequestApproval(context, privateStoreId, adminRequestApprovalId, options),
    getAdminRequestApproval: (
      privateStoreId: string,
      adminRequestApprovalId: string,
      publisherId: string,
      options?: PrivateStoreGetAdminRequestApprovalOptionalParams,
    ) =>
      getAdminRequestApproval(
        context,
        privateStoreId,
        adminRequestApprovalId,
        publisherId,
        options,
      ),
    withdrawPlan: (
      privateStoreId: string,
      requestApprovalId: string,
      options?: PrivateStoreWithdrawPlanOptionalParams,
    ) => withdrawPlan(context, privateStoreId, requestApprovalId, options),
    queryRequestApproval: (
      privateStoreId: string,
      requestApprovalId: string,
      options?: PrivateStoreQueryRequestApprovalOptionalParams,
    ) => queryRequestApproval(context, privateStoreId, requestApprovalId, options),
    getApprovalRequestsList: (
      privateStoreId: string,
      options?: PrivateStoreGetApprovalRequestsListOptionalParams,
    ) => getApprovalRequestsList(context, privateStoreId, options),
    createApprovalRequest: (
      privateStoreId: string,
      requestApprovalId: string,
      payload: RequestApprovalResource,
      options?: PrivateStoreCreateApprovalRequestOptionalParams,
    ) => createApprovalRequest(context, privateStoreId, requestApprovalId, payload, options),
    getRequestApproval: (
      privateStoreId: string,
      requestApprovalId: string,
      options?: PrivateStoreGetRequestApprovalOptionalParams,
    ) => getRequestApproval(context, privateStoreId, requestApprovalId, options),
    listSubscriptionsContext: (
      privateStoreId: string,
      options?: PrivateStoreListSubscriptionsContextOptionalParams,
    ) => listSubscriptionsContext(context, privateStoreId, options),
    listStopSellOffersPlansNotifications: (
      privateStoreId: string,
      options?: PrivateStoreListStopSellOffersPlansNotificationsOptionalParams,
    ) => listStopSellOffersPlansNotifications(context, privateStoreId, options),
    listNewPlansNotifications: (
      privateStoreId: string,
      options?: PrivateStoreListNewPlansNotificationsOptionalParams,
    ) => listNewPlansNotifications(context, privateStoreId, options),
    fetchAllSubscriptionsInTenant: (
      privateStoreId: string,
      options?: PrivateStoreFetchAllSubscriptionsInTenantOptionalParams,
    ) => fetchAllSubscriptionsInTenant(context, privateStoreId, options),
    acknowledgeOfferNotification: (
      privateStoreId: string,
      offerId: string,
      options?: PrivateStoreAcknowledgeOfferNotificationOptionalParams,
    ) => acknowledgeOfferNotification(context, privateStoreId, offerId, options),
    queryNotificationsState: (
      privateStoreId: string,
      options?: PrivateStoreQueryNotificationsStateOptionalParams,
    ) => queryNotificationsState(context, privateStoreId, options),
    bulkCollectionsAction: (
      privateStoreId: string,
      options?: PrivateStoreBulkCollectionsActionOptionalParams,
    ) => bulkCollectionsAction(context, privateStoreId, options),
    queryApprovedPlans: (
      privateStoreId: string,
      options?: PrivateStoreQueryApprovedPlansOptionalParams,
    ) => queryApprovedPlans(context, privateStoreId, options),
    collectionsToSubscriptionsMapping: (
      privateStoreId: string,
      options?: PrivateStoreCollectionsToSubscriptionsMappingOptionalParams,
    ) => collectionsToSubscriptionsMapping(context, privateStoreId, options),
    billingAccounts: (
      privateStoreId: string,
      options?: PrivateStoreBillingAccountsOptionalParams,
    ) => billingAccounts(context, privateStoreId, options),
    queryUserOffers: (
      privateStoreId: string,
      options?: PrivateStoreQueryUserOffersOptionalParams,
    ) => queryUserOffers(context, privateStoreId, options),
    queryOffers: (privateStoreId: string, options?: PrivateStoreQueryOffersOptionalParams) =>
      queryOffers(context, privateStoreId, options),
    anyExistingOffersInTheCollections: (
      privateStoreId: string,
      options?: PrivateStoreAnyExistingOffersInTheCollectionsOptionalParams,
    ) => anyExistingOffersInTheCollections(context, privateStoreId, options),
    list: (options?: PrivateStoreListOptionalParams) => list(context, options),
    delete: (privateStoreId: string, options?: PrivateStoreDeleteOptionalParams) =>
      $delete(context, privateStoreId, options),
    createOrUpdate: (privateStoreId: string, options?: PrivateStoreCreateOrUpdateOptionalParams) =>
      createOrUpdate(context, privateStoreId, options),
    get: (privateStoreId: string, options?: PrivateStoreGetOptionalParams) =>
      get(context, privateStoreId, options),
  };
}

export function _getPrivateStoreOperations(context: MarketplaceContext): PrivateStoreOperations {
  return {
    ..._getPrivateStore(context),
  };
}
