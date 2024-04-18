// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as os from "node:os";
import * as process from "node:process";

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
export function setPlatformSpecificData(map: Map<string, string>): void {
  const versions = process.versions as ExtendedPlatformVersions;
  if (versions.bun) {
    map.set("Bun", versions.bun);
  } else if (versions.deno) {
    map.set("Deno", versions.deno);
  } else if (versions.node) {
    map.set("Node", versions.node);
  }

  map.set("OS", `(${os.arch()}-${os.type()}-${os.release()})`);
}
