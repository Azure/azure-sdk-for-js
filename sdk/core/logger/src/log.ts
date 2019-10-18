// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import util from "util";
import { EOL } from "os";

export function log(message: any, ...args: any[]) {
  process.stderr.write(`${util.format(message, ...args)}${EOL}`);
}
