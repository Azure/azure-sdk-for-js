// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as os from "os";

/**
 * Returns information about the platform this function is being run on.
 * @ignore
 * @internal
 */
export function getRuntimeInfo(): string {
  return `NODE-VERSION ${process.version}; ${os.type()} ${os.release()}`;
}
