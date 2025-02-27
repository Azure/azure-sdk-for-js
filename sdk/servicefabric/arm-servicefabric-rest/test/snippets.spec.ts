// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ServiceFabricManagementClient, { isUnexpected, paginate } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleListAllClusters", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const credential = new DefaultAzureCredential();
    const client = ServiceFabricManagementClient(credential);
    // @ts-preserve-whitespace
    const result = await client
      .path(
        "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/clusters",
        subscriptionId,
      )
      .get();
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result.body.error;
    }
    // @ts-preserve-whitespace
    const clusters = paginate(client, result);
    for await (const cluster of clusters) {
      console.log(`Cluster name: ${cluster.name}`);
      console.log(`Cluster id: ${cluster.id}`);
      console.log(`Cluster type: ${cluster.type}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
