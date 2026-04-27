// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext as Client } from "../index.js";
import type {
  PrivateStore,
  _PrivateStoreList,
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
import {
  errorResponseDeserializer,
  privateStoreSerializer,
  privateStoreDeserializer,
  _privateStoreListDeserializer,
  anyExistingOffersInTheCollectionsResponseDeserializer,
  queryOffersDeserializer,
  queryUserOffersPropertiesSerializer,
  billingAccountsResponseDeserializer,
  collectionsToSubscriptionsMappingPayloadSerializer,
  collectionsToSubscriptionsMappingResponseDeserializer,
  queryApprovedPlansPayloadSerializer,
  queryApprovedPlansResponseDeserializer,
  bulkCollectionsPayloadSerializer,
  bulkCollectionsResponseDeserializer,
  privateStoreNotificationsStateDeserializer,
  acknowledgeOfferNotificationPropertiesSerializer,
  subscriptionsResponseDeserializer,
  newPlansNotificationsListDeserializer,
  stopSellSubscriptionsSerializer,
  stopSellOffersPlansNotificationsListDeserializer,
  subscriptionsContextListDeserializer,
  requestApprovalResourceSerializer,
  requestApprovalResourceDeserializer,
  requestApprovalsListDeserializer,
  queryRequestApprovalPropertiesSerializer,
  queryRequestApprovalDeserializer,
  withdrawPropertiesSerializer,
  adminRequestApprovalsResourceSerializer,
  adminRequestApprovalsResourceDeserializer,
  adminRequestApprovalsListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
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
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _adminRequestApprovalsListSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreAdminRequestApprovalsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/adminRequestApprovals{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _adminRequestApprovalsListDeserialize(
  result: PathUncheckedResponse,
): Promise<AdminRequestApprovalsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return adminRequestApprovalsListDeserializer(result.body);
}

/** Get list of admin request approvals */
export async function adminRequestApprovalsList(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreAdminRequestApprovalsListOptionalParams = { requestOptions: {} },
): Promise<AdminRequestApprovalsList> {
  const result = await _adminRequestApprovalsListSend(context, privateStoreId, options);
  return _adminRequestApprovalsListDeserialize(result);
}

export function _updateAdminRequestApprovalSend(
  context: Client,
  privateStoreId: string,
  adminRequestApprovalId: string,
  options: PrivateStoreUpdateAdminRequestApprovalOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/adminRequestApprovals/{adminRequestApprovalId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      adminRequestApprovalId: adminRequestApprovalId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["payload"]
      ? options["payload"]
      : adminRequestApprovalsResourceSerializer(options["payload"]),
  });
}

export async function _updateAdminRequestApprovalDeserialize(
  result: PathUncheckedResponse,
): Promise<AdminRequestApprovalsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return adminRequestApprovalsResourceDeserializer(result.body);
}

/** Update the admin action, weather the request is approved or rejected and the approved plans */
export async function updateAdminRequestApproval(
  context: Client,
  privateStoreId: string,
  adminRequestApprovalId: string,
  options: PrivateStoreUpdateAdminRequestApprovalOptionalParams = { requestOptions: {} },
): Promise<AdminRequestApprovalsResource> {
  const result = await _updateAdminRequestApprovalSend(
    context,
    privateStoreId,
    adminRequestApprovalId,
    options,
  );
  return _updateAdminRequestApprovalDeserialize(result);
}

export function _getAdminRequestApprovalSend(
  context: Client,
  privateStoreId: string,
  adminRequestApprovalId: string,
  publisherId: string,
  options: PrivateStoreGetAdminRequestApprovalOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/adminRequestApprovals/{adminRequestApprovalId}{?api%2Dversion,publisherId}",
    {
      privateStoreId: privateStoreId,
      adminRequestApprovalId: adminRequestApprovalId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
      publisherId: publisherId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getAdminRequestApprovalDeserialize(
  result: PathUncheckedResponse,
): Promise<AdminRequestApprovalsResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return adminRequestApprovalsResourceDeserializer(result.body);
}

/** Get open approval requests */
export async function getAdminRequestApproval(
  context: Client,
  privateStoreId: string,
  adminRequestApprovalId: string,
  publisherId: string,
  options: PrivateStoreGetAdminRequestApprovalOptionalParams = { requestOptions: {} },
): Promise<AdminRequestApprovalsResource> {
  const result = await _getAdminRequestApprovalSend(
    context,
    privateStoreId,
    adminRequestApprovalId,
    publisherId,
    options,
  );
  return _getAdminRequestApprovalDeserialize(result);
}

export function _withdrawPlanSend(
  context: Client,
  privateStoreId: string,
  requestApprovalId: string,
  options: PrivateStoreWithdrawPlanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/requestApprovals/{requestApprovalId}/withdrawPlan{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      requestApprovalId: requestApprovalId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["payload"]
      ? options["payload"]
      : withdrawPropertiesSerializer(options["payload"]),
  });
}

