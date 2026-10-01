// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates monitored Azure DevOps organization details.
 *
 * @summary creates or updates monitored Azure DevOps organization details.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/CreateOrUpdateAzureDevOpsOrgs_example.json
 */
async function createOrUpdateAzureDevOpsOrgs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.azureDevOpsOrgs.createOrUpdate(
    "myRg",
    "mySecurityConnectorName",
    "myAzDevOpsOrg",
    {
      properties: { actionableRemediation: { state: "Enabled" }, onboardingState: "NotApplicable" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAzureDevOpsOrgs();
}

main().catch(console.error);
