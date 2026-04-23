// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the admin action, weather the request is approved or rejected and the approved plans
 *
 * @summary update the admin action, weather the request is approved or rejected and the approved plans
 * x-ms-original-file: 2025-01-01/UpdateAdminRequestApproval.json
 */
async function updateAdminRequestApproval() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.updateAdminRequestApproval(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "marketplacetestthirdparty.md-test-third-party-2",
    {
      payload: {
        adminAction: "Approved",
        approvedPlans: ["testPlan"],
        collectionIds: [
          "f8ee227e-85d7-477d-abbf-854d6decaf70",
          "39246ad6-c521-4fed-8de7-77dede2e873f",
        ],
        comment: "I'm ok with that",
        publisherId: "marketplacetestthirdparty",
      },
    },
  );
  console.log(result);
}

async function main() {
  await updateAdminRequestApproval();
}

main().catch(console.error);
