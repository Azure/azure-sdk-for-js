import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  DiskRestorePoint,
  DiskRestorePointOperationsListByRestorePointOptionalParams,
  DiskRestorePointOperationsGetOptionalParams,
  DiskRestorePointOperationsGetResponse,
  GrantAccessData,
  DiskRestorePointOperationsGrantAccessOptionalParams,
  DiskRestorePointOperationsGrantAccessResponse,
  DiskRestorePointOperationsRevokeAccessOptionalParams
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a DiskRestorePointOperations. */
export interface DiskRestorePointOperations {
  /**
   * Lists diskRestorePoints under a vmRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  listByRestorePoint(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    options?: DiskRestorePointOperationsListByRestorePointOptionalParams
  ): PagedAsyncIterableIterator<DiskRestorePoint>;
  /**
   * Get disk restorePoint resource
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskRestorePointName The name of the disk restore point created. Supported characters for the
   *                             name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointOperationsGetOptionalParams
  ): Promise<DiskRestorePointOperationsGetResponse>;
  /**
   * Grants access to a diskRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskRestorePointName The name of the disk restore point created. Supported characters for the
   *                             name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param grantAccessData Access data object supplied in the body of the get disk access operation.
   * @param options The options parameters.
   */
  beginGrantAccess(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointOperationsGrantAccessOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DiskRestorePointOperationsGrantAccessResponse>,
      DiskRestorePointOperationsGrantAccessResponse
    >
  >;
  /**
   * Grants access to a diskRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskRestorePointName The name of the disk restore point created. Supported characters for the
   *                             name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param grantAccessData Access data object supplied in the body of the get disk access operation.
   * @param options The options parameters.
   */
  beginGrantAccessAndWait(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    grantAccessData: GrantAccessData,
    options?: DiskRestorePointOperationsGrantAccessOptionalParams
  ): Promise<DiskRestorePointOperationsGrantAccessResponse>;
  /**
   * Revokes access to a diskRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskRestorePointName The name of the disk restore point created. Supported characters for the
   *                             name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  beginRevokeAccess(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointOperationsRevokeAccessOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * Revokes access to a diskRestorePoint.
   * @param resourceGroupName The name of the resource group.
   * @param restorePointCollectionName The name of the restore point collection that the disk restore
   *                                   point belongs. Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is
   *                                   80 characters.
   * @param vmRestorePointName The name of the vm restore point that the disk disk restore point belongs.
   *                           Supported characters for the name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param diskRestorePointName The name of the disk restore point created. Supported characters for the
   *                             name are a-z, A-Z, 0-9 and _. The maximum name length is 80 characters.
   * @param options The options parameters.
   */
  beginRevokeAccessAndWait(
    resourceGroupName: string,
    restorePointCollectionName: string,
    vmRestorePointName: string,
    diskRestorePointName: string,
    options?: DiskRestorePointOperationsRevokeAccessOptionalParams
  ): Promise<void>;
}
