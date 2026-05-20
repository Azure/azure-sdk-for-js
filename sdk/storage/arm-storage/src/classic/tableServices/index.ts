// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import {
  list,
  setServiceProperties,
  getServiceProperties,
} from "../../api/tableServices/operations.js";
import type {
  TableServicesListOptionalParams,
  TableServicesSetServicePropertiesOptionalParams,
  TableServicesGetServicePropertiesOptionalParams,
} from "../../api/tableServices/options.js";
import type { TableServiceProperties, ListTableServices } from "../../models/models.js";

/** Interface representing a TableServices operations. */
export interface TableServicesOperations {
  /** List all table services for the storage account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: TableServicesListOptionalParams,
  ) => Promise<ListTableServices>;
  /** Sets the properties of a storage account’s Table service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  setServiceProperties: (
    resourceGroupName: string,
    accountName: string,
    parameters: TableServiceProperties,
    options?: TableServicesSetServicePropertiesOptionalParams,
  ) => Promise<TableServiceProperties>;
  /** Gets the properties of a storage account’s Table service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules. */
  getServiceProperties: (
    resourceGroupName: string,
    accountName: string,
    options?: TableServicesGetServicePropertiesOptionalParams,
  ) => Promise<TableServiceProperties>;
}

function _getTableServices(context: StorageManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: TableServicesListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    setServiceProperties: (
      resourceGroupName: string,
      accountName: string,
      parameters: TableServiceProperties,
      options?: TableServicesSetServicePropertiesOptionalParams,
    ) => setServiceProperties(context, resourceGroupName, accountName, parameters, options),
    getServiceProperties: (
      resourceGroupName: string,
      accountName: string,
      options?: TableServicesGetServicePropertiesOptionalParams,
    ) => getServiceProperties(context, resourceGroupName, accountName, options),
  };
}

export function _getTableServicesOperations(
  context: StorageManagementContext,
): TableServicesOperations {
  return {
    ..._getTableServices(context),
  };
}
