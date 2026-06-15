// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the authorized application details.
 *
 * @summary gets the authorized application details.
 * x-ms-original-file: 2024-09-01/AuthorizedApplications_Get.json
 */
async function authorizedApplicationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.authorizedApplications.get(
    "Microsoft.Contoso",
    "760505bf-dcfa-4311-b890-18da392a00b2",
  );
  console.log(result);
}

async function main() {
  await authorizedApplicationsGet();
}

main().catch(console.error);
