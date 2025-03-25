// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNamedKeyCredential } from "@azure/core-auth";
import createClient from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const credential = new AzureNamedKeyCredential("<account name>", "<account key>");
    const batchClient = createClient("<account endpoint>", credential);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
