// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import util from "util";
import { EOL } from "os";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function log(message: any, ...args: any[]): void {
  process.stderr.write(`${util.format(message, ...args)}${EOL}`);
}
