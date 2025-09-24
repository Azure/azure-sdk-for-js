// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists GroupQuotas for the scope passed. It will return the GroupQuotas QuotaEntity properties only.The details on group quota can be access from the group quota APIs.
 *
 * @summary lists GroupQuotas for the scope passed. It will return the GroupQuotas QuotaEntity properties only.The details on group quota can be access from the group quota APIs.
 * x-ms-original-file: 2025-09-01/GroupQuotas/ListGroupQuotas.json
 */
async function groupQuotasListRequestForCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new AzureQuotaExtensionAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.groupQuotas.list("E7EC67B3-7657-4966-BFFC-41EFD36BAA09")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await groupQuotasListRequestForCompute();
}

main().catch(console.error);
