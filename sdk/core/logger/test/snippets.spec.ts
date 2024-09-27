// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel, AzureLogger } from "@azure/logger";
import { describe, it, assert } from "vitest";

describe("snippets", () => {
  it("basic_usage", () => {
    setLogLevel("info");
    // Logs all subsequent log messages for all SDK calls
  });

  it("redirect_log_output", () => {
    setLogLevel("verbose");

    // override logging to output to console.log (default location is stderr)
    AzureLogger.log = (...args) => {
      console.log(...args);
    };
  });
});
