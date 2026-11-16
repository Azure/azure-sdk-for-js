// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface InvestigationsUpdateDiscoveryEngineOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface InvestigationsStopDiscoveryEngineOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface InvestigationsStartDiscoveryEngineOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface InvestigationsGetDiscoveryEngineMemoryOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}
/** Optional parameters. */
export interface InvestigationsGetDiscoveryEngineOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface InvestigationsListOptionalParams extends OperationOptions {
  /** The oldest creation timestamp to keep */
  createdSince?: Date;
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
}
/** Optional parameters. */
export interface InvestigationsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}
/** Optional parameters. */
export interface InvestigationsUpdateOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface InvestigationsCreateOrReplaceOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface InvestigationsGetOperationStatusOptionalParams extends OperationOptions {}
/** Optional parameters. */
export interface InvestigationsGetOptionalParams extends OperationOptions {}
