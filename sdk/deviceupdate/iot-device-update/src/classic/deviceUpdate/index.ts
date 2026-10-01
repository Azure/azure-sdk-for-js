// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceUpdateContext } from "../../api/deviceUpdateContext.js";
import {
  getOperationStatus,
  listOperationStatuses,
  getFile,
  listFiles,
  listVersions,
  listNames,
  listProviders,
  deleteUpdate,
  getUpdate,
  importUpdate,
  listUpdates,
} from "../../api/deviceUpdate/operations.js";
import {
  DeviceUpdateGetOperationStatusOptionalParams,
  DeviceUpdateListOperationStatusesOptionalParams,
  DeviceUpdateGetFileOptionalParams,
  DeviceUpdateListFilesOptionalParams,
  DeviceUpdateListVersionsOptionalParams,
  DeviceUpdateListNamesOptionalParams,
  DeviceUpdateListProvidersOptionalParams,
  DeviceUpdateDeleteUpdateOptionalParams,
  DeviceUpdateGetUpdateOptionalParams,
  DeviceUpdateImportUpdateOptionalParams,
  DeviceUpdateListUpdatesOptionalParams,
} from "../../api/deviceUpdate/options.js";
import { Update, ImportUpdateInputItem, UpdateOperation, UpdateFile } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeviceUpdate operations. */
export interface DeviceUpdateOperations {
  /** Retrieve operation status. */
  getOperationStatus: (
    operationId: string,
    options?: DeviceUpdateGetOperationStatusOptionalParams,
  ) => Promise<UpdateOperation>;
  /**
   * Get a list of all import update operations. Completed operations are kept for 7
   * days before auto-deleted. Delete operations are not returned by this API
   * version.
   */
  listOperationStatuses: (
    options?: DeviceUpdateListOperationStatusesOptionalParams,
  ) => PagedAsyncIterableIterator<UpdateOperation>;
  /** Get a specific update file from the version. */
  getFile: (
    provider: string,
    name: string,
    version: string,
    fileId: string,
    options?: DeviceUpdateGetFileOptionalParams,
  ) => Promise<UpdateFile>;
  /** Get a list of all update file identifiers for the specified version. */
  listFiles: (
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateListFilesOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /** Get a list of all update versions that match the specified provider and name. */
  listVersions: (
    provider: string,
    name: string,
    options?: DeviceUpdateListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /** Get a list of all update names that match the specified provider. */
  listNames: (
    provider: string,
    options?: DeviceUpdateListNamesOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /**
   * Get a list of all update providers that have been imported to Device Update for
   * IoT Hub.
   */
  listProviders: (
    options?: DeviceUpdateListProvidersOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /**
   * Delete a specific update version. This is a long-running-operation; use
   * Operation-Location response header value to check for operation status.
   */
  deleteUpdate: (
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateDeleteUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a specific update version. */
  getUpdate: (
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateGetUpdateOptionalParams,
  ) => Promise<Update>;
  /**
   * Import new update version. This is a long-running-operation; use
   * Operation-Location response header value to check for operation status.
   */
  importUpdate: (
    updateToImport: ImportUpdateInputItem[],
    options?: DeviceUpdateImportUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a list of all updates that have been imported to Device Update for IoT Hub. */
  listUpdates: (
    options?: DeviceUpdateListUpdatesOptionalParams,
  ) => PagedAsyncIterableIterator<Update>;
}

function _getDeviceUpdate(context: DeviceUpdateContext) {
  return {
    getOperationStatus: (
      operationId: string,
      options?: DeviceUpdateGetOperationStatusOptionalParams,
    ) => getOperationStatus(context, operationId, options),
    listOperationStatuses: (options?: DeviceUpdateListOperationStatusesOptionalParams) =>
      listOperationStatuses(context, options),
    getFile: (
      provider: string,
      name: string,
      version: string,
      fileId: string,
      options?: DeviceUpdateGetFileOptionalParams,
    ) => getFile(context, provider, name, version, fileId, options),
    listFiles: (
      provider: string,
      name: string,
      version: string,
      options?: DeviceUpdateListFilesOptionalParams,
    ) => listFiles(context, provider, name, version, options),
    listVersions: (
      provider: string,
      name: string,
      options?: DeviceUpdateListVersionsOptionalParams,
    ) => listVersions(context, provider, name, options),
    listNames: (provider: string, options?: DeviceUpdateListNamesOptionalParams) =>
      listNames(context, provider, options),
    listProviders: (options?: DeviceUpdateListProvidersOptionalParams) =>
      listProviders(context, options),
    deleteUpdate: (
      provider: string,
      name: string,
      version: string,
      options?: DeviceUpdateDeleteUpdateOptionalParams,
    ) => deleteUpdate(context, provider, name, version, options),
    getUpdate: (
      provider: string,
      name: string,
      version: string,
      options?: DeviceUpdateGetUpdateOptionalParams,
    ) => getUpdate(context, provider, name, version, options),
    importUpdate: (
      updateToImport: ImportUpdateInputItem[],
      options?: DeviceUpdateImportUpdateOptionalParams,
    ) => importUpdate(context, updateToImport, options),
    listUpdates: (options?: DeviceUpdateListUpdatesOptionalParams) => listUpdates(context, options),
  };
}

export function _getDeviceUpdateOperations(context: DeviceUpdateContext): DeviceUpdateOperations {
  return {
    ..._getDeviceUpdate(context),
  };
}
