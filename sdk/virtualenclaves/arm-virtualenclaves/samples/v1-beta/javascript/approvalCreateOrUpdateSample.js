// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MissionClient } = require("@azure/arm-virtualenclaves");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a ApprovalResource
 *
 * @summary create a ApprovalResource
 * x-ms-original-file: 2025-05-01-preview/Approvals_CreateOrUpdate.json
 */
async function approvalCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new MissionClient(credential, subscriptionId);
  const result = await client.approval.createOrUpdate(
    "subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/TestMyRg/providers/Microsoft.Mission/enclaveconnections/TestMyEnclaveConnection",
    "TestApprovals",
    {
      properties: {
        parentResourceId:
          "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/TestMyRg/providers/microsoft.mission/virtualenclaves/TestMyEnclave",
        grandparentResourceId:
          "/subscriptions/c64f6eca-bdc5-4bc2-88d6-f8f1dc23f86c/resourceGroups/testrg/providers/Microsoft.Mission/communities/TestMyCommunity",
        requestMetadata: {
          resourceAction: "string",
          approvalStatus: "Approved",
          approvalCallbackRoute: "approvalCallback",
          approvalCallbackPayload: '{\n  "key1": "value1",\n  "key2": "value2"\n}',
        },
        approvers: [
          {
            approverEntraId: "00000000-0000-0000-0000-000000000000",
            actionPerformed: "Approved",
            lastUpdatedAt: new Date("2023-03-17T20:43:17.760Z"),
          },
        ],
        ticketId: "string",
        createdAt: new Date("2023-03-17T20:43:17.760Z"),
        stateChangedAt: new Date("2023-03-17T20:43:17.760Z"),
      },
    },
  );
  console.log(result);
}

async function main() {
  await approvalCreateOrUpdate();
}

main().catch(console.error);
