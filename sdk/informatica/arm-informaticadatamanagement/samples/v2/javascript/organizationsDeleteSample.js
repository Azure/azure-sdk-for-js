// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { InformaticaDataManagement } = require("@azure/arm-informaticadatamanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a InformaticaOrganizationResource
 *
 * @summary delete a InformaticaOrganizationResource
 * x-ms-original-file: 2025-11-27/Organizations_Delete_MaximumSet_Gen.json
 */
async function organizationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  await client.organizations.delete("rg-example", "myOrganization");
}

/**
 * This sample demonstrates how to delete a InformaticaOrganizationResource
 *
 * @summary delete a InformaticaOrganizationResource
 * x-ms-original-file: 2025-11-27/Organizations_Delete_MinimumSet_Gen.json
 */
async function organizationsDeleteMin() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  await client.organizations.delete("rg-example", "myOrganization");
}

async function main() {
  await organizationsDelete();
  await organizationsDeleteMin();
}

main().catch(console.error);
