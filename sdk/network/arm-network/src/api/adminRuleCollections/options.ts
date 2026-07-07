// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface AdminRuleCollectionsListOptionalParams extends OperationOptions {
  /** An optional query parameter which specifies the maximum number of records to be returned by the server. */
  top?: number;
  /** SkipToken is only used if a previous operation returned a partial result. If a previous response contains a nextLink element, the value of the nextLink element will include a skipToken parameter that specifies a starting point to use for subsequent calls. */
  skipToken?: string;
}

/** Optional parameters. */
export interface AdminRuleCollectionsDeleteOptionalParams extends OperationOptions {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /** Deletes the resource even if it is part of a deployed configuration. If the configuration has been deployed, the service will do a cleanup deployment in the background, prior to the delete. */
  force?: boolean;
}

/** Optional parameters. */
export interface AdminRuleCollectionsCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface AdminRuleCollectionsGetOptionalParams extends OperationOptions {}
