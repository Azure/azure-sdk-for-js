// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get properties of a verified partner.
 *
 * @summary get properties of a verified partner.
 * x-ms-original-file: 2025-07-15-preview/VerifiedPartners_Get.json
 */
async function verifiedPartnersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.verifiedPartners.get("Contoso.Finance");
  console.log(result);
}

async function main(): Promise<void> {
  await verifiedPartnersGet();
}

main().catch(console.error);
