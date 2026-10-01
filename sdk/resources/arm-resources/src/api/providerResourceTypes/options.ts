// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ProviderResourceTypesListOptionalParams extends OperationOptions {
  /** The $expand query parameter. */
  expand?: string;
}
