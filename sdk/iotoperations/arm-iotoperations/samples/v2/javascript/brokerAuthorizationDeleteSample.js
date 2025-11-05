// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a BrokerAuthorizationResource
 *
 * @summary delete a BrokerAuthorizationResource
 * x-ms-original-file: 2025-10-01/BrokerAuthorization_Delete_MaximumSet_Gen.json
 */
async function brokerAuthorizationDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  await client.brokerAuthorization.delete(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
  );
}

async function main() {
  await brokerAuthorizationDelete();
}

main().catch(console.error);
