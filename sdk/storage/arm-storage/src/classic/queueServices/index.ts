// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  list,
  setServiceProperties,
  getServiceProperties,
} from "../../api/queueServices/operations.js";
import type {
  QueueServicesListOptionalParams,
  QueueServicesSetServicePropertiesOptionalParams,
  QueueServicesGetServicePropertiesOptionalParams,
} from "../../api/queueServices/options.js";
import type { QueueServiceProperties, ListQueueServices } from "../../models/models.js";

/** Interface representing a QueueServices operations. */
export interface QueueServicesOperations {
  /** List all queue services for the storage account */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: QueueServicesListOptionalParams,
  ) => Promise<ListQueueServices>;
  /** Sets the properties of a storage account’s Queue service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  setServiceProperties: (
    resourceGroupName: string,
    accountName: string,
    parameters: QueueServiceProperties,
    options?: QueueServicesSetServicePropertiesOptionalParams,
  ) => Promise<QueueServiceProperties>;
  /** Gets the properties of a storage account’s Queue service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  getServiceProperties: (
    resourceGroupName: string,
    accountName: string,
    options?: QueueServicesGetServicePropertiesOptionalParams,
  ) => Promise<QueueServiceProperties>;
}

function _getQueueServices(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: QueueServicesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    setServiceProperties: (
      resourceGroupName: string,
      accountName: string,
      parameters: QueueServiceProperties,
      options?: QueueServicesSetServicePropertiesOptionalParams,
    ) => setServiceProperties(context, resourceGroupName, accountName, parameters, options),
    getServiceProperties: (
      resourceGroupName: string,
      accountName: string,
      options?: QueueServicesGetServicePropertiesOptionalParams,
    ) => getServiceProperties(context, resourceGroupName, accountName, options),
  };
}

export function _getQueueServicesOperations(
  context: StorageManagementContext,
): QueueServicesOperations {
  return {
    ..._getQueueServices(context),
  };
}
