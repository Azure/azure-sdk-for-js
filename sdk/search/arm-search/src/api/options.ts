// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface UsageBySubscriptionSkuOptionalParams extends OperationOptions {
  /** A client-generated GUID value that identifies this request. If specified, this will be included in response information as a way to track the request. */
  clientRequestId?: string;
}
