// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SoftwareUpdateConfigurationsListOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
  /** The filter to apply on the operation. */
  filter?: string;
}

/** Optional parameters. */
export interface SoftwareUpdateConfigurationsDeleteOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SoftwareUpdateConfigurationsCreateOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface SoftwareUpdateConfigurationsGetByNameOptionalParams extends OperationOptions {
  /** Identifies this specific client request. */
  clientRequestId?: string;
}
