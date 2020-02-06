// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as os from "os";

/**
 * Returns information about the platform this function is being run on.
 * @ignore
 * @internal
 */
export function getPlatformInfo(): string {
  return `(${os.arch()}-${os.type()}-${os.release()})`;
}

/**
 * Returns information about Node.js this function is being run on.
 * @ignore
 * @internal
 */
export function getFrameworkInfo(): string {
  return `Node/${process.version}`;
}
