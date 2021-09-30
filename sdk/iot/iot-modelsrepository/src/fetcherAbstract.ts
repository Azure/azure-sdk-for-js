// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";

/**
 * Base Interface for Fetchers, which fetch models from endpoints.
 *
 * @internal
 */
export interface Fetcher {
  fetch<T>(path: string, options?: OperationOptions): Promise<T>;
}
