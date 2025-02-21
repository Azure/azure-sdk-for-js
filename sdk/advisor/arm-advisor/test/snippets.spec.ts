// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { AdvisorManagementClient } from "@azure/arm-advisor";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("AdvisorManagementClientAuth_Node", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new AdvisorManagementClient(new DefaultAzureCredential(), subscriptionId);
  });

  it("AdvisorManagementClientAuth_Browser", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new AdvisorManagementClient(credential, subscriptionId);
  });

  it("setLogLevel", async () => {
    setLogLevel("info");
  });
});
