// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { ConfigurationClient } from "../src/index.js";
import { describe, it } from "vitest";

describe("snippets", function () {
  it("new_configurationclient", function () {
    const client = new ConfigurationClient(
      process.env.ENDPOINT ?? "<app configuration endpoint>",
      new DefaultAzureCredential(),
    );
  });

  it("setloglevel", () => {
    setLogLevel("verbose");
  });
});
