// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the GroupQuotas for the name passed. All the remaining shareQuota in the GroupQuotas will be lost.
 *
 * @summary Deletes the GroupQuotas for the name passed. All the remaining shareQuota in the GroupQuotas will be lost.
 * x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/stable/2025-03-01/examples/GroupQuotas/DeleteGroupQuotas.json
 */

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function groupQuotasDeleteRequestForCompute(): Promise<void> {
  const managementGroupId = "E7EC67B3-7657-4966-BFFC-41EFD36BAA09";
  const groupQuotaName = "groupquota1";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.groupQuotas.beginDeleteAndWait(
    managementGroupId,
    groupQuotaName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await groupQuotasDeleteRequestForCompute();
}

main().catch(console.error);
