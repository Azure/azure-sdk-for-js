// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel, AzureLogger } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleBasicUsage", () => {
    setLogLevel("info");
    // Logs all subsequent log messages for all SDK calls
  });

  it("ReadmeSampleRedirectLog", () => {
    setLogLevel("verbose");
    // @ts-preserve-whitespace
    // override logging to output to console.log (default location is stderr)
    AzureLogger.log = (...args) => {
      console.log(...args);
    };
  });
});
