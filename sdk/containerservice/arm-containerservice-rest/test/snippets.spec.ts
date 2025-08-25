// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ContainerServiceClient, { isUnexpected, paginate } from "@azure-rest/arm-containerservice";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("SampleReadmeListManagedClusters", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const credential = new DefaultAzureCredential();
    const client = ContainerServiceClient(credential);
    // @ts-preserve-whitespace
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/managedClusters",
        subscriptionId,
      )
      .get();
    // @ts-preserve-whitespace
    if (isUnexpected(initialResponse)) {
      throw initialResponse;
    }
    // @ts-preserve-whitespace
    const result = paginate(client, initialResponse);
    for await (const item of result) {
      console.log(`Managed Cluster: ${item.name}`);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
