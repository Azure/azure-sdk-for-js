// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyExportFormat } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProductPolicyListByProductOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductPolicyDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductPolicyCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ProductPolicyGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ProductPolicyGetOptionalParams extends OperationOptions {
  /** Policy Export Format. */
  format?: PolicyExportFormat;
}
