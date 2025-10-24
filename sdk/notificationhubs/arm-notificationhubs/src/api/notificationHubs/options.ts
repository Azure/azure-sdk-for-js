// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface NotificationHubsRegenerateKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsListKeysOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsListAuthorizationRulesOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsDeleteAuthorizationRuleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsCreateOrUpdateAuthorizationRuleOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsGetAuthorizationRuleOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsCheckNotificationHubAvailabilityOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsGetPnsCredentialsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsDebugSendOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsListOptionalParams extends OperationOptions {
  /** Continuation token. */
  skipToken?: string;
  /** Page size. */
  top?: number;
}

/** Optional parameters. */
export interface NotificationHubsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface NotificationHubsGetOptionalParams extends OperationOptions {}
