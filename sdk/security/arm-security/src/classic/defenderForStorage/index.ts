// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  getMalwareScan,
  cancelMalwareScan,
  startMalwareScan,
  list,
  create,
  get,
} from "../../api/defenderForStorage/operations.js";
import type {
  DefenderForStorageGetMalwareScanOptionalParams,
  DefenderForStorageCancelMalwareScanOptionalParams,
  DefenderForStorageStartMalwareScanOptionalParams,
  DefenderForStorageListOptionalParams,
  DefenderForStorageCreateOptionalParams,
  DefenderForStorageGetOptionalParams,
} from "../../api/defenderForStorage/options.js";
import type { CommonSettingName } from "../../models/common/models.js";
import type {
  DefenderForStorageAPIDefenderForStorageSetting,
  DefenderForStorageAPIMalwareScan,
} from "../../models/defenderForStorageAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DefenderForStorage operations. */
export interface DefenderForStorageOperations {
  /** Gets the Defender for Storage malware scan for the specified storage resource. */
  getMalwareScan: (
    resourceId: string,
    settingName: CommonSettingName,
    scanId: string,
    options?: DefenderForStorageGetMalwareScanOptionalParams,
  ) => Promise<DefenderForStorageAPIMalwareScan>;
  /** Cancels a Defender for Storage malware scan for the specified storage account. */
  cancelMalwareScan: (
    resourceId: string,
    settingName: CommonSettingName,
    scanId: string,
    options?: DefenderForStorageCancelMalwareScanOptionalParams,
  ) => Promise<DefenderForStorageAPIMalwareScan>;
  /** Initiate a Defender for Storage malware scan for the specified storage account. Blobs and Files will be scanned for malware. */
  startMalwareScan: (
    resourceId: string,
    settingName: CommonSettingName,
    options?: DefenderForStorageStartMalwareScanOptionalParams,
  ) => Promise<DefenderForStorageAPIMalwareScan>;
  /** Lists the Defender for Storage settings for the specified storage account. */
  list: (
    resourceId: string,
    options?: DefenderForStorageListOptionalParams,
  ) => PagedAsyncIterableIterator<DefenderForStorageAPIDefenderForStorageSetting>;
  /** Creates or updates the Defender for Storage settings on a specified storage account. */
  create: (
    resourceId: string,
    settingName: CommonSettingName,
    defenderForStorageSetting: DefenderForStorageAPIDefenderForStorageSetting,
    options?: DefenderForStorageCreateOptionalParams,
  ) => Promise<DefenderForStorageAPIDefenderForStorageSetting>;
  /** Gets the Defender for Storage settings for the specified storage account. */
  get: (
    resourceId: string,
    settingName: CommonSettingName,
    options?: DefenderForStorageGetOptionalParams,
  ) => Promise<DefenderForStorageAPIDefenderForStorageSetting>;
}

function _getDefenderForStorage(context: SecurityCenterContext) {
  return {
    getMalwareScan: (
      resourceId: string,
      settingName: CommonSettingName,
      scanId: string,
      options?: DefenderForStorageGetMalwareScanOptionalParams,
    ) => getMalwareScan(context, resourceId, settingName, scanId, options),
    cancelMalwareScan: (
      resourceId: string,
      settingName: CommonSettingName,
      scanId: string,
      options?: DefenderForStorageCancelMalwareScanOptionalParams,
    ) => cancelMalwareScan(context, resourceId, settingName, scanId, options),
    startMalwareScan: (
      resourceId: string,
      settingName: CommonSettingName,
      options?: DefenderForStorageStartMalwareScanOptionalParams,
    ) => startMalwareScan(context, resourceId, settingName, options),
    list: (resourceId: string, options?: DefenderForStorageListOptionalParams) =>
      list(context, resourceId, options),
    create: (
      resourceId: string,
      settingName: CommonSettingName,
      defenderForStorageSetting: DefenderForStorageAPIDefenderForStorageSetting,
      options?: DefenderForStorageCreateOptionalParams,
    ) => create(context, resourceId, settingName, defenderForStorageSetting, options),
    get: (
      resourceId: string,
      settingName: CommonSettingName,
      options?: DefenderForStorageGetOptionalParams,
    ) => get(context, resourceId, settingName, options),
  };
}

export function _getDefenderForStorageOperations(
  context: SecurityCenterContext,
): DefenderForStorageOperations {
  return {
    ..._getDefenderForStorage(context),
  };
}
