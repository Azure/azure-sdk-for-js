// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list BrokerAuthenticationResource resources by BrokerResource
 *
 * @summary list BrokerAuthenticationResource resources by BrokerResource
 * x-ms-original-file: 2024-11-01/BrokerAuthentication_ListByResourceGroup_MaximumSet_Gen.json
 */
async function brokerAuthenticationListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.brokerAuthentication.listByResourceGroup(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  brokerAuthenticationListByResourceGroup();
}

main().catch(console.error);
