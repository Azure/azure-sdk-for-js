// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a security assignment on the given scope. Will create/update the required standard assignment.
 *
 * @summary create a security assignment on the given scope. Will create/update the required standard assignment.
 * x-ms-original-file: 2021-08-01-preview/Assignments/PutAssignment_example.json
 */
async function exemptRecommendationFromStandardAndResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.assignments.createOrUpdate(
    "myResourceGroup",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
    {
      description: "Set of policies monitored by Azure Security Center for cross cloud",
      additionalData: { exemptionCategory: "waiver" },
      assignedComponent: { key: "1195afff-c881-495e-9bc5-1486211ae03f" },
      assignedStandard: {
        id: "/providers/Microsoft.Security/Standards/1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
      },
      displayName: "ASC Default",
      effect: "Exempt",
      expiresOn: new Date("2022-05-01T19:50:47.083633Z"),
      metadata: { ticketId: 12345 },
      scope: "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/ResourceGroup/rg",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a security assignment on the given scope. Will create/update the required standard assignment.
 *
 * @summary create a security assignment on the given scope. Will create/update the required standard assignment.
 * x-ms-original-file: 2021-08-01-preview/Assignments/PutDefaultAssignment_example.json
 */
async function defineADefaultStandardAssignment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.assignments.createOrUpdate(
    "myResourceGroup",
    "1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
    {
      description: "Set of policies monitored by Azure Security Center for cross cloud",
      assignedStandard: {
        id: "/providers/Microsoft.Security/Standards/1f3afdf9-d0c9-4c3d-847f-89da613e70a8",
      },
      displayName: "ASC Default",
      effect: "audit",
      scope: "/subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/ResourceGroup/rg",
    },
  );
  console.log(result);
}

async function main() {
  await exemptRecommendationFromStandardAndResource();
  await defineADefaultStandardAssignment();
}

main().catch(console.error);
