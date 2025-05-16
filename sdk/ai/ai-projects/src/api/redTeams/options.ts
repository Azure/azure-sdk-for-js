// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface RedTeamsCreateRunOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface RedTeamsListOptionalParams extends OperationOptions {
  /** The number of result items to return. */
  top?: number;
  /** The number of result items to skip. */
  skip?: number;
  /** The maximum number of result items per page. */
  maxpagesize?: number;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface RedTeamsGetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
