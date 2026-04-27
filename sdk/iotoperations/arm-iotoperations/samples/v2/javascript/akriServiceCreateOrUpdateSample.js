// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { IoTOperationsClient } = require("@azure/arm-iotoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AkriServiceResource
 *
 * @summary create a AkriServiceResource
 * x-ms-original-file: 2026-03-01/AkriService_CreateOrUpdate_MaximumSet_Gen.json
 */
async function akriServiceCreateOrUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.akriService.createOrUpdate(
    "rgiotoperations",
    "resource-name123",
    "resource-name123",
    {
      properties: {},
      extendedLocation: { name: "cseunvoinpjfvuyoewmzlr", type: "CustomLocation" },
    },
  );
  console.log(result);
}

async function main() {
  await akriServiceCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
