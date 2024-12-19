// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IoTOperationsClient } from "@azure/arm-iotoperations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a InstanceResource
 *
 * @summary update a InstanceResource
 * x-ms-original-file: 2024-11-01/Instance_Update_MaximumSet_Gen.json
 */
async function instanceUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "F8C729F9-DF9C-4743-848F-96EE433D8E53";
  const client = new IoTOperationsClient(credential, subscriptionId);
  const result = await client.instance.update(
    "rgiotoperations",
    "aio-instance",
    { tags: {}, identity: { type: "None", userAssignedIdentities: {} } },
  );
  console.log(result);
}

async function main() {
  instanceUpdate();
}

main().catch(console.error);
