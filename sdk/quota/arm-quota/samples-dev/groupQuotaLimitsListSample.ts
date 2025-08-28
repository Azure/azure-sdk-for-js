// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the GroupQuotaLimits for the specified resource provider and location for resource names passed in $filter=resourceName eq {SKU}.
 *
 * @summary Gets the GroupQuotaLimits for the specified resource provider and location for resource names passed in $filter=resourceName eq {SKU}.
 * x-ms-original-file: specification/quota/resource-manager/Microsoft.Quota/stable/2025-03-01/examples/GroupQuotaLimits/ListGroupQuotaLimits-Compute.json
 */

import { AzureQuotaExtensionAPI } from "@azure/arm-quota";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function groupQuotaLimitsGetRequestForCompute(): Promise<void> {
  const managementGroupId = "E7EC67B3-7657-4966-BFFC-41EFD36BAA09";
  const groupQuotaName = "groupquota1";
  const resourceProviderName = "Microsoft.Compute";
  const location = "westus";
  const credential = new DefaultAzureCredential();
  const client = new AzureQuotaExtensionAPI(credential);
  const result = await client.groupQuotaLimits.list(
    managementGroupId,
    groupQuotaName,
    resourceProviderName,
    location,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await groupQuotaLimitsGetRequestForCompute();
}

main().catch(console.error);
