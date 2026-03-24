// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  NotificationName,
  RecipientUserCollection,
  RecipientUserContract,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  recipientUserCollectionDeserializer,
  recipientUserContractDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NotificationRecipientUserDeleteOptionalParams,
  NotificationRecipientUserCreateOrUpdateOptionalParams,
  NotificationRecipientUserCheckEntityExistsOptionalParams,
  NotificationRecipientUserListByNotificationOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  userId: string,
  options: NotificationRecipientUserDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientUsers/{userId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      notificationName: notificationName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

/** Removes the API Management user from the list of Notification. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  userId: string,
  options: NotificationRecipientUserDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    notificationName,
    userId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  userId: string,
  options: NotificationRecipientUserCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientUsers/{userId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      notificationName: notificationName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<RecipientUserContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recipientUserContractDeserializer(result.body);
}

/** Adds the API Management User to the list of Recipients for the Notification. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  userId: string,
  options: NotificationRecipientUserCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<RecipientUserContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    notificationName,
    userId,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _checkEntityExistsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  userId: string,
  options: NotificationRecipientUserCheckEntityExistsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientUsers/{userId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      notificationName: notificationName,
      userId: userId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).head({ ...operationOptionsToRequestParameters(options) });
}

export async function _checkEntityExistsDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Determine if the Notification Recipient User is subscribed to the notification. */
export async function checkEntityExists(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  userId: string,
  options: NotificationRecipientUserCheckEntityExistsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkEntityExistsSend(
    context,
    resourceGroupName,
    serviceName,
    notificationName,
    userId,
    options,
  );
  return _checkEntityExistsDeserialize(result);
}

export function _listByNotificationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  options: NotificationRecipientUserListByNotificationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientUsers{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      notificationName: notificationName,
      "api%2Dversion": context.apiVersion ?? "2025-03-01-preview",
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

export async function _listByNotificationDeserialize(
  result: PathUncheckedResponse,
): Promise<RecipientUserCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recipientUserCollectionDeserializer(result.body);
}

/** Gets the list of the Notification Recipient User subscribed to the notification. */
export async function listByNotification(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  options: NotificationRecipientUserListByNotificationOptionalParams = { requestOptions: {} },
): Promise<RecipientUserCollection> {
  const result = await _listByNotificationSend(
    context,
    resourceGroupName,
    serviceName,
    notificationName,
    options,
  );
  return _listByNotificationDeserialize(result);
}
