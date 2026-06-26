// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { InformaticaDataManagement } = require("@azure/arm-informaticadatamanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Metadata of the serverless runtime environment.
 *
 * @summary gets Metadata of the serverless runtime environment.
 * x-ms-original-file: 2025-11-27/Organizations_GetServerlessMetadata_MaximumSet_Gen.json
 */
async function organizationsGetServerlessMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.getServerlessMetadata("rg-example", "myOrganization");
  console.log(result);
}

/**
 * This sample demonstrates how to gets Metadata of the serverless runtime environment.
 *
 * @summary gets Metadata of the serverless runtime environment.
 * x-ms-original-file: 2025-11-27/Organizations_GetServerlessMetadata_MinimumSet_Gen.json
 */
async function organizationsGetServerlessMetadataMin() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.getServerlessMetadata("rg-example", "myOrganization");
  console.log(result);
}

async function main() {
  await organizationsGetServerlessMetadata();
  await organizationsGetServerlessMetadataMin();
}

main().catch(console.error);
