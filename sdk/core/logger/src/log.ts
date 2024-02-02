// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EOL } from "node:os";
import util from "node:util";

export function log(message: unknown, ...args: any[]): void {
  process.stderr.write(`${util.format(message, ...args)}${EOL}`);
}
