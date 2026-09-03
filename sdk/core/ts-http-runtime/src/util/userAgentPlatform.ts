// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import os from "node:os";
import process from "node:process";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessVersions {
      bun?: string;
      deno?: string;
    }
  }
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
    if (process.versions.bun) {
      map.set("Bun", `${process.versions.bun} (${osInfo})`);
    } else if (process.versions.deno) {
      map.set("Deno", `${process.versions.deno} (${osInfo})`);
    } else if (process.versions.node) {
      map.set("Node", `${process.versions.node} (${osInfo})`);
    }
  }
}
