// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a security connector.
 *
 * @summary deletes a security connector.
 * x-ms-original-file: 2024-08-01-preview/SecurityConnectors/DeleteSecurityConnector_example.json
 */
async function deleteASecurityConnector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.securityConnectors.delete("myRg", "mySecurityConnectorName");
}

async function main() {
  await deleteASecurityConnector();
}

main().catch(console.error);
