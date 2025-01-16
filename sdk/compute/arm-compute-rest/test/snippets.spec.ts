// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ComputeManagementClient, { paginate } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const credential = new DefaultAzureCredential();
    const client = ComputeManagementClient(credential);
  });

  it("ReadmeSampleVirtualMachinesList", async () => {
    const credential = new DefaultAzureCredential();
    const client = ComputeManagementClient(credential);
    // @ts-preserve-whitespace
    const subscriptionId = "";
    const resourceGroupName = "rgcompute";
    const options = {
      queryParameters: {
        $filter: "aaaaaaaaaaaaaaaaaaaaaaa",
        "api-version": "2022-08-01",
      },
    };
    const initialResponse = await client
      .path(
        "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines",
        subscriptionId,
        resourceGroupName,
      )
      .get(options);
    const pageData = paginate(client, initialResponse);
    const result = [];
    for await (const item of pageData) {
      result.push(item);
    }
    console.log(result);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
