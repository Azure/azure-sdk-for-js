// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EOL } from "node:os";
import util from "node:util";
import process from "node:process";

export function log(message: unknown, ...args: any[]): void {
  process.stderr.write(`${util.format(message, ...args)}${EOL}`);
}
