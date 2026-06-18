// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface OffersListByClusterOptionalParams extends OperationOptions {
  /** Specify $expand=content,contentVersion to populate additional fields related to the marketplace offer. */
  expand?: string;
}

/** Optional parameters. */
export interface OffersListByPublisherOptionalParams extends OperationOptions {
  /** Specify $expand=content,contentVersion to populate additional fields related to the marketplace offer. */
  expand?: string;
}

/** Optional parameters. */
export interface OffersGetOptionalParams extends OperationOptions {
  /** Specify $expand=content,contentVersion to populate additional fields related to the marketplace offer. */
  expand?: string;
}
