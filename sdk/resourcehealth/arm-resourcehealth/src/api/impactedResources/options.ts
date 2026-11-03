// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For more information please see https://docs.microsoft.com/en-us/rest/api/apimanagement/apis?redirectedfrom=MSDN */
  filter?: string;
}

/** Optional parameters. */
export interface ImpactedResourcesGetOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ImpactedResourcesListByTenantIdAndEventIdOptionalParams extends OperationOptions {
  /** The filter to apply on the operation. For more information please see https://docs.microsoft.com/en-us/rest/api/apimanagement/apis?redirectedfrom=MSDN */
  filter?: string;
}

/** Optional parameters. */
export interface ImpactedResourcesGetByTenantIdOptionalParams extends OperationOptions {}
