// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { setLogLevel } from "@azure/logger";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { AppComplianceAutomationToolForMicrosoft365 } from "@azure/arm-appcomplianceautomation";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new AppComplianceAutomationToolForMicrosoft365(
      new DefaultAzureCredential(),
      subscriptionId,
    );
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new AppComplianceAutomationToolForMicrosoft365(credential, subscriptionId);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
