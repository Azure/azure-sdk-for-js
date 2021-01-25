// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as os from "os";

/**
 * @ignore @internal
 */
export function getHeaderName(): string {
  return "User-Agent";
}

/**
 * @ignore @internal
 */
export function setPlatformSpecificData(map: Map<string, string>): void {
  map.set("Node", process.version);
  map.set("OS", `(${os.arch()}-${os.type()}-${os.release()})`);
}
