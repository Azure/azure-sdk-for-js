// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a monitored Azure DevOps project resource.
 *
 * @summary creates or updates a monitored Azure DevOps project resource.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/CreateOrUpdateAzureDevOpsProjects_example.json
 */
async function createOrUpdateAzureDevOpsProjects() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.azureDevOpsProjects.createOrUpdate(
    "myRg",
    "mySecurityConnectorName",
    "myAzDevOpsOrg",
    "myAzDevOpsProject",
    {
      properties: { actionableRemediation: { state: "Enabled" }, onboardingState: "NotApplicable" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAzureDevOpsProjects();
}

main().catch(console.error);
