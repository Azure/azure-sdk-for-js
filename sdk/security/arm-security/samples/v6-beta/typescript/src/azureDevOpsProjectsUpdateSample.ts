// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a monitored Azure DevOps project resource.
 *
 * @summary updates a monitored Azure DevOps project resource.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/UpdateAzureDevOpsProjects_example.json
 */
async function updateAzureDevOpsProjects(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.azureDevOpsProjects.update(
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

async function main(): Promise<void> {
  await updateAzureDevOpsProjects();
}

main().catch(console.error);
