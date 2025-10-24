// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to callback that triggers on approval state change.
 *
 * @summary callback that triggers on approval state change.
 * x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_HandleApprovalCreation.json
 */
async function enclaveEndpointsHandleApprovalCreation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.enclaveEndpoints.handleApprovalCreation(
    "rgopenapi",
    "TestMyEnclave",
    "TestMyEnclaveEndpoint",
    { resourceRequestAction: "Create", approvalStatus: "Approved" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await enclaveEndpointsHandleApprovalCreation();
}

main().catch(console.error);
