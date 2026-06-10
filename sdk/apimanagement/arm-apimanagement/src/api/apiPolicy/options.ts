// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyExportFormat } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ApiPolicyListByApiOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiPolicyDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiPolicyCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface ApiPolicyGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ApiPolicyGetOptionalParams extends OperationOptions {
  /** Policy Export Format. */
  format?: PolicyExportFormat;
}
