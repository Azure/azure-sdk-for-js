// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { isAbsolute, normalize } from "node:path";

function isLocalPath(p: string): boolean {
  return isAbsolute(p);
}

export { normalize, isLocalPath };