export async function _withdrawPlanDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Withdraw a user request approval on specific plan */
export async function withdrawPlan(
  context: Client,
  privateStoreId: string,
  requestApprovalId: string,
  options: PrivateStoreWithdrawPlanOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _withdrawPlanSend(context, privateStoreId, requestApprovalId, options);
  return _withdrawPlanDeserialize(result);
}

export function _queryRequestApprovalSend(
  context: Client,
  privateStoreId: string,
  requestApprovalId: string,
  options: PrivateStoreQueryRequestApprovalOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/requestApprovals/{requestApprovalId}/query{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      requestApprovalId: requestApprovalId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["payload"]
      ? options["payload"]
      : queryRequestApprovalPropertiesSerializer(options["payload"]),
  });
}

export async function _queryRequestApprovalDeserialize(
  result: PathUncheckedResponse,
): Promise<QueryRequestApproval> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return queryRequestApprovalDeserializer(result.body);
}

/** Get request statuses foreach plan, this api is used as a complex GET action. */
export async function queryRequestApproval(
  context: Client,
  privateStoreId: string,
  requestApprovalId: string,
  options: PrivateStoreQueryRequestApprovalOptionalParams = { requestOptions: {} },
): Promise<QueryRequestApproval> {
  const result = await _queryRequestApprovalSend(
    context,
    privateStoreId,
    requestApprovalId,
    options,
  );
  return _queryRequestApprovalDeserialize(result);
}

export function _getApprovalRequestsListSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreGetApprovalRequestsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/requestApprovals{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getApprovalRequestsListDeserialize(
  result: PathUncheckedResponse,
): Promise<RequestApprovalsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return requestApprovalsListDeserializer(result.body);
}

/** Get all open approval requests of current user */
export async function getApprovalRequestsList(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreGetApprovalRequestsListOptionalParams = { requestOptions: {} },
): Promise<RequestApprovalsList> {
  const result = await _getApprovalRequestsListSend(context, privateStoreId, options);
  return _getApprovalRequestsListDeserialize(result);
}

export function _createApprovalRequestSend(
  context: Client,
  privateStoreId: string,
  requestApprovalId: string,
  payload: RequestApprovalResource,
  options: PrivateStoreCreateApprovalRequestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/requestApprovals/{requestApprovalId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      requestApprovalId: requestApprovalId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: requestApprovalResourceSerializer(payload),
  });
}

export async function _createApprovalRequestDeserialize(
  result: PathUncheckedResponse,
): Promise<RequestApprovalResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return requestApprovalResourceDeserializer(result.body);
}

/** Create approval request */
export async function createApprovalRequest(
  context: Client,
  privateStoreId: string,
  requestApprovalId: string,
  payload: RequestApprovalResource,
  options: PrivateStoreCreateApprovalRequestOptionalParams = { requestOptions: {} },
): Promise<RequestApprovalResource> {
  const result = await _createApprovalRequestSend(
    context,
    privateStoreId,
    requestApprovalId,
    payload,
    options,
  );
  return _createApprovalRequestDeserialize(result);
}

export function _getRequestApprovalSend(
  context: Client,
  privateStoreId: string,
  requestApprovalId: string,
  options: PrivateStoreGetRequestApprovalOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/requestApprovals/{requestApprovalId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      requestApprovalId: requestApprovalId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getRequestApprovalDeserialize(
  result: PathUncheckedResponse,
): Promise<RequestApprovalResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return requestApprovalResourceDeserializer(result.body);
}

/** Get open request approval details */
export async function getRequestApproval(
  context: Client,
  privateStoreId: string,
  requestApprovalId: string,
  options: PrivateStoreGetRequestApprovalOptionalParams = { requestOptions: {} },
): Promise<RequestApprovalResource> {
  const result = await _getRequestApprovalSend(context, privateStoreId, requestApprovalId, options);
  return _getRequestApprovalDeserialize(result);
}

export function _listSubscriptionsContextSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreListSubscriptionsContextOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/listSubscriptionsContext{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listSubscriptionsContextDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionsContextList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionsContextListDeserializer(result.body);
}

/** List all the subscriptions in the private store context */
export async function listSubscriptionsContext(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreListSubscriptionsContextOptionalParams = { requestOptions: {} },
): Promise<SubscriptionsContextList> {
  const result = await _listSubscriptionsContextSend(context, privateStoreId, options);
  return _listSubscriptionsContextDeserialize(result);
}

export function _listStopSellOffersPlansNotificationsSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreListStopSellOffersPlansNotificationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/listStopSellOffersPlansNotifications{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["stopSellSubscriptions"]
      ? options["stopSellSubscriptions"]
      : stopSellSubscriptionsSerializer(options["stopSellSubscriptions"]),
  });
}

