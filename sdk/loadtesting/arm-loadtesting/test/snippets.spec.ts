// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LoadTestClient } from "@azure/arm-loadtesting";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new LoadTestClient(new DefaultAzureCredential(), subscriptionId);
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new LoadTestClient(credential, subscriptionId);
  });

  it("ReadmeSampleCreateLoadTestResource", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new LoadTestClient(new DefaultAzureCredential(), subscriptionId);
    // @ts-preserve-whitespace
    const loadTestResourceCreatePayload = {
      location: "westus2",
    };
    // @ts-preserve-whitespace
    const resource = await client.loadTests.beginCreateOrUpdateAndWait(
      "sample-rg",
      "sample-loadtesting-resource",
      loadTestResourceCreatePayload,
    );
  });

  it("ReadmeSampleCreateLoadTestResourceWithManagedIdentityAndCMKEncryption", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new LoadTestClient(new DefaultAzureCredential(), subscriptionId);
    // @ts-preserve-whitespace
    const loadTestResourceCreatePayload = {
      location: "westus2",
      tags: { team: "testing" },
      identity: {
        type: "SystemAssigned, UserAssigned",
        userAssignedIdentities: {
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/sample-rg/providers/microsoft.managedidentity/userassignedidentities/identity1":
            {},
        },
      },
      encryption: {
        identity: {
          type: "UserAssigned",
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/sample-rg/providers/microsoft.managedidentity/userassignedidentities/identity1",
        },
        keyUrl: "https://sample-kv.vault.azure.net/keys/cmkkey/2d1ccd5c50234ea2a0858fe148b69cde",
      },
    };
    // @ts-preserve-whitespace
    const resource = await client.loadTests.beginCreateOrUpdateAndWait(
      "sample-rg",
      "sample-loadtesting-resource",
      loadTestResourceCreatePayload,
    );
  });

  it("ReadmeSampleGetLoadTestResource", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new LoadTestClient(new DefaultAzureCredential(), subscriptionId);
    // @ts-preserve-whitespace
    const resourceName = "sample-loadtesting-resource";
    const resourceGroupName = "sample-rg";
    // @ts-preserve-whitespace
    const resource = await client.loadTests.get(resourceGroupName, resourceName);
  });

  it("ReadmeSampleUpdateLoadTestResource", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new LoadTestClient(new DefaultAzureCredential(), subscriptionId);
    // @ts-preserve-whitespace
    const loadTestResourcePatchPayload = {
      tags: { team: "testing-dev" },
      identity: {
        type: "SystemAssigned, UserAssigned",
        userAssignedIdentities: {
          // removing a user-assigned managed identity by assigning the value in the payload as null
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/sample-rg/providers/microsoft.managedidentity/userassignedidentities/identity1":
            null,
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/sample-rg/providers/microsoft.managedidentity/userassignedidentities/identity2":
            {},
        },
      },
      encryption: {
        // use system-assigned managed identity for CMK encryption
        identity: {
          type: "SystemAssigned",
          resourceId: null,
        },
        keyUrl: "https://sample-kv.vault.azure.net/keys/cmkkey/2d1ccd5c50234ea2a0858fe148b69cde",
      },
    };

    const resource = await client.loadTests.beginUpdateAndWait(
      "sample-rg",
      "sample-loadtesting-resource",
      loadTestResourcePatchPayload,
    );
  });

  it("ReadmeSampleDeleteLoadTestResource", async () => {
    const subscriptionId = "00000000-0000-0000-0000-000000000000";
    const client = new LoadTestClient(new DefaultAzureCredential(), subscriptionId);
    // @ts-preserve-whitespace
    const resourceName = "sample-loadtesting-resource";
    const resourceGroupName = "sample-rg";
    // @ts-preserve-whitespace
    const result = await client.loadTests.beginDeleteAndWait(resourceGroupName, resourceName);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
