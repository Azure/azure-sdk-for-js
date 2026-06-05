// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureRedHatOpenShiftClient } = require("@azure/arm-redhatopenshift");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation returns Platform Workload Identity Role Set as a string
 *
 * @summary this operation returns Platform Workload Identity Role Set as a string
 * x-ms-original-file: 2025-07-25/PlatformWorkloadIdentityRoleSet_Get.json
 */
async function getsAMappingOfAnOpenShiftVersionToIdentityRequirementsWhichIncludesOperatorNameRoleDefinitionNameRoleDefinitionIdAndServiceAccounts() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.platformWorkloadIdentityRoleSet.get("location", "4.14");
  console.log(result);
}

async function main() {
  await getsAMappingOfAnOpenShiftVersionToIdentityRequirementsWhichIncludesOperatorNameRoleDefinitionNameRoleDefinitionIdAndServiceAccounts();
}

main().catch(console.error);
