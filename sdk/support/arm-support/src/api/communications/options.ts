// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface CommunicationsCheckNameAvailabilityOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface CommunicationsListOptionalParams extends OperationOptions {
  /** The number of values to return in the collection. Default is 10 and max is 10. */
  top?: number;
  /** The filter to apply on the operation. You can filter by communicationType and createdDate properties. CommunicationType supports Equals ('eq') operator and createdDate supports Greater Than ('gt') and Greater Than or Equals ('ge') operators. You may combine the CommunicationType and CreatedDate filters by Logical And ('and') operator. */
  filter?: string;
}

/** Optional parameters. */
export interface CommunicationsCreateOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
}

/** Optional parameters. */
export interface CommunicationsGetOptionalParams extends OperationOptions {}
