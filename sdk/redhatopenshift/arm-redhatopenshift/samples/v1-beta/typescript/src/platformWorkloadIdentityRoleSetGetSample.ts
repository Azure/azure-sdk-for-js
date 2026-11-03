// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureRedHatOpenShiftClient } from "@azure/arm-redhatopenshift";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation returns Platform Workload Identity Role Set as a string
 *
 * @summary this operation returns Platform Workload Identity Role Set as a string
 * x-ms-original-file: 2025-07-25/PlatformWorkloadIdentityRoleSet_Get.json
 */
async function getsAMappingOfAnOpenShiftVersionToIdentityRequirementsWhichIncludesOperatorNameRoleDefinitionNameRoleDefinitionIdAndServiceAccounts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.platformWorkloadIdentityRoleSet.get("location", "4.14");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAMappingOfAnOpenShiftVersionToIdentityRequirementsWhichIncludesOperatorNameRoleDefinitionNameRoleDefinitionIdAndServiceAccounts();
}

main().catch(console.error);