export async function _listStopSellOffersPlansNotificationsDeserialize(
  result: PathUncheckedResponse,
): Promise<StopSellOffersPlansNotificationsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return stopSellOffersPlansNotificationsListDeserializer(result.body);
}

/** List stop sell notifications for both stop sell offers and stop sell plans */
export async function listStopSellOffersPlansNotifications(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreListStopSellOffersPlansNotificationsOptionalParams = { requestOptions: {} },
): Promise<StopSellOffersPlansNotificationsList> {
  const result = await _listStopSellOffersPlansNotificationsSend(context, privateStoreId, options);
  return _listStopSellOffersPlansNotificationsDeserialize(result);
}

export function _listNewPlansNotificationsSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreListNewPlansNotificationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/listNewPlansNotifications{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listNewPlansNotificationsDeserialize(
  result: PathUncheckedResponse,
): Promise<NewPlansNotificationsList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return newPlansNotificationsListDeserializer(result.body);
}

/** List new plans notifications */
export async function listNewPlansNotifications(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreListNewPlansNotificationsOptionalParams = { requestOptions: {} },
): Promise<NewPlansNotificationsList> {
  const result = await _listNewPlansNotificationsSend(context, privateStoreId, options);
  return _listNewPlansNotificationsDeserialize(result);
}

export function _fetchAllSubscriptionsInTenantSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreFetchAllSubscriptionsInTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/fetchAllSubscriptionsInTenant{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.nextPageToken !== undefined
        ? { "next-page-token": options?.nextPageToken }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _fetchAllSubscriptionsInTenantDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionsResponseDeserializer(result.body);
}

/** Fetch all subscriptions in tenant, only for marketplace admin */
export async function fetchAllSubscriptionsInTenant(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreFetchAllSubscriptionsInTenantOptionalParams = { requestOptions: {} },
): Promise<SubscriptionsResponse> {
  const result = await _fetchAllSubscriptionsInTenantSend(context, privateStoreId, options);
  return _fetchAllSubscriptionsInTenantDeserialize(result);
}

export function _acknowledgeOfferNotificationSend(
  context: Client,
  privateStoreId: string,
  offerId: string,
  options: PrivateStoreAcknowledgeOfferNotificationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/offers/{offerId}/acknowledgeNotification{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      offerId: offerId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["payload"]
      ? options["payload"]
      : acknowledgeOfferNotificationPropertiesSerializer(options["payload"]),
  });
}

export async function _acknowledgeOfferNotificationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Acknowledge notification for offer */
export async function acknowledgeOfferNotification(
  context: Client,
  privateStoreId: string,
  offerId: string,
  options: PrivateStoreAcknowledgeOfferNotificationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _acknowledgeOfferNotificationSend(context, privateStoreId, offerId, options);
  return _acknowledgeOfferNotificationDeserialize(result);
}

export function _queryNotificationsStateSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreQueryNotificationsStateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/queryNotificationsState{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _queryNotificationsStateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateStoreNotificationsState> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateStoreNotificationsStateDeserializer(result.body);
}

/** Get private store notifications state */
export async function queryNotificationsState(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreQueryNotificationsStateOptionalParams = { requestOptions: {} },
): Promise<PrivateStoreNotificationsState> {
  const result = await _queryNotificationsStateSend(context, privateStoreId, options);
  return _queryNotificationsStateDeserialize(result);
}

export function _bulkCollectionsActionSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreBulkCollectionsActionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/bulkCollectionsAction{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["payload"]
      ? options["payload"]
      : bulkCollectionsPayloadSerializer(options["payload"]),
  });
}

export async function _bulkCollectionsActionDeserialize(
  result: PathUncheckedResponse,
): Promise<BulkCollectionsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return bulkCollectionsResponseDeserializer(result.body);
}

/** Perform an action on bulk collections */
export async function bulkCollectionsAction(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreBulkCollectionsActionOptionalParams = { requestOptions: {} },
): Promise<BulkCollectionsResponse> {
  const result = await _bulkCollectionsActionSend(context, privateStoreId, options);
  return _bulkCollectionsActionDeserialize(result);
}

export function _queryApprovedPlansSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreQueryApprovedPlansOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/queryApprovedPlans{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["payload"]
      ? options["payload"]
      : queryApprovedPlansPayloadSerializer(options["payload"]),
  });
}

export async function _queryApprovedPlansDeserialize(
  result: PathUncheckedResponse,
): Promise<QueryApprovedPlansResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return queryApprovedPlansResponseDeserializer(result.body);
}

