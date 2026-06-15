// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available operations supported by Microsoft Healthcare resource provider.
 *
 * @summary lists all of the available operations supported by Microsoft Healthcare resource provider.
 * x-ms-original-file: 2025-04-01-preview/OperationsList.json
 */
async function listOperations() {
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOperations();
}

main().catch(console.error);
