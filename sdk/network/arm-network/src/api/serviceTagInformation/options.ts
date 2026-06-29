// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ServiceTagInformationListOptionalParams extends OperationOptions {
  /** Do not return address prefixes for the tag(s). */
  noAddressPrefixes?: boolean;
  /** Return tag information for a particular tag. */
  tagName?: string;
}
