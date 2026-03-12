// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DefaultAccountsSetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DefaultAccountsRemoveOptionalParams extends OperationOptions {
  /** The Id of the scope object, for example if the scope is "Subscription" then it is the ID of that subscription. */
  scope?: string;
}

/** Optional parameters. */
export interface DefaultAccountsGetOptionalParams extends OperationOptions {
  /** The Id of the scope object, for example if the scope is "Subscription" then it is the ID of that subscription. */
  scope?: string;
}
