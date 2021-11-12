// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DTDL } from "./psuedoDtdl";
import { OperationOptions } from "@azure/core-client";

/**
 * Base Interface for Fetchers, which fetch models from endpoints.
 *
 * @internal
 */
export interface Fetcher {
  fetch(path: string, options?: OperationOptions): Promise<DTDL | DTDL[]>;
}
