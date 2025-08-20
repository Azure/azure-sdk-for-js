// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VisualStudioResourceProviderClient } from "@azure/arm-visualstudio";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new VisualStudioResourceProviderClient(
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
    const client = new VisualStudioResourceProviderClient(credential, subscriptionId);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
