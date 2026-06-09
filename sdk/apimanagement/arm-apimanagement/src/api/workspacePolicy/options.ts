// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyExportFormat } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface WorkspacePolicyListByApiOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacePolicyDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacePolicyCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface WorkspacePolicyGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface WorkspacePolicyGetOptionalParams extends OperationOptions {
  /** Policy Export Format. */
  format?: PolicyExportFormat;
}
