// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  refresh,
  disableComplianceLock,
  enableComplianceLock,
  listByCloudAccount,
  $delete,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  StoragesRefreshOptionalParams,
  StoragesDisableComplianceLockOptionalParams,
  StoragesEnableComplianceLockOptionalParams,
  StoragesListByCloudAccountOptionalParams,
  StoragesDeleteOptionalParams,
  StoragesCreateOrUpdateOptionalParams,
  StoragesGetOptionalParams,
} from "./options.js";
