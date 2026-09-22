// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  backup,
  resumeBackup,
  restore,
  stopBackup,
  listByCloudAccount,
  $delete,
  createOrupdate,
  get,
} from "./operations.js";
export type {
  ProtectionGroupsBackupOptionalParams,
  ProtectionGroupsResumeBackupOptionalParams,
  ProtectionGroupsRestoreOptionalParams,
  ProtectionGroupsStopBackupOptionalParams,
  ProtectionGroupsListByCloudAccountOptionalParams,
  ProtectionGroupsDeleteOptionalParams,
  ProtectionGroupsCreateOrupdateOptionalParams,
  ProtectionGroupsGetOptionalParams,
} from "./options.js";
