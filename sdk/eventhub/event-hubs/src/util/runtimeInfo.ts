// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as os from "os";

/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
export function getRuntimeInfo(): string {
  return `NODE-VERSION ${process.version}; ${os.type()} ${os.release()}`;
}
