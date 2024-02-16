// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { CreateHttpClientOptions, HttpClient } from "./interfaces";
import { createFetchHttpClient } from "./fetchHttpClient";
import { createXhrHttpClient } from "./xhrHttpClient";

/**
 * Create the correct HttpClient for the current environment.
 */
export function createDefaultHttpClient(
  options: CreateHttpClientOptions = { api: "fetch" },
): HttpClient {
  if (options.api === "fetch") {
    return createFetchHttpClient();
  } else if (options.api === "xhr") {
    return createXhrHttpClient();
  } else {
    throw new Error(
      `Unsupported value of "${options.browserApi}" for "browserApi". Only "fetch" or "xhr" is supported.`,
    );
  }
}
