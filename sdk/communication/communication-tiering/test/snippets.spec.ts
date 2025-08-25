// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential } from "@azure/core-auth";
import { TieringClient } from "@azure-tools/communication-tiering";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const connectionString = "endpoint=<endpoint>;accessKey=<accessKey>";
    const client = new TieringClient(connectionString);
  });

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const credential = new AzureKeyCredential("<key-from-resource>");
    const client = new TieringClient("<endpoint-from-resource>", credential);
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = new TieringClient("<endpoint-from-resource>", credential);
  });

  it("SampleReadmeGetAcquiredNumberLimits", async () => {
    const credential = new DefaultAzureCredential();
    const client = new TieringClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const resourceId = "5d41e908-de88-4bbf-94dc-fe9a1b51029b";
    // @ts-preserve-whitespace
    // Get acquired numbers and limits for a resource
    const acquiredNumberLimits = await client.getAcquiredNumberLimits(resourceId);
    // @ts-preserve-whitespace
    // print all number limits
    console.log(acquiredNumberLimits);
  });

  it("ReadmeSampleGetTierInfo", async () => {
    const credential = new DefaultAzureCredential();
    const client = new TieringClient("<endpoint-from-resource>", credential);
    // @ts-preserve-whitespace
    const resourceId = "5d41e908-de88-4bbf-94dc-fe9a1b51029b";
    // @ts-preserve-whitespace
    // Get tier info for a resource
    const tierInfo = await client.getTierByResourceId(resourceId);
    // @ts-preserve-whitespace
    // print all tier info
    console.log(tierInfo);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
