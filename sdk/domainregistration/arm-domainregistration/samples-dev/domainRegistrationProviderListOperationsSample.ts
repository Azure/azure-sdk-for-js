// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainRegistrationManagementClient } from "@azure/arm-domainregistration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider
 *
 * @summary Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider
 * x-ms-original-file: specification/domainregistration/resource-manager/Microsoft.DomainRegistration/DomainRegistration/stable/2024-11-01/examples/ListOperations.json
 */
async function listOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DomainRegistrationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.domainRegistrationProvider.listOperations()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listOperations();
}

main().catch(console.error);
