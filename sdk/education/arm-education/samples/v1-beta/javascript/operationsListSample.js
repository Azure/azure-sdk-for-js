// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the available Microsoft.Education API operations.
 *
 * @summary lists all of the available Microsoft.Education API operations.
 * x-ms-original-file: 2021-12-01-preview/GetOperations.json
 */
async function getOperations() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.operations.list();
  console.log(result);
}

async function main() {
  await getOperations();
}

main().catch(console.error);
