// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityManagementClientprivateLinkParameters } from "../../models/securityManagementClient/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface PrivateLinkResourcesListOptionalParams extends OperationOptions {
  params?: SecurityManagementClientprivateLinkParameters;
}

/** Optional parameters. */
export interface PrivateLinkResourcesGetOptionalParams extends OperationOptions {
  params?: SecurityManagementClientprivateLinkParameters;
}
