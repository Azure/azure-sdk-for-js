// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AppLinkClient } from "@azure/arm-appnetwork";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an Azure Kubernetes Application Network resource.
 *
 * @summary update an Azure Kubernetes Application Network resource.
 * x-ms-original-file: 2026-08-01-preview/AppLinks_Update.json
 */
async function appLinksUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11809CA1-E126-4017-945E-AA795CD5C5A9";
  const client = new AppLinkClient(credential, subscriptionId);
  const result = await client.appLinks.update("test_rg", "applink-test-01", {
    tags: { environment: "production", "cost-center": "platform" },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/11809CA1-E126-4017-945E-AA795CD5C5A9/resourceGroups/test_rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/applink-identity":
          {},
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await appLinksUpdate();
}

main().catch(console.error);
