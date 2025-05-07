// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import NetworkManagementClient, { paginate, VirtualNetworksListParameters } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const credential = new DefaultAzureCredential();
    const client = NetworkManagementClient(credential);
  });

  it("ReadmeSampleListVirtualNetworks", async () => {
    const credential = new DefaultAzureCredential();
    const client = NetworkManagementClient(credential);
    // @ts-preserve-whitespace
    const subscriptionId = "";
    const resourceGroupName = "rg1";
    const options: VirtualNetworksListParameters = {
      queryParameters: { "api-version": "2022-05-01" },
    };
    // @ts-preserve-whitespace
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks",
        subscriptionId,
        resourceGroupName,
      )
      .get(options);
    // @ts-preserve-whitespace
    const pageData = paginate(client, initialResponse);
    for await (const page of pageData.byPage()) {
      for await (const item of page) {
        console.log(`Virtual Network: ${item}`);
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
