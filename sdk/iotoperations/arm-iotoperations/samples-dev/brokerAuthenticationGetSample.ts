// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a BrokerAuthenticationResource
 *
 * @summary get a BrokerAuthenticationResource
 * x-ms-original-file: 2024-11-01/BrokerAuthentication_Get_MaximumSet_Gen.json
 */
async function brokerAuthenticationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.brokerAuthentication.get(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    "resource-name123",
  );
  console.log(result);
}

async function main() {
  brokerAuthenticationGet();
}

main().catch(console.error);
