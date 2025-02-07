// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a BrokerAuthorizationResource
 *
 * @summary delete a BrokerAuthorizationResource
 * x-ms-original-file: 2024-11-01/BrokerAuthorization_Delete_MaximumSet_Gen.json
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
  brokerAuthorizationDelete();
}

main().catch(console.error);
