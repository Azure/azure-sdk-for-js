// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Approves or rejects a private endpoint connection
 *
 * @summary description for Approves or rejects a private endpoint connection
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_ApproveOrRejectPrivateEndpointConnection.json
 */
async function approvesOrRejectsAPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.approveOrRejectPrivateEndpointConnection(
    "test-rg",
    "test-ase",
    "fa38656c-034e-43d8-adce-fe06ce039c98",
    {
      privateLinkServiceConnectionState: {
        description: "Approved by johndoe@company.com",
        status: "Approved",
      },
    },
  );
  console.log(result);
}

async function main() {
  await approvesOrRejectsAPrivateEndpointConnection();
}

main().catch(console.error);
