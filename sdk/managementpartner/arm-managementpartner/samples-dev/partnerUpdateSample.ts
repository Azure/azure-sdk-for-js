// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ACEProvisioningManagementPartnerAPI } from "@azure/arm-managementpartner";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update the management partner for the objectId and tenantId.
 *
 * @summary Update the management partner for the objectId and tenantId.
 * x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/PatchPartnerDetails.json
 */
async function patchPartnerDetails(): Promise<void> {
  const partnerId = "123456";
  const credential = new DefaultAzureCredential();
  const client = new ACEProvisioningManagementPartnerAPI(credential);
  const result = await client.partner.update(partnerId);
  console.log(result);
}

async function main(): Promise<void> {
  await patchPartnerDetails();
}

main().catch(console.error);
