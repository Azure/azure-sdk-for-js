// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyExportFormat } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceApiPolicyListByApiOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiPolicyDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiPolicyCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceApiPolicyGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiPolicyGetOptionalParams extends OperationOptions {
  /** Policy Export Format. */
  format?: PolicyExportFormat;
}
