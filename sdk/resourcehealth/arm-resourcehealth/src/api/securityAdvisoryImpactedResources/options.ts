// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For more information please see https://docs.microsoft.com/en-us/rest/api/apimanagement/apis?redirectedfrom=MSDN */
  filter?: string;
}

/** Optional parameters. */
export interface SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For more information please see https://docs.microsoft.com/en-us/rest/api/apimanagement/apis?redirectedfrom=MSDN */
  filter?: string;
}
