// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SentinelOnboardingState } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SentinelOnboardingStatesListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SentinelOnboardingStatesDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface SentinelOnboardingStatesCreateOptionalParams extends OperationOptions {
  /** The Sentinel onboarding state parameter */
  sentinelOnboardingStateParameter?: SentinelOnboardingState;
}

/** Optional parameters. */
export interface SentinelOnboardingStatesGetOptionalParams extends OperationOptions {}
