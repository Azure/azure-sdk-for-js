// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get devops long running operation result.
 *
 * @summary get devops long running operation result.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/GetDevOpsOperationResultsFailed_example.json
 */
async function getDevOpsOperationResultsFailed() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsOperationResults.get(
    "myRg",
    "mySecurityConnectorName",
    "8d4caace-e7b3-4b3e-af99-73f76829ebcf",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get devops long running operation result.
 *
 * @summary get devops long running operation result.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/GetDevOpsOperationResultsSucceeded_example.json
 */
async function getDevOpsOperationResultsSucceeded() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.devOpsOperationResults.get(
    "myRg",
    "mySecurityConnectorName",
    "4e826cf1-5c36-4808-a7d2-fb4f5170978b",
  );
  console.log(result);
}

async function main() {
  await getDevOpsOperationResultsFailed();
  await getDevOpsOperationResultsSucceeded();
}

main().catch(console.error);
