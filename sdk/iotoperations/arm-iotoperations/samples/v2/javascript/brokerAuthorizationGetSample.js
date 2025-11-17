// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a BrokerAuthorizationResource
 *
 * @summary get a BrokerAuthorizationResource
 * x-ms-original-file: 2025-10-01/BrokerAuthorization_Get_MaximumSet_Gen.json
 */
async function brokerAuthorizationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.brokerAuthorization.get(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
  );
  console.log(result);
}

async function main() {
  await brokerAuthorizationGet();
}

main().catch(console.error);
