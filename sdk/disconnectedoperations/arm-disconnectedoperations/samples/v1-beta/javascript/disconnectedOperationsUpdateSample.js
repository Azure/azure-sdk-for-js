// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DisconnectedOperationsManagementClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a DisconnectedOperation
 *
 * @summary update a DisconnectedOperation
 * x-ms-original-file: 2026-03-15/DisconnectedOperations_Update_MaximumSet_Gen.json
 */
async function disconnectedOperationsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1F6CACA0-5FFA-47AD-94FD-42368F71E49E";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const result = await client.disconnectedOperations.update(
    "rgdisconnectedoperations",
    "demo-resource",
    {
      tags: { key2: "value2" },
      properties: {
        connectionIntent: "Connected",
        registrationStatus: "Registered",
        deviceVersion: "2.0.0",
      },
    },
  );
  console.log(result);
}

async function main() {
  await disconnectedOperationsUpdate();
}

main().catch(console.error);
