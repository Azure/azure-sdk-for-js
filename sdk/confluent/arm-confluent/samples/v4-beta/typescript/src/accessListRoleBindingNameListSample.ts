// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2024-07-01/Access_RoleBindingNameList.json
 */
async function accessRoleBindingNameList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listRoleBindingNameList("myResourceGroup", "myOrganization", {
    searchFilters: {
      crn_pattern: "crn://confluent.cloud/organization=1aa7de07-298e-479c-8f2f-16ac91fd8e76",
      namespace:
        "public,dataplane,networking,identity,datagovernance,connect,streamcatalog,pipelines,ksql",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await accessRoleBindingNameList();
}

main().catch(console.error);
