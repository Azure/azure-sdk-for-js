// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get properties of a verified partner.
 *
 * @summary Get properties of a verified partner.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/VerifiedPartners_Get.json
 */

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function verifiedPartnersGet(): Promise<void> {
  const verifiedPartnerName = "Contoso.Finance";
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.verifiedPartners.get(verifiedPartnerName);
  console.log(result);
}

async function main(): Promise<void> {
  await verifiedPartnersGet();
}

main().catch(console.error);
