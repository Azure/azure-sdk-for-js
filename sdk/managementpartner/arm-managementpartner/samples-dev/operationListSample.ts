// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ACEProvisioningManagementPartnerAPI } from "@azure/arm-managementpartner";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all the operations.
 *
 * @summary List all the operations.
 * x-ms-original-file: specification/managementpartner/resource-manager/Microsoft.ManagementPartner/preview/2018-02-01/examples/GetOperations.json
 */
async function getOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ACEProvisioningManagementPartnerAPI(credential);
  const resArray = new Array();
  for await (const item of client.operation.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getOperations();
}

main().catch(console.error);
