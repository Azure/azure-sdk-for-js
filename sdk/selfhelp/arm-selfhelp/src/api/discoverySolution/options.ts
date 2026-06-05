// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface DiscoverySolutionListOptionalParams extends OperationOptions {
  /** 'ProblemClassificationId' is a mandatory filter to get solutions ids. It also supports optional 'ResourceType' and 'SolutionType' filters. The [$filter](https://learn.microsoft.com/en-us/odata/webapi/first-odata-api#filter) supports only 'and', 'or' and 'eq' operators. Example: $filter=ProblemClassificationId eq '1ddda5b4-cf6c-4d4f-91ad-bc38ab0e811e' */
  filter?: string;
  /** Skiptoken is only used if a previous operation returned a partial result. */
  skiptoken?: string;
}
