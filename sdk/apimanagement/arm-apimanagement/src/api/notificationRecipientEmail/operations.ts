// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  NotificationName,
  RecipientEmailCollection,
  RecipientEmailContract,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  recipientEmailCollectionDeserializer,
  recipientEmailContractDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NotificationRecipientEmailDeleteOptionalParams,
  NotificationRecipientEmailCreateOrUpdateOptionalParams,
  NotificationRecipientEmailCheckEntityExistsOptionalParams,
  NotificationRecipientEmailListByNotificationOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  email: string,
  options: NotificationRecipientEmailDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientEmails/{email}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      notificationName: notificationName,
      email: email,
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

/** Removes the email from the list of Notification. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  email: string,
  options: NotificationRecipientEmailDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serviceName,
    notificationName,
    email,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  email: string,
  options: NotificationRecipientEmailCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientEmails/{email}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      notificationName: notificationName,
      email: email,
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
): Promise<RecipientEmailContract> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recipientEmailContractDeserializer(result.body);
}

/** Adds the Email address to the list of Recipients for the Notification. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  email: string,
  options: NotificationRecipientEmailCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<RecipientEmailContract> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serviceName,
    notificationName,
    email,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _checkEntityExistsSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  email: string,
  options: NotificationRecipientEmailCheckEntityExistsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientEmails/{email}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serviceName: serviceName,
      notificationName: notificationName,
      email: email,
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

/** Determine if Notification Recipient Email subscribed to the notification. */
export async function checkEntityExists(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  email: string,
  options: NotificationRecipientEmailCheckEntityExistsOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _checkEntityExistsSend(
    context,
    resourceGroupName,
    serviceName,
    notificationName,
    email,
    options,
  );
  return _checkEntityExistsDeserialize(result);
}

export function _listByNotificationSend(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  options: NotificationRecipientEmailListByNotificationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientEmails{?api%2Dversion}",
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
): Promise<RecipientEmailCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return recipientEmailCollectionDeserializer(result.body);
}

/** Gets the list of the Notification Recipient Emails subscribed to a notification. */
export async function listByNotification(
  context: Client,
  resourceGroupName: string,
  serviceName: string,
  notificationName: NotificationName,
  options: NotificationRecipientEmailListByNotificationOptionalParams = { requestOptions: {} },
): Promise<RecipientEmailCollection> {
  const result = await _listByNotificationSend(
    context,
    resourceGroupName,
    serviceName,
    notificationName,
    options,
  );
  return _listByNotificationDeserialize(result);
}
