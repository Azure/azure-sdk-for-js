// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateLinkParameters } from "../../models/securityManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateLinksListBySubscriptionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinksListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PrivateLinksDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  params?: PrivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateLinksUpdateOptionalParams extends OperationOptions {
  params?: PrivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateLinksCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  params?: PrivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateLinksHeadOptionalParams extends OperationOptions {
  params?: PrivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateLinksGetOptionalParams extends OperationOptions {
  params?: PrivateLinkParameters;
}
