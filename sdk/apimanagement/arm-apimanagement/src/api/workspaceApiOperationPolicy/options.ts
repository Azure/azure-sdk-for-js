// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyExportFormat } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceApiOperationPolicyListByOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiOperationPolicyDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiOperationPolicyCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceApiOperationPolicyGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceApiOperationPolicyGetOptionalParams extends OperationOptions {
  /** Policy Export Format. */
  format?: PolicyExportFormat;
}
