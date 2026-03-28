// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  $delete,
  createOrUpdate,
  checkEntityExists,
  listByNotification,
} from "../../api/notificationRecipientEmail/operations.js";
import type {
  NotificationRecipientEmailDeleteOptionalParams,
  NotificationRecipientEmailCreateOrUpdateOptionalParams,
  NotificationRecipientEmailCheckEntityExistsOptionalParams,
  NotificationRecipientEmailListByNotificationOptionalParams,
} from "../../api/notificationRecipientEmail/options.js";
import type {
  NotificationName,
  RecipientEmailCollection,
  RecipientEmailContract,
} from "../../models/models.js";

/** Interface representing a NotificationRecipientEmail operations. */
export interface NotificationRecipientEmailOperations {
  /** Removes the email from the list of Notification. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    email: string,
    options?: NotificationRecipientEmailDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds the Email address to the list of Recipients for the Notification. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    email: string,
    options?: NotificationRecipientEmailCreateOrUpdateOptionalParams,
  ) => Promise<RecipientEmailContract>;
  /** Determine if Notification Recipient Email subscribed to the notification. */
  checkEntityExists: (
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    email: string,
    options?: NotificationRecipientEmailCheckEntityExistsOptionalParams,
  ) => Promise<void>;
  /** Gets the list of the Notification Recipient Emails subscribed to a notification. */
  listByNotification: (
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    options?: NotificationRecipientEmailListByNotificationOptionalParams,
  ) => Promise<RecipientEmailCollection>;
}

function _getNotificationRecipientEmail(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      notificationName: NotificationName,
      email: string,
      options?: NotificationRecipientEmailDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, notificationName, email, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      notificationName: NotificationName,
      email: string,
      options?: NotificationRecipientEmailCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, notificationName, email, options),
    checkEntityExists: (
      resourceGroupName: string,
      serviceName: string,
      notificationName: NotificationName,
      email: string,
      options?: NotificationRecipientEmailCheckEntityExistsOptionalParams,
    ) =>
      checkEntityExists(context, resourceGroupName, serviceName, notificationName, email, options),
    listByNotification: (
      resourceGroupName: string,
      serviceName: string,
      notificationName: NotificationName,
      options?: NotificationRecipientEmailListByNotificationOptionalParams,
    ) => listByNotification(context, resourceGroupName, serviceName, notificationName, options),
  };
}

export function _getNotificationRecipientEmailOperations(
  context: ApiManagementContext,
): NotificationRecipientEmailOperations {
  return {
    ..._getNotificationRecipientEmail(context),
  };
}
