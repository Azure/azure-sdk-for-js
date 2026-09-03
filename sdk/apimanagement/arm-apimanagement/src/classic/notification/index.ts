// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService, createOrUpdate, get } from "../../api/notification/operations.js";
import type {
  NotificationListByServiceOptionalParams,
  NotificationCreateOrUpdateOptionalParams,
  NotificationGetOptionalParams,
} from "../../api/notification/options.js";
import type { NotificationContract, NotificationName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Notification operations. */
export interface NotificationOperations {
  /** Lists a collection of properties defined within a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: NotificationListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<NotificationContract>;
  /** Create or Update API Management publisher notification. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    options?: NotificationCreateOrUpdateOptionalParams,
  ) => Promise<NotificationContract>;
  /** Gets the details of the Notification specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    notificationName: NotificationName,
    options?: NotificationGetOptionalParams,
  ) => Promise<NotificationContract>;
}

function _getNotification(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: NotificationListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      notificationName: NotificationName,
      options?: NotificationCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, notificationName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      notificationName: NotificationName,
      options?: NotificationGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, notificationName, options),
  };
}

export function _getNotificationOperations(context: ApiManagementContext): NotificationOperations {
  return {
    ..._getNotification(context),
  };
}
