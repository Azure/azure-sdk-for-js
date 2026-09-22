// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ConnectionPropertiesV2BasicResource,
  ConnectionUpdateContent,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProjectConnectionsListOptionalParams extends OperationOptions {
  /** Target of the connection. */
  target?: string;
  /** Category of the connection. */
  category?: string;
  /** query parameter that indicates if get connection call should return both connections and datastores */
  includeAll?: boolean;
}

/** Optional parameters. */
export interface ProjectConnectionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProjectConnectionsUpdateOptionalParams extends OperationOptions {
  /** Parameters for account connection update. */
  connection?: ConnectionUpdateContent;
}

/** Optional parameters. */
export interface ProjectConnectionsCreateOptionalParams extends OperationOptions {
  /** The object for creating or updating a new account connection */
  connection?: ConnectionPropertiesV2BasicResource;
}

/** Optional parameters. */
export interface ProjectConnectionsGetOptionalParams extends OperationOptions {}
