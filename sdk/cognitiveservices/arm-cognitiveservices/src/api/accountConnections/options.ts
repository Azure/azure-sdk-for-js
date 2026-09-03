// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ConnectionPropertiesV2BasicResource,
  ConnectionUpdateContent,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AccountConnectionsListOptionalParams extends OperationOptions {
  /** Target of the connection. */
  target?: string;
  /** Category of the connection. */
  category?: string;
  /** query parameter that indicates if get connection call should return both connections and datastores */
  includeAll?: boolean;
}

/** Optional parameters. */
export interface AccountConnectionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AccountConnectionsUpdateOptionalParams extends OperationOptions {
  /** Parameters for account connection update. */
  connection?: ConnectionUpdateContent;
}

/** Optional parameters. */
export interface AccountConnectionsCreateOptionalParams extends OperationOptions {
  /** The object for creating or updating a new account connection */
  connection?: ConnectionPropertiesV2BasicResource;
}

/** Optional parameters. */
export interface AccountConnectionsGetOptionalParams extends OperationOptions {}
