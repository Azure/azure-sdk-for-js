// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create a management partner for the objectId and tenantId.
 *
 * @summary Create a management partner for the objectId and tenantId.
 * x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/PutPartnerDetails.json
 */

import { ACEProvisioningManagementPartnerAPI } from "@azure/arm-managementpartner";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putPartnerDetails(): Promise<void> {
  const partnerId = "123456";
  const credential = new DefaultAzureCredential();
  const client = new ACEProvisioningManagementPartnerAPI(credential);
  const result = await client.partner.create(partnerId);
  console.log(result);
}

async function main(): Promise<void> {
  await putPartnerDetails();
}

main().catch(console.error);
