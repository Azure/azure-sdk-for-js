// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validate a Connector.
 *
 * @summary validate a Connector.
 * x-ms-original-file: 2024-07-01-preview/ValidateConnectorSuccess.json
 */
async function validateConnectorSuccess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.connector.validate("test-rg", "westus", "connectorName");
  console.log(result);
}

async function main() {
  await validateConnectorSuccess();
}

main().catch(console.error);
