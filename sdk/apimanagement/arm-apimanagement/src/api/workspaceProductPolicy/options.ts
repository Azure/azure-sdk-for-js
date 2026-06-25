// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyExportFormat } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspaceProductPolicyListByProductOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceProductPolicyDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceProductPolicyCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspaceProductPolicyGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspaceProductPolicyGetOptionalParams extends OperationOptions {
  /** Policy Export Format. */
  format?: PolicyExportFormat;
}
