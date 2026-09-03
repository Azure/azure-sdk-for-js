// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNamedKeyCredential } from "@azure/core-auth";
import { BatchClient } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node_EntraID", async () => {
    const client = new BatchClient("<endpoint>", new DefaultAzureCredential());
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new BatchClient("<endpoint>", credential);
  });

  it("ReadmeSampleCreateClient_Node_SharedKey", async function () {
    const credential = new AzureNamedKeyCredential("<account name>", "<account key>");
    const client = new BatchClient("<endpoint>", credential);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
