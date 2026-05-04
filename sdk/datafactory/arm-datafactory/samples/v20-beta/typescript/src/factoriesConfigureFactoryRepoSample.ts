// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a factory's repo information.
 *
 * @summary updates a factory's repo information.
 * x-ms-original-file: 2018-06-01/Factories_ConfigureFactoryRepo.json
 */
async function factoriesConfigureFactoryRepo(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.factories.configureFactoryRepo("East US", {
    factoryResourceId:
      "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/exampleResourceGroup/providers/Microsoft.DataFactory/factories/exampleFactoryName",
    repoConfiguration: {
      type: "FactoryVSTSConfiguration",
      accountName: "ADF",
      collaborationBranch: "master",
      lastCommitId: "",
      projectName: "project",
      repositoryName: "repo",
      rootFolder: "/",
      tenantId: "",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await factoriesConfigureFactoryRepo();
}

main().catch(console.error);
