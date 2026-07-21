// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyExportFormat } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PolicyListByServiceOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface PolicyGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface PolicyGetOptionalParams extends OperationOptions {
  /** Policy Export Format. */
  format?: PolicyExportFormat;
}
