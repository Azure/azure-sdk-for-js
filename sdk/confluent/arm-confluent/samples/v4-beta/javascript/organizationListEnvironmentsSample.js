// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists of all the environments in a organization
 *
 * @summary lists of all the environments in a organization
 * x-ms-original-file: 2024-07-01/Organization_EnvironmentList.json
 */
async function organizationListEnvironments() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organization.listEnvironments(
    "myResourceGroup",
    "myOrganization",
    { pageSize: 10 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationListEnvironments();
}

main().catch(console.error);
