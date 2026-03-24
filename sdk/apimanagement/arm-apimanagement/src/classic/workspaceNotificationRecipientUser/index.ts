// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  $delete,
  createOrUpdate,
  checkEntityExists,
  listByNotification,
} from "../../api/workspaceNotificationRecipientUser/operations.js";
import type {
  WorkspaceNotificationRecipientUserDeleteOptionalParams,
  WorkspaceNotificationRecipientUserCreateOrUpdateOptionalParams,
  WorkspaceNotificationRecipientUserCheckEntityExistsOptionalParams,
  WorkspaceNotificationRecipientUserListByNotificationOptionalParams,
} from "../../api/workspaceNotificationRecipientUser/options.js";
import type {
  NotificationName,
  RecipientUserCollection,
  RecipientUserContract,
} from "../../models/models.js";

/** Interface representing a WorkspaceNotificationRecipientUser operations. */
export interface WorkspaceNotificationRecipientUserOperations {
  /** Removes the API Management user from the list of Notification. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    notificationName: NotificationName,
    userId: string,
    options?: WorkspaceNotificationRecipientUserDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds the API Management User to the list of Recipients for the Notification. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    notificationName: NotificationName,
    userId: string,
    options?: WorkspaceNotificationRecipientUserCreateOrUpdateOptionalParams,
  ) => Promise<RecipientUserContract>;
  /** Determine if the Notification Recipient User is subscribed to the notification. */
  checkEntityExists: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    notificationName: NotificationName,
    userId: string,
    options?: WorkspaceNotificationRecipientUserCheckEntityExistsOptionalParams,
  ) => Promise<void>;
  /** Gets the list of the Notification Recipient User subscribed to the notification. */
  listByNotification: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    notificationName: NotificationName,
    options?: WorkspaceNotificationRecipientUserListByNotificationOptionalParams,
  ) => Promise<RecipientUserCollection>;
}

function _getWorkspaceNotificationRecipientUser(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      notificationName: NotificationName,
      userId: string,
      options?: WorkspaceNotificationRecipientUserDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        notificationName,
        userId,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      notificationName: NotificationName,
      userId: string,
      options?: WorkspaceNotificationRecipientUserCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        notificationName,
        userId,
        options,
      ),
    checkEntityExists: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      notificationName: NotificationName,
      userId: string,
      options?: WorkspaceNotificationRecipientUserCheckEntityExistsOptionalParams,
    ) =>
      checkEntityExists(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        notificationName,
        userId,
        options,
      ),
    listByNotification: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      notificationName: NotificationName,
      options?: WorkspaceNotificationRecipientUserListByNotificationOptionalParams,
    ) =>
      listByNotification(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        notificationName,
        options,
      ),
  };
}

export function _getWorkspaceNotificationRecipientUserOperations(
  context: ApiManagementContext,
): WorkspaceNotificationRecipientUserOperations {
  return {
    ..._getWorkspaceNotificationRecipientUser(context),
  };
}
