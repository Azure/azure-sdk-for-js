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
