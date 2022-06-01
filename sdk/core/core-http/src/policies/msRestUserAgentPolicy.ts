// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as os from "os";
import { Constants } from "../util/constants";
import { TelemetryInfo } from "./userAgentPolicy";

export function getDefaultUserAgentKey(): string {
  return Constants.HeaderConstants.USER_AGENT;
}

export function getPlatformSpecificData(): TelemetryInfo[] {
  const runtimeInfo = {
    key: "Node",
    value: process.version,
  };

  const osInfo = {
    key: "OS",
    value: `(${os.arch()}-${os.type()}-${os.release()})`,
  };

  return [runtimeInfo, osInfo];
}
