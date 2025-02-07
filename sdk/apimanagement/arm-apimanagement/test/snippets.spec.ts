// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { ApiManagementClient } from "@azure/arm-apimanagement";
import { setLogLevel } from "@azure/logger";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new ApiManagementClient(new DefaultAzureCredential(), subscriptionId);
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new ApiManagementClient(credential, subscriptionId);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
