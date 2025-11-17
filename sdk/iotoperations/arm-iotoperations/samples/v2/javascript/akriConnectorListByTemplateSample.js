// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list AkriConnectorResource resources by AkriConnectorTemplateResource
 *
 * @summary list AkriConnectorResource resources by AkriConnectorTemplateResource
 * x-ms-original-file: 2025-10-01/AkriConnector_ListByTemplate_MaximumSet_Gen.json
 */
async function akriConnectorListByTemplateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.akriConnector.listByTemplate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await akriConnectorListByTemplateMaximumSet();
}

main().catch(console.error);
