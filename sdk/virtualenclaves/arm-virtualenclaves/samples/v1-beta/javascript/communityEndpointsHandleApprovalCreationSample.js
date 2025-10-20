// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to callback that triggers on approval state change.
 *
 * @summary callback that triggers on approval state change.
 * x-ms-original-file: 2025-05-01-preview/CommunityEndpoints_HandleApprovalCreation.json
 */
async function communityEndpointsHandleApprovalCreation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.communityEndpoints.handleApprovalCreation(
    "rgopenapi",
    "TestMyCommunity",
    "TestMyCommunityEndpoint",
    { resourceRequestAction: "Create", approvalStatus: "Approved" },
  );
  console.log(result);
}

async function main() {
  await communityEndpointsHandleApprovalCreation();
}

main().catch(console.error);
