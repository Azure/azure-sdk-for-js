// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to callback that triggers on approval state change.
 *
 * @summary callback that triggers on approval state change.
 * x-ms-original-file: 2025-05-01-preview/EnclaveConnection_HandleApprovalCreation.json
 */
async function enclaveConnectionHandleApprovalCreation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.enclaveConnection.handleApprovalCreation(
    "rgopenapi",
    "TestMyEnclaveConnection",
    {
      resourceRequestAction: "Create",
      approvalStatus: "Approved",
      approvalCallbackPayload: '{\n  "key1": "value1",\n  "key2": "value2"\n}',
    },
  );
  console.log(result);
}

async function main() {
  await enclaveConnectionHandleApprovalCreation();
}

main().catch(console.error);
