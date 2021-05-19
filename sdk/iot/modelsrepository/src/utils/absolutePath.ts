// Copyright (c) Microsoft.
// Licensed under the MIT license.

import {isAbsolute} from "path";

export function isLocalPath(p: string): boolean {
  return isAbsolute(p);
}
