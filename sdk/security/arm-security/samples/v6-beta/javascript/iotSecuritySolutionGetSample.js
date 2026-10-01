// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to user this method to get details of a specific IoT Security solution based on solution name
 *
 * @summary user this method to get details of a specific IoT Security solution based on solution name
 * x-ms-original-file: 2019-08-01/IoTSecuritySolutions/GetIoTSecuritySolution.json
 */
async function getAIoTSecuritySolution() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.iotSecuritySolution.get("MyGroup", "default");
  console.log(result);
}

async function main() {
  await getAIoTSecuritySolution();
}

main().catch(console.error);
