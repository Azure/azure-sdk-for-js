// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AgreementsListByBillingAccountOptionalParams extends OperationOptions {
  /** May be used to expand the participants. */
  expand?: string;
}

/** Optional parameters. */
export interface AgreementsGetOptionalParams extends OperationOptions {}
