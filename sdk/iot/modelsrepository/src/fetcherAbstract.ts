// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { DTDL } from "./DTDL";

/**
 * @internal
 */
export interface Fetcher {
  fetch(path: string, options?: OperationOptions): Promise<DTDL | DTDL[]>;
}
