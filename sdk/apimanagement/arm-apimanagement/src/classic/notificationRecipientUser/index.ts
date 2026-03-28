// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  $delete,
  createOrUpdate,
  checkEntityExists,
  listByNotification,
} from "../../api/notificationRecipientUser/operations.js";
import type {
  NotificationRecipientUserDeleteOptionalParams,
  NotificationRecipientUserCreateOrUpdateOptionalParams,
  NotificationRecipientUserCheckEntityExistsOptionalParams,
  NotificationRecipientUserListByNotificationOptionalParams,
} from "../../api/notificationRecipientUser/options.js";
import type {
  NotificationName,
  RecipientUserCollection,
  RecipientUserContract,
} from "../../models/models.js";

/** Interface representing a NotificationRecipientUser operations. */
export interface NotificationRecipientUserOperations {
  /** Removes the API Management user from the list of Notification. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    userId: string,
    options?: NotificationRecipientUserDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds the API Management User to the list of Recipients for the Notification. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    userId: string,
    options?: NotificationRecipientUserCreateOrUpdateOptionalParams,
  ) => Promise<RecipientUserContract>;
  /** Determine if the Notification Recipient User is subscribed to the notification. */
  checkEntityExists: (
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    userId: string,
    options?: NotificationRecipientUserCheckEntityExistsOptionalParams,
  ) => Promise<void>;
  /** Gets the list of the Notification Recipient User subscribed to the notification. */
  listByNotification: (
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    options?: NotificationRecipientUserListByNotificationOptionalParams,
  ) => Promise<RecipientUserCollection>;
}

function _getNotificationRecipientUser(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      notificationName: NotificationName,
      userId: string,
      options?: NotificationRecipientUserDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, notificationName, userId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      notificationName: NotificationName,
      userId: string,
      options?: NotificationRecipientUserCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, notificationName, userId, options),
    checkEntityExists: (
      resourceGroupName: string,
      serviceName: string,
      notificationName: NotificationName,
      userId: string,
      options?: NotificationRecipientUserCheckEntityExistsOptionalParams,
    ) =>
      checkEntityExists(context, resourceGroupName, serviceName, notificationName, userId, options),
    listByNotification: (
      resourceGroupName: string,
      serviceName: string,
      notificationName: NotificationName,
      options?: NotificationRecipientUserListByNotificationOptionalParams,
    ) => listByNotification(context, resourceGroupName, serviceName, notificationName, options),
  };
}

export function _getNotificationRecipientUserOperations(
  context: ApiManagementContext,
): NotificationRecipientUserOperations {
  return {
    ..._getNotificationRecipientUser(context),
  };
}
