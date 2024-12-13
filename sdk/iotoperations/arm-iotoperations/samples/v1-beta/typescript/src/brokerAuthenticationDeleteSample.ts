// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a BrokerAuthenticationResource
 *
 * @summary delete a BrokerAuthenticationResource
 * x-ms-original-file: 2024-11-01/BrokerAuthentication_Delete_MaximumSet_Gen.json
 */
async function brokerAuthenticationDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  await client.brokerAuthentication.delete(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
  );
}

async function main() {
  brokerAuthenticationDelete();
}

main().catch(console.error);
