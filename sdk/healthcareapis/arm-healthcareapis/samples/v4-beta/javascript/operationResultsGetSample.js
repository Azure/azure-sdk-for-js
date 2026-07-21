// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the operation result for a long running operation.
 *
 * @summary get the operation result for a long running operation.
 * x-ms-original-file: 2025-04-01-preview/OperationResultsGet.json
 */
async function getOperationResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.operationResults.get("westus", "exampleid");
  console.log(result);
}

async function main() {
  await getOperationResult();
}

main().catch(console.error);
