// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyExportFormat } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiOperationPolicyListByOperationOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiOperationPolicyDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiOperationPolicyCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ApiOperationPolicyGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiOperationPolicyGetOptionalParams extends OperationOptions {
  /** Policy Export Format. */
  format?: PolicyExportFormat;
}
