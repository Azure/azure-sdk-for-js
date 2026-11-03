// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates monitored Azure DevOps organization details.
 *
 * @summary updates monitored Azure DevOps organization details.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/UpdateAzureDevOpsOrgs_example.json
 */
async function updateAzureDevOpsOrgs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.azureDevOpsOrgs.update(
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
  await updateAzureDevOpsOrgs();
}

main().catch(console.error);
