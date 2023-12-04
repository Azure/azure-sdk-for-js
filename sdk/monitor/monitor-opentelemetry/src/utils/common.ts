// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import * as http from "http";

export function ignoreOutgoingRequestHook(request: http.RequestOptions): boolean {
  if (request && request.headers) {
    if (
      (request.headers["User-Agent"] &&
        request.headers["User-Agent"]
          .toString()
          .indexOf("azsdk-js-monitor-opentelemetry-exporter") > -1) ||
      (request.headers["user-agent"] &&
        request.headers["user-agent"]
          .toString()
          .indexOf("azsdk-js-monitor-opentelemetry-exporter") > -1)
    ) {
      return true;
    }
  }
  return false;
}

export const isWindows = (): boolean => {
  return  process.platform === "win32";
}

export const isLinux = (): boolean => {
  return  process.platform === "linux";
}

/**
* Get prefix for OS
* Windows system: "w"
* Linux system: "l"
* non-Windows and non-Linux system: "u" (unknown)
*/
export const getOsPrefix = (): string => {
  return isWindows()? "w" : isLinux()? "l" : "u";
}

/**
* Get prefix resource provider, vm will considered as "unknown RP"
* Web App: "a"
* Function App: "f"
* VM: "v"
* non-Web and non-Function APP: "u" (unknown)
*/
export const getResourceProvider = (resource: Resource): string => {
  if (resource.attributes[SemanticResourceAttributes.CLOUD_PLATFORM] === "azure_app_service") {
    return "a";
  }
  if (resource.attributes[SemanticResourceAttributes.CLOUD_PLATFORM] === "azure_functions") {
    return "f";
  }
  if (resource.attributes[SemanticResourceAttributes.CLOUD_PLATFORM] === "azure_vm") {
    return "v";
  }
  else {
    return "u";
  }
}
