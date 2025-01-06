// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { AdvisorManagementClient } from "@azure/arm-advisor";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", function () {
  it("AdvisorManagementClientAuth_Node", async function () {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new AdvisorManagementClient(new DefaultAzureCredential(), subscriptionId);
  });

  it("AdvisorManagementClientAuth_Browser", async function () {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new AdvisorManagementClient(credential, subscriptionId);
  });

  it("setLogLevel", async function () {
    setLogLevel("info");
  });
});
