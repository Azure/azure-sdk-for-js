// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LoadTestResource } from "@azure/arm-loadtesting";
import { LoadTestClient } from "@azure/arm-loadtesting";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update LoadTest resource.
 *
 * @summary Create or update LoadTest resource.
 * x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_CreateOrUpdate.json
 */
async function loadTestsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["LOADTESTSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["LOADTESTSERVICE_RESOURCE_GROUP"] || "dummyrg";
  const loadTestName = "myLoadTest";
  const loadTestResource: LoadTestResource = {
    description: "This is new load test resource",
    encryption: {
      identity: {
        type: "UserAssigned",
        resourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/dummyrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id1",
      },
      keyUrl: "https://dummy.vault.azure.net/keys/dummykey1",
    },
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000000000000000000000000000/resourceGroups/dummyrg/providers/MicrosoftManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    location: "westus",
    tags: { team: "Dev Exp" },
  };
  const credential = new DefaultAzureCredential();
  const client = new LoadTestClient(credential, subscriptionId);
  const result = await client.loadTests.beginCreateOrUpdateAndWait(
    resourceGroupName,
    loadTestName,
    loadTestResource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await loadTestsCreateOrUpdate();
}

main().catch(console.error);
