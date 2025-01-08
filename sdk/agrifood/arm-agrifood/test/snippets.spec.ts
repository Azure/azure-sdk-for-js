// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgriFoodMgmtClient } from "@azure/arm-agrifood";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", async () => {
  it("CreateAgriFoodMgmtClient_Node", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new AgriFoodMgmtClient(new DefaultAzureCredential(), subscriptionId);
  });

  it("CreateAgriFoodMgmtClient_Browser", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    // @ts-preserve-whitespace
    const client = new AgriFoodMgmtClient(credential, subscriptionId);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
