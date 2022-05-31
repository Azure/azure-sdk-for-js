import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  Update,
  DeviceUpdateListUpdatesOptionalParams,
  DeviceUpdateListProvidersOptionalParams,
  DeviceUpdateListNamesOptionalParams,
  DeviceUpdateListVersionsOptionalParams,
  DeviceUpdateListFilesOptionalParams,
  UpdateOperation,
  DeviceUpdateListOperationsOptionalParams,
  ImportUpdateInputItem,
  DeviceUpdateImportUpdateOptionalParams,
  DeviceUpdateImportUpdateResponse,
  DeviceUpdateGetUpdateOptionalParams,
  DeviceUpdateGetUpdateResponse,
  DeviceUpdateDeleteUpdateOptionalParams,
  DeviceUpdateDeleteUpdateResponse,
  DeviceUpdateGetFileOptionalParams,
  DeviceUpdateGetFileResponse,
  DeviceUpdateGetOperationOptionalParams,
  DeviceUpdateGetOperationResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a DeviceUpdate. */
export interface DeviceUpdate {
  /**
   * Get a list of all updates that have been imported to Device Update for IoT Hub.
   * @param options The options parameters.
   */
  listUpdates(
    options?: DeviceUpdateListUpdatesOptionalParams
  ): PagedAsyncIterableIterator<Update>;
  /**
   * Get a list of all update providers that have been imported to Device Update for IoT Hub.
   * @param options The options parameters.
   */
  listProviders(
    options?: DeviceUpdateListProvidersOptionalParams
  ): PagedAsyncIterableIterator<string>;
  /**
   * Get a list of all update names that match the specified provider.
   * @param provider Update provider.
   * @param options The options parameters.
   */
  listNames(
    provider: string,
    options?: DeviceUpdateListNamesOptionalParams
  ): PagedAsyncIterableIterator<string>;
  /**
   * Get a list of all update versions that match the specified provider and name.
   * @param provider Update provider.
   * @param name Update name.
   * @param options The options parameters.
   */
  listVersions(
    provider: string,
    name: string,
    options?: DeviceUpdateListVersionsOptionalParams
  ): PagedAsyncIterableIterator<string>;
  /**
   * Get a list of all update file identifiers for the specified version.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param options The options parameters.
   */
  listFiles(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateListFilesOptionalParams
  ): PagedAsyncIterableIterator<string>;
  /**
   * Get a list of all import update operations. Completed operations are kept for 7 days before
   * auto-deleted. Delete operations are not returned by this API version.
   * @param options The options parameters.
   */
  listOperations(
    options?: DeviceUpdateListOperationsOptionalParams
  ): PagedAsyncIterableIterator<UpdateOperation>;
  /**
   * Import new update version. This is a long-running-operation; use Operation-Location response header
   * value to check for operation status.
   * @param updateToImport The update to be imported.
   * @param options The options parameters.
   */
  beginImportUpdate(
    updateToImport: ImportUpdateInputItem[],
    options?: DeviceUpdateImportUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DeviceUpdateImportUpdateResponse>,
      DeviceUpdateImportUpdateResponse
    >
  >;
  /**
   * Import new update version. This is a long-running-operation; use Operation-Location response header
   * value to check for operation status.
   * @param updateToImport The update to be imported.
   * @param options The options parameters.
   */
  beginImportUpdateAndWait(
    updateToImport: ImportUpdateInputItem[],
    options?: DeviceUpdateImportUpdateOptionalParams
  ): Promise<DeviceUpdateImportUpdateResponse>;
  /**
   * Get a specific update version.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param options The options parameters.
   */
  getUpdate(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateGetUpdateOptionalParams
  ): Promise<DeviceUpdateGetUpdateResponse>;
  /**
   * Delete a specific update version. This is a long-running-operation; use Operation-Location response
   * header value to check for operation status.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param options The options parameters.
   */
  beginDeleteUpdate(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateDeleteUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DeviceUpdateDeleteUpdateResponse>,
      DeviceUpdateDeleteUpdateResponse
    >
  >;
  /**
   * Delete a specific update version. This is a long-running-operation; use Operation-Location response
   * header value to check for operation status.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param options The options parameters.
   */
  beginDeleteUpdateAndWait(
    provider: string,
    name: string,
    version: string,
    options?: DeviceUpdateDeleteUpdateOptionalParams
  ): Promise<DeviceUpdateDeleteUpdateResponse>;
  /**
   * Get a specific update file from the version.
   * @param provider Update provider.
   * @param name Update name.
   * @param version Update version.
   * @param fileId File identifier.
   * @param options The options parameters.
   */
  getFile(
    provider: string,
    name: string,
    version: string,
    fileId: string,
    options?: DeviceUpdateGetFileOptionalParams
  ): Promise<DeviceUpdateGetFileResponse>;
  /**
   * Retrieve operation status.
   * @param operationId Operation identifier.
   * @param options The options parameters.
   */
  getOperation(
    operationId: string,
    options?: DeviceUpdateGetOperationOptionalParams
  ): Promise<DeviceUpdateGetOperationResponse>;
}
