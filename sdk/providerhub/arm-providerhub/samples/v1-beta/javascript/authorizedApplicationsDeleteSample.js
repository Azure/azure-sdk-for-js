// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an authorized application.
 *
 * @summary deletes an authorized application.
 * x-ms-original-file: 2024-09-01/AuthorizedApplications_Delete.json
 */
async function authorizedApplicationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.authorizedApplications.delete(
    "Microsoft.Contoso",
    "760505bf-dcfa-4311-b890-18da392a00b2",
  );
}

async function main() {
  await authorizedApplicationsDelete();
}

main().catch(console.error);
