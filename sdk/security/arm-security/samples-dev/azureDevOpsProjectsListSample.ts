// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a list of Azure DevOps projects onboarded to the connector.
 *
 * @summary returns a list of Azure DevOps projects onboarded to the connector.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/ListAzureDevOpsProjects_example.json
 */
async function listAzureDevOpsProjects(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureDevOpsProjects.list(
    "myRg",
    "mySecurityConnectorName",
    "myAzDevOpsOrg",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAzureDevOpsProjects();
}

main().catch(console.error);
