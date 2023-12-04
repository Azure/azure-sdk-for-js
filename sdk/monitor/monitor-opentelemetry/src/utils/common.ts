// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

export const isWebApp = (): boolean => {
  return process.env.WEBSITE_SITE_NAME? true : false;
}

export const isFunctionApp = (): boolean => {
  return process.env.FUNCTIONS_WORKER_RUNTIME? true : false;
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

// TODO: Replace with Resource Detector
/**
* TODO: add vm resource provider
* Get prefix resource provider, vm will considered as "unknown RP"
* Web App: "a"
* Function App: "f"
* non-Web and non-Function APP: "u" (unknown)
*/
export const getResourceProvider = (): string => {
  return isWebApp()? "a" : isFunctionApp()? "f" : "u";
}
