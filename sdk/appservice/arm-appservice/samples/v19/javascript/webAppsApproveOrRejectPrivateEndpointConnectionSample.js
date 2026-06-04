// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Approves or rejects a private endpoint connection
 *
 * @summary description for Approves or rejects a private endpoint connection
 * x-ms-original-file: 2025-05-01/ApproveRejectSitePrivateEndpointConnection.json
 */
async function approvesOrRejectsAPrivateEndpointConnectionForASite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.approveOrRejectPrivateEndpointConnection(
    "rg",
    "testSite",
    "connection",
    {
      privateLinkServiceConnectionState: {
        description: "Approved by admin.",
        actionsRequired: "",
        status: "Approved",
      },
    },
  );
  console.log(result);
}

async function main() {
  await approvesOrRejectsAPrivateEndpointConnectionForASite();
}

main().catch(console.error);
