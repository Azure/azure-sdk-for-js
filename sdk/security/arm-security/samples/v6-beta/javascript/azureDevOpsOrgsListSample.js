// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a list of Azure DevOps organizations onboarded to the connector.
 *
 * @summary returns a list of Azure DevOps organizations onboarded to the connector.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/ListAzureDevOpsOrgs_example.json
 */
async function listAzureDevOpsOrgs() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureDevOpsOrgs.list("myRg", "mySecurityConnectorName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAzureDevOpsOrgs();
}

main().catch(console.error);
