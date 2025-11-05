// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import os from "node:os";
import process from "node:process";

/**
 * @internal
 */
interface ExtendedPlatformVersions extends NodeJS.ProcessVersions {
  bun?: string;
  deno?: string;
}

/**
 * @internal
 */
export function getHeaderName(): string {
  return "User-Agent";
}

/**
 * @internal
 */
export async function setPlatformSpecificData(map: Map<string, string>): Promise<void> {
  if (process && process.versions) {
    const osInfo = `${os.type()} ${os.release()}; ${os.arch()}`;
    const versions = process.versions as ExtendedPlatformVersions;
    if (versions.bun) {
      map.set("Bun", `${versions.bun} (${osInfo})`);
    } else if (versions.deno) {
      map.set("Deno", `${versions.deno} (${osInfo})`);
    } else if (versions.node) {
      map.set("Node", `${versions.node} (${osInfo})`);
    }
  }
}
