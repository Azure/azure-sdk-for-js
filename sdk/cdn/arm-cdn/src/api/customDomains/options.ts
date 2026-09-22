// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CustomDomainHttpsParametersUnion } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CustomDomainsEnableCustomHttpsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** The configuration specifying how to enable HTTPS for the custom domain - using CDN managed certificate or user's own certificate. If not specified, enabling ssl uses CDN managed certificate by default. */
  customDomainHttpsParameters?: CustomDomainHttpsParametersUnion;
}

/** Optional parameters. */
export interface CustomDomainsDisableCustomHttpsOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CustomDomainsListByEndpointOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CustomDomainsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CustomDomainsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CustomDomainsGetOptionalParams extends OperationOptions {}
