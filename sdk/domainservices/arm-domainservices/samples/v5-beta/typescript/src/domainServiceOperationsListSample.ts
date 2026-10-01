// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DomainServicesResourceProvider } from "@azure/arm-domainservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the available Domain Services operations.
 *
 * @summary lists all the available Domain Services operations.
 * x-ms-original-file: 2025-10-01-preview/GetOperations.json
 */
async function getOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new DomainServicesResourceProvider(credential);
  const resArray = new Array();
  for await (const item of client.domainServiceOperations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getOperations();
}

main().catch(console.error);
