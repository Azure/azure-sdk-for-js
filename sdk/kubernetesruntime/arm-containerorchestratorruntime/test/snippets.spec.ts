// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesRuntimeClient } from "@azure/arm-containerorchestratorruntime";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new KubernetesRuntimeClient(new DefaultAzureCredential());
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new KubernetesRuntimeClient(credential);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
