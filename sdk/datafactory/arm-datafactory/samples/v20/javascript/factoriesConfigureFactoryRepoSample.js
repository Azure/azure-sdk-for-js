// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a factory's repo information.
 *
 * @summary updates a factory's repo information.
 * x-ms-original-file: 2018-06-01/Factories_ConfigureFactoryRepo.json
 */
async function factoriesConfigureFactoryRepo() {
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

async function main() {
  await factoriesConfigureFactoryRepo();
}

main().catch(console.error);