/** Get map of plans and related approved subscriptions. */
export async function queryApprovedPlans(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreQueryApprovedPlansOptionalParams = { requestOptions: {} },
): Promise<QueryApprovedPlansResponse> {
  const result = await _queryApprovedPlansSend(context, privateStoreId, options);
  return _queryApprovedPlansDeserialize(result);
}

export function _collectionsToSubscriptionsMappingSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreCollectionsToSubscriptionsMappingOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/collectionsToSubscriptionsMapping{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["payload"]
      ? options["payload"]
      : collectionsToSubscriptionsMappingPayloadSerializer(options["payload"]),
  });
}

export async function _collectionsToSubscriptionsMappingDeserialize(
  result: PathUncheckedResponse,
): Promise<CollectionsToSubscriptionsMappingResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return collectionsToSubscriptionsMappingResponseDeserializer(result.body);
}

/** For a given subscriptions list, the API will return a map of collections and the related subscriptions from the supplied list. */
export async function collectionsToSubscriptionsMapping(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreCollectionsToSubscriptionsMappingOptionalParams = { requestOptions: {} },
): Promise<CollectionsToSubscriptionsMappingResponse> {
  const result = await _collectionsToSubscriptionsMappingSend(context, privateStoreId, options);
  return _collectionsToSubscriptionsMappingDeserialize(result);
}

export function _billingAccountsSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreBillingAccountsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/billingAccounts{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _billingAccountsDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingAccountsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingAccountsResponseDeserializer(result.body);
}

/** Tenant billing accounts names */
export async function billingAccounts(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreBillingAccountsOptionalParams = { requestOptions: {} },
): Promise<BillingAccountsResponse> {
  const result = await _billingAccountsSend(context, privateStoreId, options);
  return _billingAccountsDeserialize(result);
}

export function _queryUserOffersSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreQueryUserOffersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/queryUserOffers{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["payload"]
      ? options["payload"]
      : queryUserOffersPropertiesSerializer(options["payload"]),
  });
}

export async function _queryUserOffersDeserialize(
  result: PathUncheckedResponse,
): Promise<QueryOffers> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return queryOffersDeserializer(result.body);
}

/** List of user's approved offers for the provided offers and subscriptions */
export async function queryUserOffers(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreQueryUserOffersOptionalParams = { requestOptions: {} },
): Promise<QueryOffers> {
  const result = await _queryUserOffersSend(context, privateStoreId, options);
  return _queryUserOffersDeserialize(result);
}

export function _queryOffersSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreQueryOffersOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/queryOffers{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _queryOffersDeserialize(result: PathUncheckedResponse): Promise<QueryOffers> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return queryOffersDeserializer(result.body);
}

/** List of offers, regardless the collections */
export async function queryOffers(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreQueryOffersOptionalParams = { requestOptions: {} },
): Promise<QueryOffers> {
  const result = await _queryOffersSend(context, privateStoreId, options);
  return _queryOffersDeserialize(result);
}

export function _anyExistingOffersInTheCollectionsSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreAnyExistingOffersInTheCollectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}/anyExistingOffersInTheCollections{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _anyExistingOffersInTheCollectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<AnyExistingOffersInTheCollectionsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return anyExistingOffersInTheCollectionsResponseDeserializer(result.body);
}

/** Query whether exists any offer in the collections. */
export async function anyExistingOffersInTheCollections(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreAnyExistingOffersInTheCollectionsOptionalParams = { requestOptions: {} },
): Promise<AnyExistingOffersInTheCollectionsResponse> {
  const result = await _anyExistingOffersInTheCollectionsSend(context, privateStoreId, options);
  return _anyExistingOffersInTheCollectionsDeserialize(result);
}

export function _listSend(
  context: Client,
  options: PrivateStoreListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores{?api%2Dversion,use%2Dcache}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
      "use%2Dcache": options?.useCache,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_PrivateStoreList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _privateStoreListDeserializer(result.body);
}

/** Gets the list of available private stores. */
export function list(
  context: Client,
  options: PrivateStoreListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateStore> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the private store. All that is not saved will be lost. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, privateStoreId, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: !options["payload"] ? options["payload"] : privateStoreSerializer(options["payload"]),
  });
}

export async function _createOrUpdateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Changes private store properties */
export async function createOrUpdate(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _createOrUpdateSend(context, privateStoreId, options);
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/privateStores/{privateStoreId}{?api%2Dversion}",
    {
      privateStoreId: privateStoreId,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PrivateStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateStoreDeserializer(result.body);
}

/** Get information about the private store */
export async function get(
  context: Client,
  privateStoreId: string,
  options: PrivateStoreGetOptionalParams = { requestOptions: {} },
): Promise<PrivateStore> {
  const result = await _getSend(context, privateStoreId, options);
  return _getDeserialize(result);
}
