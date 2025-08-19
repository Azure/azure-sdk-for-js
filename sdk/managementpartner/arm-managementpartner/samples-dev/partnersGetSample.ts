// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ACEProvisioningManagementPartnerAPI } from "@azure/arm-managementpartner";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the management partner using the objectId and tenantId.
 *
 * @summary Get the management partner using the objectId and tenantId.
 * x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/GetPartnerDetailsNoPartnerId.json
 */
async function getPartnerDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ACEProvisioningManagementPartnerAPI(credential);
  const result = await client.partners.get();
  console.log(result);
}

async function main(): Promise<void> {
  await getPartnerDetails();
}

main().catch(console.error);
