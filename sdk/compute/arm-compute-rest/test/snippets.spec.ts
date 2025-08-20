// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import ComputeManagementClient, { VirtualMachinesListParameters, paginate } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-ignore
    const client = ComputeManagementClient(credential);
  });

  it("ReadmeSampleVirtualMachinesList", async () => {
    const credential = new DefaultAzureCredential();
    const client = ComputeManagementClient(credential);
    // @ts-preserve-whitespace
    const subscriptionId = "";
    const resourceGroupName = "rgcompute";
    const options: VirtualMachinesListParameters = {
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
    // @ts-preserve-whitespace
    const pageData = paginate(client, initialResponse);
    for await (const item of pageData) {
      console.log(item);
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
