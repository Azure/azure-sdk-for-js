// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AppType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceSubscriptionListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceSubscriptionRegenerateSecondaryKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceSubscriptionRegeneratePrimaryKeyOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceSubscriptionListOptionalParams extends OperationOptions {
  /** |     Field     |     Usage     |     Supported operators     |     Supported functions     |</br>|-------------|-------------|-------------|-------------|</br>| name | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| displayName | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| stateComment | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| ownerId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| scope | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| userId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| productId | filter | ge, le, eq, ne, gt, lt | substringof, contains, startswith, endswith |</br>| state | filter | eq |     |</br>| user | expand |     |     |</br> */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** Number of records to skip. */
  skip?: number;
}

/** Optional parameters. */
export interface WorkspaceSubscriptionDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceSubscriptionUpdateOptionalParams extends OperationOptions {
  /**
   * Notify change in Subscription State.
   * - If false, do not send any email notification for change of state of subscription
   * - If true, send email notification of change of state of subscription
   */
  notify?: boolean;
  /** Determines the type of application which send the create user request. Default is legacy publisher portal. */
  appType?: AppType;
}

/** Optional parameters. */
export interface WorkspaceSubscriptionCreateOrUpdateOptionalParams extends OperationOptions {
  /**
   * Notify change in Subscription State.
   * - If false, do not send any email notification for change of state of subscription
   * - If true, send email notification of change of state of subscription
   */
  notify?: boolean;
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
  /** Determines the type of application which send the create user request. Default is legacy publisher portal. */
  appType?: AppType;
}

/** Optional parameters. */
export interface WorkspaceSubscriptionGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceSubscriptionGetOptionalParams extends OperationOptions {}
