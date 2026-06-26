// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a InformaticaOrganizationResource
 *
 * @summary get a InformaticaOrganizationResource
 * x-ms-original-file: 2025-11-27/Organizations_Get_MaximumSet_Gen.json
 */
async function organizationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.get("rg-example", "myOrganization");
  console.log(result);
}

/**
 * This sample demonstrates how to get a InformaticaOrganizationResource
 *
 * @summary get a InformaticaOrganizationResource
 * x-ms-original-file: 2025-11-27/Organizations_Get_MinimumSet_Gen.json
 */
async function organizationsGetMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.get("rg-example", "myOrganization");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGet();
  await organizationsGetMin();
}

main().catch(console.error);
