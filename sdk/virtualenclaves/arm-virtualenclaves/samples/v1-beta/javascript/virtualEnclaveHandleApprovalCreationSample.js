// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to callback that triggers on approval state change.
 *
 * @summary callback that triggers on approval state change.
 * x-ms-original-file: 2025-05-01-preview/VirtualEnclave_HandleApprovalCreation.json
 */
async function virtualEnclaveHandleApprovalCreation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.virtualEnclave.handleApprovalCreation("rgopenapi", "TestMyEnclave", {
    resourceRequestAction: "Create",
    approvalStatus: "Approved",
    approvalCallbackPayload: '{\n  "key1": "value1",\n  "key2": "value2"\n}',
  });
  console.log(result);
}

async function main() {
  await virtualEnclaveHandleApprovalCreation();
}

main().catch(console.error);
