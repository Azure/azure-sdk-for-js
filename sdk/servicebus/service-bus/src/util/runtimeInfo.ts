// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import os from "node:os";

/**
 * @internal
 */
interface ExtendedPlatformVersions extends NodeJS.ProcessVersions {
  bun?: string;
  deno?: string;
}

/**
 * Returns information about the platform this function is being run on.
 * @hidden
 * @internal
 */
export function getRuntimeInfo(): string {
  if (process && process.versions) {
    const osInfo = `${os.type()} ${os.release()}; ${os.arch()}`;
    const versions = process.versions as ExtendedPlatformVersions;
    if (versions.bun) {
      return `Bun/${versions.bun} (${osInfo})`;
    } else if (versions.deno) {
      return `Deno/${versions.deno} (${osInfo})`;
    } else if (versions.node) {
      return `Node/${versions.node} (${osInfo})`;
    }
  }

  return "";
}
