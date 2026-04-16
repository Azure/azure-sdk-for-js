// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainRegistrationManagementClient } from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Get all domains in a resource group.
 *
 * @summary Description for Get all domains in a resource group.
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/ListDomainsByResourceGroup.json
 */
async function listDomainsByResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["DOMAINREGISTRATION_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["DOMAINREGISTRATION_RESOURCE_GROUP"] || "testrg123";
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (const item of client.domains.listByResourceGroup(
    resourceGroupName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listDomainsByResourceGroup();
}

main().catch(console.error);
