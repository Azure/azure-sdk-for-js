// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists of all the environments in a organization
 *
 * @summary lists of all the environments in a organization
 * x-ms-original-file: 2024-07-01/Organization_EnvironmentList.json
 */
async function organizationListEnvironments(): Promise<void> {
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

async function main(): Promise<void> {
  await organizationListEnvironments();
}

main().catch(console.error);
