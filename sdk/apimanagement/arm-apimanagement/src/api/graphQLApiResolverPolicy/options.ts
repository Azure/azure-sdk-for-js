// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyExportFormat } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface GraphQLApiResolverPolicyListByResolverOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GraphQLApiResolverPolicyDeleteOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GraphQLApiResolverPolicyCreateOrUpdateOptionalParams extends OperationOptions {
  /** ETag of the Entity. Not required when creating an entity, but required when updating an entity. */
  ifMatch?: string;
}

/** Optional parameters. */
export interface GraphQLApiResolverPolicyGetEntityTagOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GraphQLApiResolverPolicyGetOptionalParams extends OperationOptions {
  /** Policy Export Format. */
  format?: PolicyExportFormat;
}
