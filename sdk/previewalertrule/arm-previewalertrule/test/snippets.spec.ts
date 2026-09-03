// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PreviewAlertRuleManagementClient } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new PreviewAlertRuleManagementClient(new DefaultAzureCredential());
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new PreviewAlertRuleManagementClient(credential);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
