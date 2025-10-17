// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to callback that triggers on approval deletion state change.
 *
 * @summary callback that triggers on approval deletion state change.
 * x-ms-original-file: 2025-05-01-preview/VirtualEnclave_HandleApprovalDeletion.json
 */
async function virtualEnclaveHandleApprovalDeletion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.virtualEnclave.handleApprovalDeletion("rgopenapi", "TestMyEnclave", {
    resourceRequestAction: "Create",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await virtualEnclaveHandleApprovalDeletion();
}

main().catch(console.error);
