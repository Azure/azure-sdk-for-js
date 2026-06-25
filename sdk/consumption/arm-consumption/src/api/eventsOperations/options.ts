// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EventsOperationsListByBillingAccountOptionalParams extends OperationOptions {
  /** May be used to filter the events by lotId, lotSource etc. The filter supports 'eq', 'lt', 'gt', 'le', 'ge', and 'and'. It does not currently support 'ne', 'or', or 'not'. Tag filter is a key value pair string where key and value is separated by a colon (:). */
  filter?: string;
}

/** Optional parameters. */
export interface EventsOperationsListByBillingProfileOptionalParams extends OperationOptions {}
