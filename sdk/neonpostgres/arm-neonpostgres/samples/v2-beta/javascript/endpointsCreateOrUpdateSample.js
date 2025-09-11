// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Endpoint
 *
 * @summary create a Endpoint
 * x-ms-original-file: 2025-06-23-preview/Endpoints_CreateOrUpdate_MaximumSet_Gen.json
 */
async function endpointsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.endpoints.createOrUpdate(
    "rgneon",
    "myOrganization",
    "myProject",
    "feature",
    "primary-endpoint",
    {
      properties: {
        entityName: "PrimaryEndpoint",
        attributes: [{ name: "on", value: "qzp" }],
        projectId: "vwwhykqyr",
        branchId: "blclbeuzvywzagbuvdo",
        endpointType: "read_only",
        size: { autoscalingLimitMinCu: 3, autoscalingLimitMaxCu: 14 },
      },
    },
  );
  console.log(result);
}

async function main() {
  await endpointsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
