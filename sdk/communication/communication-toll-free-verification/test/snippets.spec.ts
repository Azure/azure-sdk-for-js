// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { TollFreeVerificationClient } from "@azure-tools/communication-toll-free-verification";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
    const client = new TollFreeVerificationClient(connectionString);
  });

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const credential = new AzureKeyCredential("<key-from-resource>");
    const client = new TollFreeVerificationClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = new TollFreeVerificationClient("<endpoint-from-resource>", credential);
  });

  it("SampleReadmeGetCampaignBrief", async () => {
    const credential = new DefaultAzureCredential();
    const client = new TollFreeVerificationClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    // get a campaign brief
    const campaignBrief = await client.getCampaignBrief(
      "63215741-b596-4eb4-a9c0-b2905ce22cb0",
      "US",
    );
    // @ts-preserve-whitespace
    console.log(campaignBrief);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
