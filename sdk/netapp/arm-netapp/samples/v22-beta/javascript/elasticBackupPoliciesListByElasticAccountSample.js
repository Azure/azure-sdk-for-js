// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list and describe all Elastic Backup Policies in the elastic account.
 *
 * @summary list and describe all Elastic Backup Policies in the elastic account.
 * x-ms-original-file: 2025-09-01-preview/ElasticBackupPolicies_List.json
 */
async function elasticBackupPoliciesListByElasticAccount() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.elasticBackupPolicies.listByElasticAccount("myRG", "account1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await elasticBackupPoliciesListByElasticAccount();
}

main().catch(console.error);
