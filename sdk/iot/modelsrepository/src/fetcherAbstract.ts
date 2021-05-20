// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { DTDL } from "./dtdl";

/**
 * @internal
 */
export interface Fetcher {
  fetch(path: string, options?: OperationOptions): Promise<DTDL | DTDL[]>;
}
