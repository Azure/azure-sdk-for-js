// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, HealthDataAIServicesClient } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new HealthDataAIServicesClient(new DefaultAzureCredential(), subscriptionId);
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new HealthDataAIServicesClient(credential, subscriptionId);
  });

  it("ReadmeSampleConfigureCloudSetting", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new HealthDataAIServicesClient(new DefaultAzureCredential(), subscriptionId, {
      cloudSetting: AzureClouds.AZURE_US_GOVERNMENT,
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
