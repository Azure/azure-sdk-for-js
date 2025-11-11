// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to add a dryrun job to do necessary check before actual creation
 *
 * @summary add a dryrun job to do necessary check before actual creation
 * x-ms-original-file: 2024-07-01-preview/PatchDryrun.json
 */
async function patchDryrun(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.linkers.updateDryrun(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app",
    "dryrunName",
    {
      properties: {
        parameters: {
          actionName: "createOrUpdate",
          authInfo: {
            name: "name",
            authType: "secret",
            secretInfo: { secretType: "rawValue", value: "secret" },
          },
          targetService: {
            type: "AzureResource",
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.DocumentDb/databaseAccounts/test-acc/mongodbDatabases/test-db",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchDryrun();
}

main().catch(console.error);
