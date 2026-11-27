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

  it("ReadmeSampleCreatePool_Placement", async () => {
    const client = new BatchClient("<endpoint>", new DefaultAzureCredential());
    await client.createPool({
      id: "zone-balanced-pool",
      vmSize: "Standard_D2s_v5",
      targetDedicatedNodes: 3,
      virtualMachineConfiguration: {
        nodeAgentSkuId: "batch.node.ubuntu 22.04",
        imageReference: {
          publisher: "canonical",
          offer: "0001-com-ubuntu-server-jammy",
          sku: "22_04-lts",
          version: "latest",
        },
        placement: { zonePlacementPolicy: "Auto" },
        resiliencyPolicy: { zoneAllocationPolicy: { maxZoneCount: 3 } },
      },
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
