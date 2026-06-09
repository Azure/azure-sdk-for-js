// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService, createOrUpdate, get } from "../../api/workspaceNotification/operations.js";
import type {
  WorkspaceNotificationListByServiceOptionalParams,
  WorkspaceNotificationCreateOrUpdateOptionalParams,
  WorkspaceNotificationGetOptionalParams,
} from "../../api/workspaceNotification/options.js";
import type { NotificationContract, NotificationName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceNotification operations. */
export interface WorkspaceNotificationOperations {
  /** Lists a collection of properties defined within a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    options?: WorkspaceNotificationListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<NotificationContract>;
  /** Create or Update API Management publisher notification for the workspace. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    notificationName: NotificationName,
    options?: WorkspaceNotificationCreateOrUpdateOptionalParams,
  ) => Promise<NotificationContract>;
  /** Gets the details of the Notification specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    notificationName: NotificationName,
    options?: WorkspaceNotificationGetOptionalParams,
  ) => Promise<NotificationContract>;
}

function _getWorkspaceNotification(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      options?: WorkspaceNotificationListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, workspaceId, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      notificationName: NotificationName,
      options?: WorkspaceNotificationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        notificationName,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      notificationName: NotificationName,
      options?: WorkspaceNotificationGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, workspaceId, notificationName, options),
  };
}

export function _getWorkspaceNotificationOperations(
  context: ApiManagementContext,
): WorkspaceNotificationOperations {
  return {
    ..._getWorkspaceNotification(context),
  };
}
