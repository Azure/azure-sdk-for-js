// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient, paginate } from "@azure-rest/arm-appcontainers";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new WebSiteManagementClient(new DefaultAzureCredential());
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new WebSiteManagementClient(credential);
  });

  it("ListAppServicePlans", async () => {
    const subscriptionId = process.env.SUBSCRIPTION_ID as string;
    const credential = new DefaultAzureCredential();
    const client = WebSiteManagementClient(credential);
    // @ts-preserve-whitespace
    const result = [];
    const initialResposne = await client
      .path("/subscriptions/{subscriptionId}/providers/Microsoft.Web/serverfarms", subscriptionId)
      .get();
    const res = paginate(client, initialResposne);
    // @ts-preserve-whitespace
    for await (const item of res) {
      result.push(item);
    }
    // @ts-preserve-whitespace
    console.log(result);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
