// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureQuotaExtensionAPI } = require("@azure/arm-quota");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists GroupQuotas for the scope passed. It will return the GroupQuotas QuotaEntity properties only.The details on group quota can be access from the group quota APIs.
 *
 * @summary lists GroupQuotas for the scope passed. It will return the GroupQuotas QuotaEntity properties only.The details on group quota can be access from the group quota APIs.
 * x-ms-original-file: 2026-09-01-preview/GroupQuotas/ListGroupQuotas.json
 */
async function groupQuotasListRequestForCompute() {
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const resArray = new Array();
  for await (const item of client.groupQuotas.list("E7EC67B3-7657-4966-BFFC-41EFD36BAA09")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await groupQuotasListRequestForCompute();
}

main().catch(console.error);
