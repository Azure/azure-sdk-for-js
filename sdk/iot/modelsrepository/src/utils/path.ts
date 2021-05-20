// Copyright (c) Microsoft.
// Licensed under the MIT license.

import {isAbsolute, normalize} from "path";

function isLocalPath(p: string): boolean {
  return isAbsolute(p);
}

export { normalize, isLocalPath }
