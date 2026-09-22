// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  spaceAllocation,
  upgradeFirmware,
  resumePrimingJob,
  pausePrimingJob,
  stopPrimingJob,
  startPrimingJob,
  stop,
  start,
  flush,
  debugInfo,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "./operations.js";
export type {
  CachesSpaceAllocationOptionalParams,
  CachesUpgradeFirmwareOptionalParams,
  CachesResumePrimingJobOptionalParams,
  CachesPausePrimingJobOptionalParams,
  CachesStopPrimingJobOptionalParams,
  CachesStartPrimingJobOptionalParams,
  CachesStopOptionalParams,
  CachesStartOptionalParams,
  CachesFlushOptionalParams,
  CachesDebugInfoOptionalParams,
  CachesListOptionalParams,
  CachesListByResourceGroupOptionalParams,
  CachesDeleteOptionalParams,
  CachesUpdateOptionalParams,
  CachesCreateOrUpdateOptionalParams,
  CachesGetOptionalParams,
} from "./options.js";
