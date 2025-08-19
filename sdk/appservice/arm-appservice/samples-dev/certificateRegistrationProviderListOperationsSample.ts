// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider
 *
 * @summary Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider
 * x-ms-original-file: specification/web/resource-manager/Microsoft.CertificateRegistration/stable/2024-11-01/examples/ListOperations.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.certificateRegistrationProvider.listOperations()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listOperations();
}

main().catch(console.error);
