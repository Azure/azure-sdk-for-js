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
import type { SettingName } from "../../models/common/models.js";
import type {
  DefenderForStorageSetting,
  MalwareScan,
} from "../../models/defenderForStorageAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DefenderForStorage operations. */
export interface DefenderForStorageOperations {
  /** Gets the Defender for Storage malware scan for the specified storage resource. */
  getMalwareScan: (
    resourceId: string,
    settingName: SettingName,
    scanId: string,
    options?: DefenderForStorageGetMalwareScanOptionalParams,
  ) => Promise<MalwareScan>;
  /** Cancels a Defender for Storage malware scan for the specified storage account. */
  cancelMalwareScan: (
    resourceId: string,
    settingName: SettingName,
    scanId: string,
    options?: DefenderForStorageCancelMalwareScanOptionalParams,
  ) => Promise<MalwareScan>;
  /** Initiate a Defender for Storage malware scan for the specified storage account. Blobs and Files will be scanned for malware. */
  startMalwareScan: (
    resourceId: string,
    settingName: SettingName,
    options?: DefenderForStorageStartMalwareScanOptionalParams,
  ) => Promise<MalwareScan>;
  /** Lists the Defender for Storage settings for the specified storage account. */
  list: (
    resourceId: string,
    options?: DefenderForStorageListOptionalParams,
  ) => PagedAsyncIterableIterator<DefenderForStorageSetting>;
  /** Creates or updates the Defender for Storage settings on a specified storage account. */
  create: (
    resourceId: string,
    settingName: SettingName,
    defenderForStorageSetting: DefenderForStorageSetting,
    options?: DefenderForStorageCreateOptionalParams,
  ) => Promise<DefenderForStorageSetting>;
  /** Gets the Defender for Storage settings for the specified storage account. */
  get: (
    resourceId: string,
    settingName: SettingName,
    options?: DefenderForStorageGetOptionalParams,
  ) => Promise<DefenderForStorageSetting>;
}

function _getDefenderForStorage(context: SecurityCenterContext) {
  return {
    getMalwareScan: (
      resourceId: string,
      settingName: SettingName,
      scanId: string,
      options?: DefenderForStorageGetMalwareScanOptionalParams,
    ) => getMalwareScan(context, resourceId, settingName, scanId, options),
    cancelMalwareScan: (
      resourceId: string,
      settingName: SettingName,
      scanId: string,
      options?: DefenderForStorageCancelMalwareScanOptionalParams,
    ) => cancelMalwareScan(context, resourceId, settingName, scanId, options),
    startMalwareScan: (
      resourceId: string,
      settingName: SettingName,
      options?: DefenderForStorageStartMalwareScanOptionalParams,
    ) => startMalwareScan(context, resourceId, settingName, options),
    list: (resourceId: string, options?: DefenderForStorageListOptionalParams) =>
      list(context, resourceId, options),
    create: (
      resourceId: string,
      settingName: SettingName,
      defenderForStorageSetting: DefenderForStorageSetting,
      options?: DefenderForStorageCreateOptionalParams,
    ) => create(context, resourceId, settingName, defenderForStorageSetting, options),
    get: (
      resourceId: string,
      settingName: SettingName,
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
