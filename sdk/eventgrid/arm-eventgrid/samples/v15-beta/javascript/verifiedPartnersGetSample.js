// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of a verified partner.
 *
 * @summary get properties of a verified partner.
 * x-ms-original-file: 2025-07-15-preview/VerifiedPartners_Get.json
 */
async function verifiedPartnersGet() {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.verifiedPartners.get("Contoso.Finance");
  console.log(result);
}

async function main() {
  await verifiedPartnersGet();
}

main().catch(console.error);
