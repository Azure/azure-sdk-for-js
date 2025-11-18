// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to callback that triggers on approval deletion state change.
 *
 * @summary callback that triggers on approval deletion state change.
 * x-ms-original-file: 2025-05-01-preview/EnclaveConnection_HandleApprovalDeletion.json
 */
async function enclaveConnectionHandleApprovalDeletion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.enclaveConnection.handleApprovalDeletion(
    "rgopenapi",
    "TestMyEnclaveConnection",
    { resourceRequestAction: "Create" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await enclaveConnectionHandleApprovalDeletion();
}

main().catch(console.error);
