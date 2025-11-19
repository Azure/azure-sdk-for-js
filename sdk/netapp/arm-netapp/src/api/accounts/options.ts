// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EncryptionTransitionRequest, ChangeKeyVault } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccountsChangeKeyVaultOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The required parameters to perform encryption migration. */
  body?: ChangeKeyVault;
}

/** Optional parameters. */
export interface AccountsGetChangeKeyVaultInformationOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsTransitionToCmkOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The required parameters to perform encryption transition. */
  body?: EncryptionTransitionRequest;
}

/** Optional parameters. */
export interface AccountsRenewCredentialsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsCreateOrUpdateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface AccountsGetOptionalParams extends OperationOptions {}
