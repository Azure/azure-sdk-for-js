// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as os from "os";

export function getUserAgentHeaderName(): string {
  return "User-Agent";
}

export function setPlatformSpecificData(map: Map<string, string>): void {
  map.set("Node", process.version);
  map.set("OS", `(${os.arch()}-${os.type()}-${os.release()})`);
}
