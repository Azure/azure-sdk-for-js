// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ReceivedRoutesListByPeeringOptionalParams extends OperationOptions {
  /** The optional prefix that can be used to filter the routes. */
  prefix?: string;
  /** The optional AS path that can be used to filter the routes. */
  asPath?: string;
  /** The optional origin AS validation state that can be used to filter the routes. */
  originAsValidationState?: string;
  /** The optional RPKI validation state that can be used to filter the routes. */
  rpkiValidationState?: string;
  /** The optional page continuation token that is used in the event of paginated result. */
  skipToken?: string;
}
