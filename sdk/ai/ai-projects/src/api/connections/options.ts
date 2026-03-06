// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConnectionType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ConnectionsListOptionalParams extends OperationOptions {
  /** List connections of this specific type */
  connectionType?: ConnectionType;
  /** List connections that are default connections */
  defaultConnection?: boolean;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ConnectionsGetWithCredentialsOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface ConnectionsGetOptionalParams extends OperationOptions {
  /** Whether to include credentials in the response. Default is false. */
  includeCredentials?: boolean;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters for getDefault. */
export interface ConnectionsGetDefaultOptionalParams extends OperationOptions {
  /** Whether to include credentials in the response. Default is false. */
  includeCredentials?: boolean;
}
