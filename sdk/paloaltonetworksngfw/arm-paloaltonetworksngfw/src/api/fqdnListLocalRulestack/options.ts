// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface FqdnListLocalRulestackListByLocalRulestacksOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface FqdnListLocalRulestackDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FqdnListLocalRulestackCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface FqdnListLocalRulestackGetOptionalParams extends OperationOptions {}
