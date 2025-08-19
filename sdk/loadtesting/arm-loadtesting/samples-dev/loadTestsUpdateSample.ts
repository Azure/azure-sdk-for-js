// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { LoadTestResourcePatchRequestBody } from "@azure/arm-loadtesting";
import { LoadTestClient } from "@azure/arm-loadtesting";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update a loadtest resource.
 *
 * @summary Update a loadtest resource.
 * x-ms-original-file: specification/loadtestservice/resource-manager/Microsoft.LoadTestService/stable/2022-12-01/examples/LoadTests_Update.json
 */
async function loadTestsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["LOADTESTSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["LOADTESTSERVICE_RESOURCE_GROUP"] || "dummyrg";
  const loadTestName = "myLoadTest";
  const loadTestResourcePatchRequestBody: LoadTestResourcePatchRequestBody = {
    description: "This is new load test resource",
    encryption: {
      identity: { type: "SystemAssigned", resourceId: undefined },
      keyUrl: "https://dummy.vault.azure.net/keys/dummykey1",
    },
    identity: {
      type: "SystemAssigned,UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000000000000000000000000000/resourceGroups/dummyrg/providers/MicrosoftManagedIdentity/userAssignedIdentities/id1":
          {},
      },
    },
    tags: { division: "LT", team: "Dev Exp" },
  };
  const credential = new DefaultAzureCredential();
  const client = new LoadTestClient(credential, subscriptionId);
  const result = await client.loadTests.beginUpdateAndWait(
    resourceGroupName,
    loadTestName,
    loadTestResourcePatchRequestBody,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await loadTestsUpdate();
}

main().catch(console.error);
