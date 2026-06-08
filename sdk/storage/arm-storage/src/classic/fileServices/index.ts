// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  listServiceUsages,
  getServiceUsage,
  list,
  setServiceProperties,
  getServiceProperties,
} from "../../api/fileServices/operations.js";
import type {
  FileServicesListServiceUsagesOptionalParams,
  FileServicesGetServiceUsageOptionalParams,
  FileServicesListOptionalParams,
  FileServicesSetServicePropertiesOptionalParams,
  FileServicesGetServicePropertiesOptionalParams,
} from "../../api/fileServices/options.js";
import type {
  FileServiceProperties,
  FileServiceItems,
  FileServiceUsage,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FileServices operations. */
export interface FileServicesOperations {
  /** Gets the usages of file service in storage account. */
  listServiceUsages: (
    resourceGroupName: string,
    accountName: string,
    options?: FileServicesListServiceUsagesOptionalParams,
  ) => PagedAsyncIterableIterator<FileServiceUsage>;
  /** Gets the usage of file service in storage account including account limits, file share limits and constants used in recommendations and bursting formula. */
  getServiceUsage: (
    resourceGroupName: string,
    accountName: string,
    options?: FileServicesGetServiceUsageOptionalParams,
  ) => Promise<FileServiceUsage>;
  /** List all file services in storage accounts */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: FileServicesListOptionalParams,
  ) => Promise<FileServiceItems>;
  /** Sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules. */
  setServiceProperties: (
    resourceGroupName: string,
    accountName: string,
    parameters: FileServiceProperties,
    options?: FileServicesSetServicePropertiesOptionalParams,
  ) => Promise<FileServiceProperties>;
  /** Gets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules. */
  getServiceProperties: (
    resourceGroupName: string,
    accountName: string,
    options?: FileServicesGetServicePropertiesOptionalParams,
  ) => Promise<FileServiceProperties>;
}

function _getFileServices(context: StorageManagementContext) {
  return {
    listServiceUsages: (
      resourceGroupName: string,
      accountName: string,
      options?: FileServicesListServiceUsagesOptionalParams,
    ) => listServiceUsages(context, resourceGroupName, accountName, options),
    getServiceUsage: (
      resourceGroupName: string,
      accountName: string,
      options?: FileServicesGetServiceUsageOptionalParams,
    ) => getServiceUsage(context, resourceGroupName, accountName, options),
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: FileServicesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    setServiceProperties: (
      resourceGroupName: string,
      accountName: string,
      parameters: FileServiceProperties,
      options?: FileServicesSetServicePropertiesOptionalParams,
    ) => setServiceProperties(context, resourceGroupName, accountName, parameters, options),
    getServiceProperties: (
      resourceGroupName: string,
      accountName: string,
      options?: FileServicesGetServicePropertiesOptionalParams,
    ) => getServiceProperties(context, resourceGroupName, accountName, options),
  };
}

export function _getFileServicesOperations(
  context: StorageManagementContext,
): FileServicesOperations {
  return {
    ..._getFileServices(context),
  };
}
