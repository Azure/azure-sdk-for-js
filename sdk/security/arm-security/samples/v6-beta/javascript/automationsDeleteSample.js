// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a security automation.
 *
 * @summary deletes a security automation.
 * x-ms-original-file: 2023-12-01-preview/Automations/DeleteAutomation_example.json
 */
async function deleteASecurityAutomation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.automations.delete("myRg", "myAutomationName");
}

async function main() {
  await deleteASecurityAutomation();
}

main().catch(console.error);
