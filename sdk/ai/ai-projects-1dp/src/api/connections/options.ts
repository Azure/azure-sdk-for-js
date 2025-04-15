// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectionType } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectionsListOptionalParams extends OperationOptions {
  /** List connections of this specific type */
  connectionType?: ConnectionType;
  /** List connections that are default connections */
  defaultConnection?: boolean;
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
export interface ConnectionsGetWithCredentialsOptionalParams
  extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ConnectionsGetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}
