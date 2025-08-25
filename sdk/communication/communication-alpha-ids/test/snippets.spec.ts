// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AlphaIdsClient } from "@azure-tools/communication-alpha-ids";
import { AzureKeyCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
    const client = new AlphaIdsClient(connectionString);
  });

  it("ReadmeSampleCreateClient_AzureKeyCredential", async () => {
    const credential = new AzureKeyCredential("<key-from-resource>");
    const client = new AlphaIdsClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreateClient_ActiveDirectory", async () => {
    const credential = new DefaultAzureCredential();
    const client = new AlphaIdsClient("<endpoint-from-resource>", credential);
  });

  it("AlphaIdsGetConfiguration", async () => {
    const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
    const client = new AlphaIdsClient(connectionString);
    // @ts-preserve-whitespace
    // get the current configuration
    const configuration = await client.getDynamicAlphaIdConfiguration();
    // @ts-preserve-whitespace
    console.log(
      `Usage of Alpha IDs is currently ${configuration.enabled ? "enabled" : "disabled"}`,
    );
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
