// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureRedHatOpenShiftClient } = require("@azure/arm-redhatopenshift");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation returns a list of Platform Workload Identity Role Sets as a string
 *
 * @summary this operation returns a list of Platform Workload Identity Role Sets as a string
 * x-ms-original-file: 2025-07-25/PlatformWorkloadIdentityRoleSets_List.json
 */
async function listsAMappingOfOpenShiftVersionsToIdentityRequirementsWhichIncludeOperatorNameRoleDefinitionNameRoleDefinitionIdAndServiceAccounts() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureRedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.platformWorkloadIdentityRoleSets.list("location")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAMappingOfOpenShiftVersionsToIdentityRequirementsWhichIncludeOperatorNameRoleDefinitionNameRoleDefinitionIdAndServiceAccounts();
}

main().catch(console.error);
