// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesClient } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new FileSharesClient(new DefaultAzureCredential(), subscriptionId);
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new FileSharesClient(credential, subscriptionId);
  });

  it("ReadmeSampleGetFileShare", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new FileSharesClient(new DefaultAzureCredential(), subscriptionId);
    const result = await client.fileShares.get("myResourceGroup", "myFileShare");
    console.log(result);
  });

  it("ReadmeSampleListFileShares", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new FileSharesClient(new DefaultAzureCredential(), subscriptionId);
    const shares = [];
    for await (const item of client.fileShares.listBySubscription()) {
      shares.push(item);
    }
    console.log(shares);
  });

  it("ReadmeSampleCreateFileShare", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new FileSharesClient(new DefaultAzureCredential(), subscriptionId);
    const result = await client.fileShares.createOrUpdate("myResourceGroup", "myFileShare", {
      properties: {
        mountName: "myfileshare",
        mediaTier: "SSD",
        redundancy: "Local",
        protocol: "NFS",
        provisionedStorageGiB: 8,
      },
      location: "westus",
    });
    console.log(result);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
