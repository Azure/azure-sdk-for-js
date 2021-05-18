// Copyright (c) Microsoft.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { DTDL } from "./internal";

export abstract class Fetcher {
  abstract fetch(path: string, options?: OperationOptions): Promise<DTDL | DTDL[]>;
}
