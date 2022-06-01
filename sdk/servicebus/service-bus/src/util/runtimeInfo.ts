// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as os from "os";

/**
 * Returns information about the platform this function is being run on.
 * @hidden
 * @internal
 */
export function getRuntimeInfo(): string {
  const runtimeInfo = {
    key: "Node",
    value: process.version,
  };

  const osInfo = {
    key: "OS",
    value: `(${os.arch()}-${os.type()}-${os.release()})`,
  };

  return `${runtimeInfo.key}/${runtimeInfo.value} ${osInfo.key}/${osInfo.value}`;
}
