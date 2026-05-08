// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  list,
  setServiceProperties,
  getServiceProperties,
} from "../../api/blobServices/operations.js";
import {
  BlobServicesListOptionalParams,
  BlobServicesSetServicePropertiesOptionalParams,
  BlobServicesGetServicePropertiesOptionalParams,
} from "../../api/blobServices/options.js";
import { BlobServiceProperties } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a BlobServices operations. */
export interface BlobServicesOperations {
  /** List blob services of storage account. It returns a collection of one object named default. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: BlobServicesListOptionalParams,
  ) => PagedAsyncIterableIterator<BlobServiceProperties>;
  /** Sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  setServiceProperties: (
    resourceGroupName: string,
    accountName: string,
    parameters: BlobServiceProperties,
    options?: BlobServicesSetServicePropertiesOptionalParams,
  ) => Promise<BlobServiceProperties>;
  /** Gets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  getServiceProperties: (
    resourceGroupName: string,
    accountName: string,
    options?: BlobServicesGetServicePropertiesOptionalParams,
  ) => Promise<BlobServiceProperties>;
}

function _getBlobServices(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: BlobServicesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    setServiceProperties: (
      resourceGroupName: string,
      accountName: string,
      parameters: BlobServiceProperties,
      options?: BlobServicesSetServicePropertiesOptionalParams,
    ) => setServiceProperties(context, resourceGroupName, accountName, parameters, options),
    getServiceProperties: (
      resourceGroupName: string,
      accountName: string,
      options?: BlobServicesGetServicePropertiesOptionalParams,
    ) => getServiceProperties(context, resourceGroupName, accountName, options),
  };
}

export function _getBlobServicesOperations(
  context: StorageManagementContext,
): BlobServicesOperations {
  return {
    ..._getBlobServices(context),
  };
}
