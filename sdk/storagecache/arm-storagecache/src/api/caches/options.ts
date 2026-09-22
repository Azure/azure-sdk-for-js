// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  Cache,
  PrimingJob,
  StorageTargetSpaceAllocation,
  PrimingJobIdParameter,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CachesSpaceAllocationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** List containing storage target cache space percentage allocations. */
  spaceAllocationParameter?: StorageTargetSpaceAllocation[];
}

/** Optional parameters. */
export interface CachesUpgradeFirmwareOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CachesResumePrimingJobOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Object containing the priming job ID. */
  primingJobId?: PrimingJobIdParameter;
}

/** Optional parameters. */
export interface CachesPausePrimingJobOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Object containing the priming job ID. */
  primingJobId?: PrimingJobIdParameter;
}

/** Optional parameters. */
export interface CachesStopPrimingJobOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Object containing the priming job ID. */
  primingJobId?: PrimingJobIdParameter;
}

/** Optional parameters. */
export interface CachesStartPrimingJobOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Object containing the definition of a priming job. */
  primingjob?: PrimingJob;
}

/** Optional parameters. */
export interface CachesStopOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CachesStartOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CachesFlushOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CachesDebugInfoOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CachesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CachesListByResourceGroupOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CachesDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CachesUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Object containing the user-selectable properties of the cache. If read-only properties are included, they must match the existing values of those properties. */
  cache?: Cache;
}

/** Optional parameters. */
export interface CachesCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CachesGetOptionalParams extends OperationOptions {}
