// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainRegistrationManagementClient } from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get all domains in a resource group.
 *
 * @summary description for Get all domains in a resource group.
 * x-ms-original-file: 2024-11-01/ListDomainsByResourceGroup.json
 */
async function listDomainsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new DomainRegistrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.domains.listByResourceGroup("testrg123")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDomainsByResourceGroup();
}

main().catch(console.error);
