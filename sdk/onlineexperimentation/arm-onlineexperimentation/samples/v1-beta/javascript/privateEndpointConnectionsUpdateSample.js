// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OnlineExperimentationClient } = require("@azure/arm-onlineexperimentation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates private endpoint connection status (Approval/Rejected) for an online experimentation workspace resource. This gets invoked by resource admin.
 *
 * @summary updates private endpoint connection status (Approval/Rejected) for an online experimentation workspace resource. This gets invoked by resource admin.
 * x-ms-original-file: 2025-08-01-preview/PrivateEndpointConnection_Update.json
 */
async function updatesThePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fa5fc227-a624-475e-b696-cdd604c735bc";
  const client = new OnlineExperimentationClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.update(
    "2025-08-01-preview",
    "res9871",
    "expworkspace3",
    "jitf",
    {
      properties: {
        privateLinkServiceConnectionState: {
          status: "Approved",
          description: "y",
          actionsRequired: "afwbq",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await updatesThePrivateEndpointConnection();
}

main().catch(console.error);
