// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a governance assignment on the given subscription.
 *
 * @summary creates or updates a governance assignment on the given subscription.
 * x-ms-original-file: 2022-01-01-preview/GovernanceAssignments/PutGovernanceAssignment_example.json
 */
async function createGovernanceAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.governanceAssignments.createOrUpdate(
    "subscriptions/c32e05d9-7207-4e22-bdf4-4f7d9c72e5fd/resourceGroups/compute_servers/providers/Microsoft.Compute/virtualMachines/win2012",
    "6b9421dd-5555-2251-9b3d-2be58e2f82cd",
    "6634ff9f-127b-4bf2-8e6e-b1737f5e789c",
    {
      additionalData: {
        ticketLink: "https://snow.com",
        ticketNumber: 123123,
        ticketStatus: "Active",
      },
      governanceEmailNotification: {
        disableManagerEmailNotification: false,
        disableOwnerEmailNotification: false,
      },
      isGracePeriod: true,
      owner: "user@contoso.com",
      remediationDueDate: new Date("2022-01-07T13:00:00.0000000Z"),
      remediationEta: {
        eta: new Date("2022-01-08T13:00:00.0000000Z"),
        justification: "Justification of ETA",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createGovernanceAssignment();
}

main().catch(console.error);
