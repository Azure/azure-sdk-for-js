// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as os from "os";

/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
export function getPlatformInfo(): string {
  return `(${os.arch()}-${os.type()}-${os.release()})`;
}

/**
 * Returns information about Node.js this function is being run on.
 * @internal
 */
export function getFrameworkInfo(): string {
  return `Node/${process.version}`;
}
