// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FailoverProperties } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DisasterRecoveryConfigsFailOverOptionalParams extends OperationOptions {
  /** Parameters required to create an Alias(Disaster Recovery configuration) */
  parameters?: FailoverProperties;
}

/** Optional parameters. */
export interface DisasterRecoveryConfigsBreakPairingOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisasterRecoveryConfigsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisasterRecoveryConfigsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisasterRecoveryConfigsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisasterRecoveryConfigsGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisasterRecoveryConfigsCheckNameAvailabilityOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DisasterRecoveryConfigsListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DisasterRecoveryConfigsListAuthorizationRulesOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface DisasterRecoveryConfigsGetAuthorizationRuleOptionalParams
  extends OperationOptions {}
