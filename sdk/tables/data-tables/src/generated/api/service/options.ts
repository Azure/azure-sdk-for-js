// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServiceGetStatisticsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
}

/** Optional parameters. */
export interface ServiceGetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
}

/** Optional parameters. */
export interface ServiceSetPropertiesOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
  /** The timeout parameter is expressed in seconds. */
  timeout?: number;
}
