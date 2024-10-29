// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationOptions } from "@azure/core-client";
import { DTDL } from "./psuedoDtdl";

/**
 * Base Interface for Fetchers, which fetch models from endpoints.
 *
 * @internal
 */
export interface Fetcher {
  fetch(path: string, options?: OperationOptions): Promise<DTDL | DTDL[]>;
}
