// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface SkusListByOfferOptionalParams extends OperationOptions {
  /** Specify $expand=content,contentVersion to populate additional fields related to the marketplace offer. */
  expand?: string;
}

/** Optional parameters. */
export interface SkusGetOptionalParams extends OperationOptions {
  /** Specify $expand=content,contentVersion to populate additional fields related to the marketplace offer. */
  expand?: string;
}
