// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  WorkspaceConnectionPropertiesV2BasicResource,
  WorkspaceConnectionUpdateParameter,
} from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceConnectionsListSecretsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceConnectionsListOptionalParams extends OperationOptions {
  /** Target of the workspace connection. */
  target?: string;
  /** Category of the workspace connection. */
  category?: string;
  /** query parameter that indicates if get connection call should return both connections and datastores */
  includeAll?: boolean;
}

/** Optional parameters. */
export interface WorkspaceConnectionsDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceConnectionsUpdateOptionalParams extends OperationOptions {
  /** Parameters for workspace connection update. */
  body?: WorkspaceConnectionUpdateParameter;
}

/** Optional parameters. */
export interface WorkspaceConnectionsCreateOptionalParams extends OperationOptions {
  /** The object for creating or updating a new workspace connection */
  body?: WorkspaceConnectionPropertiesV2BasicResource;
}

/** Optional parameters. */
export interface WorkspaceConnectionsGetOptionalParams extends OperationOptions {}
