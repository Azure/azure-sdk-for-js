// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CrossTenantVaultMappingRemoveRequest } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DppCrossTenantVaultMappingsRemoveOptionalParams extends OperationOptions {
  /** The content of the action request */
  body?: CrossTenantVaultMappingRemoveRequest;
}

/** Optional parameters. */
export interface DppCrossTenantVaultMappingsListOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DppCrossTenantVaultMappingsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DppCrossTenantVaultMappingsGetOptionalParams extends OperationOptions {}
