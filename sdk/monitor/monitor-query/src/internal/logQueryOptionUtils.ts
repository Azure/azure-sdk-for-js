// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LogsQueryClientOptions } from "../logsQueryClient.js";

export function getLogQueryEndpoint(options: LogsQueryClientOptions): string {
  if (!options.endpoint) {
    throw new Error("options.endpoint is required");
  }

  const url = new URL(options.endpoint);
  url.pathname = "/v1";

  return url.toString();
}
