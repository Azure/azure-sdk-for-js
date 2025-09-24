// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface QuotaRequestStatusListOptionalParams extends OperationOptions {
  /**
   * | Field                    | Supported operators
   * |---------------------|------------------------
   *
   * |requestSubmitTime | ge, le, eq, gt, lt
   * |provisioningState eq {QuotaRequestState}
   * |resourceName eq {resourceName}
   */
  filter?: string;
  /** Number of records to return. */
  top?: number;
  /** The **Skiptoken** parameter is used only if a previous operation returned a partial result. If a previous response contains a **nextLink** element, its value includes a **skiptoken** parameter that specifies a starting point to use for subsequent calls. */
  skiptoken?: string;
}

/** Optional parameters. */
export interface QuotaRequestStatusGetOptionalParams extends OperationOptions {}
