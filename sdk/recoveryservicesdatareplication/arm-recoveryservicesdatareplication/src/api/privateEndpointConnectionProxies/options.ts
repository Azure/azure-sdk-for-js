// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateEndpointConnectionProxiesValidateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionProxiesListOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionProxiesDeleteOptionalParams
  extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface PrivateEndpointConnectionProxiesCreateOptionalParams
  extends OperationOptions {}

/** Optional parameters. */
export interface PrivateEndpointConnectionProxiesGetOptionalParams
  extends OperationOptions {}
