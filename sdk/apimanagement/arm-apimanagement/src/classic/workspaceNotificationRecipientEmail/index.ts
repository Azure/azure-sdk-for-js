// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  $delete,
  createOrUpdate,
  checkEntityExists,
  listByNotification,
} from "../../api/workspaceNotificationRecipientEmail/operations.js";
import type {
  WorkspaceNotificationRecipientEmailDeleteOptionalParams,
  WorkspaceNotificationRecipientEmailCreateOrUpdateOptionalParams,
  WorkspaceNotificationRecipientEmailCheckEntityExistsOptionalParams,
  WorkspaceNotificationRecipientEmailListByNotificationOptionalParams,
} from "../../api/workspaceNotificationRecipientEmail/options.js";
import type {
  NotificationName,
  RecipientEmailCollection,
  RecipientEmailContract,
} from "../../models/models.js";

/** Interface representing a WorkspaceNotificationRecipientEmail operations. */
export interface WorkspaceNotificationRecipientEmailOperations {
  /** Removes the email from the list of Notification. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    notificationName: NotificationName,
    email: string,
    options?: WorkspaceNotificationRecipientEmailDeleteOptionalParams,
  ) => Promise<void>;
  /** Adds the Email address to the list of Recipients for the Notification. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    notificationName: NotificationName,
    email: string,
    options?: WorkspaceNotificationRecipientEmailCreateOrUpdateOptionalParams,
  ) => Promise<RecipientEmailContract>;
  /** Determine if Notification Recipient Email subscribed to the notification. */
  checkEntityExists: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    notificationName: NotificationName,
    email: string,
    options?: WorkspaceNotificationRecipientEmailCheckEntityExistsOptionalParams,
  ) => Promise<void>;
  /** Gets the list of the Notification Recipient Emails subscribed to a notification. */
  listByNotification: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    notificationName: NotificationName,
    options?: WorkspaceNotificationRecipientEmailListByNotificationOptionalParams,
  ) => Promise<RecipientEmailCollection>;
}

function _getWorkspaceNotificationRecipientEmail(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      notificationName: NotificationName,
      email: string,
      options?: WorkspaceNotificationRecipientEmailDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        notificationName,
        email,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      notificationName: NotificationName,
      email: string,
      options?: WorkspaceNotificationRecipientEmailCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        notificationName,
        email,
        options,
      ),
    checkEntityExists: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      notificationName: NotificationName,
      email: string,
      options?: WorkspaceNotificationRecipientEmailCheckEntityExistsOptionalParams,
    ) =>
      checkEntityExists(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        notificationName,
        email,
        options,
      ),
    listByNotification: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      notificationName: NotificationName,
      options?: WorkspaceNotificationRecipientEmailListByNotificationOptionalParams,
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

export function _getWorkspaceNotificationRecipientEmailOperations(
  context: ApiManagementContext,
): WorkspaceNotificationRecipientEmailOperations {
  return {
    ..._getWorkspaceNotificationRecipientEmail(context),
  };
}
