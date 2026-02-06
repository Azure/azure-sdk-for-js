// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a trusted access role binding
 *
 * @summary create or update a trusted access role binding
 * x-ms-original-file: 2025-10-02-preview/TrustedAccessRoleBindings_CreateOrUpdate.json
 */
async function createOrUpdateATrustedAccessRoleBinding(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.trustedAccessRoleBindings.createOrUpdate(
    "rg1",
    "clustername1",
    "binding1",
    {
      roles: [
        "Microsoft.MachineLearningServices/workspaces/reader",
        "Microsoft.MachineLearningServices/workspaces/writer",
      ],
      sourceResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/b/providers/Microsoft.MachineLearningServices/workspaces/c",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateATrustedAccessRoleBinding();
}

main().catch(console.error);
