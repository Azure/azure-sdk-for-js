// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateLinkParameters } from "../../models/securityManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateLinkResourcesListOptionalParams extends OperationOptions {
  params?: PrivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateLinkResourcesGetOptionalParams extends OperationOptions {
  params?: PrivateLinkParameters;
}
