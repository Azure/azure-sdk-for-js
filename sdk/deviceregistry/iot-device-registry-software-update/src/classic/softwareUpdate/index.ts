// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistrySoftwareUpdateContext } from "../../api/deviceRegistrySoftwareUpdateContext.js";
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
} from "../../api/softwareUpdate/operations.js";
import {
  SoftwareUpdateGetOperationStatusOptionalParams,
  SoftwareUpdateListOperationStatusesOptionalParams,
  SoftwareUpdateGetFileOptionalParams,
  SoftwareUpdateListFilesOptionalParams,
  SoftwareUpdateListVersionsOptionalParams,
  SoftwareUpdateListNamesOptionalParams,
  SoftwareUpdateListProvidersOptionalParams,
  SoftwareUpdateDeleteUpdateOptionalParams,
  SoftwareUpdateGetUpdateOptionalParams,
  SoftwareUpdateImportUpdateOptionalParams,
  SoftwareUpdateListUpdatesOptionalParams,
} from "../../api/softwareUpdate/options.js";
import { Update, ImportUpdateRequest, UpdateOperation, UpdateFile } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SoftwareUpdate operations. */
export interface SoftwareUpdateOperations {
  /** Retrieve operation status. */
  getOperationStatus: (
    operationId: string,
    options?: SoftwareUpdateGetOperationStatusOptionalParams,
  ) => Promise<UpdateOperation>;
  /**
   * Get a list of all import update operations. Completed operations are kept for 7
   * days before auto-deleted. Delete operations are not returned by this API
   * version.
   */
  listOperationStatuses: (
    options?: SoftwareUpdateListOperationStatusesOptionalParams,
  ) => PagedAsyncIterableIterator<UpdateOperation>;
  /** Get a specific update file from the version. */
  getFile: (
    provider: string,
    name: string,
    version: string,
    fileId: string,
    options?: SoftwareUpdateGetFileOptionalParams,
  ) => Promise<UpdateFile>;
  /** Get a list of all update file identifiers for the specified version. */
  listFiles: (
    provider: string,
    name: string,
    version: string,
    options?: SoftwareUpdateListFilesOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /** Get a list of all update versions that match the specified provider and name. */
  listVersions: (
    provider: string,
    name: string,
    options?: SoftwareUpdateListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /** Get a list of all update names that match the specified provider. */
  listNames: (
    provider: string,
    options?: SoftwareUpdateListNamesOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /**
   * Get a list of all update providers that have been imported to Software Update for
   * Device Registry.
   */
  listProviders: (
    options?: SoftwareUpdateListProvidersOptionalParams,
  ) => PagedAsyncIterableIterator<string>;
  /**
   * Delete a specific update version. This is a long-running-operation; use
   * Operation-Location response header value to check for operation status.
   */
  deleteUpdate: (
    provider: string,
    name: string,
    version: string,
    options?: SoftwareUpdateDeleteUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a specific update version. */
  getUpdate: (
    provider: string,
    name: string,
    version: string,
    options?: SoftwareUpdateGetUpdateOptionalParams,
  ) => Promise<Update>;
  /**
   * Import new update version. This is a long-running-operation; use
   * Operation-Location response header value to check for operation status.
   */
  importUpdate: (
    importUpdateRequest: ImportUpdateRequest,
    options?: SoftwareUpdateImportUpdateOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /**
   * Get a list of all updates that have been imported to Software Update for Device
   * Registry.
   */
  listUpdates: (
    options?: SoftwareUpdateListUpdatesOptionalParams,
  ) => PagedAsyncIterableIterator<Update>;
}

function _getSoftwareUpdate(context: DeviceRegistrySoftwareUpdateContext) {
  return {
    getOperationStatus: (
      operationId: string,
      options?: SoftwareUpdateGetOperationStatusOptionalParams,
    ) => getOperationStatus(context, operationId, options),
    listOperationStatuses: (options?: SoftwareUpdateListOperationStatusesOptionalParams) =>
      listOperationStatuses(context, options),
    getFile: (
      provider: string,
      name: string,
      version: string,
      fileId: string,
      options?: SoftwareUpdateGetFileOptionalParams,
    ) => getFile(context, provider, name, version, fileId, options),
    listFiles: (
      provider: string,
      name: string,
      version: string,
      options?: SoftwareUpdateListFilesOptionalParams,
    ) => listFiles(context, provider, name, version, options),
    listVersions: (
      provider: string,
      name: string,
      options?: SoftwareUpdateListVersionsOptionalParams,
    ) => listVersions(context, provider, name, options),
    listNames: (provider: string, options?: SoftwareUpdateListNamesOptionalParams) =>
      listNames(context, provider, options),
    listProviders: (options?: SoftwareUpdateListProvidersOptionalParams) =>
      listProviders(context, options),
    deleteUpdate: (
      provider: string,
      name: string,
      version: string,
      options?: SoftwareUpdateDeleteUpdateOptionalParams,
    ) => deleteUpdate(context, provider, name, version, options),
    getUpdate: (
      provider: string,
      name: string,
      version: string,
      options?: SoftwareUpdateGetUpdateOptionalParams,
    ) => getUpdate(context, provider, name, version, options),
    importUpdate: (
      importUpdateRequest: ImportUpdateRequest,
      options?: SoftwareUpdateImportUpdateOptionalParams,
    ) => importUpdate(context, importUpdateRequest, options),
    listUpdates: (options?: SoftwareUpdateListUpdatesOptionalParams) =>
      listUpdates(context, options),
  };
}

export function _getSoftwareUpdateOperations(
  context: DeviceRegistrySoftwareUpdateContext,
): SoftwareUpdateOperations {
  return {
    ..._getSoftwareUpdate(context),
  };
}
