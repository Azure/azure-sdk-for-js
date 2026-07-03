// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureArcDataClient } from "@azure/arm-azurearcdata";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an Active Directory connector resource
 *
 * @summary deletes an Active Directory connector resource
 * x-ms-original-file: 2026-03-01-preview/DeleteActiveDirectoryConnector.json
 */
async function deletesAnActiveDirectoryConnectorInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  await client.activeDirectoryConnectors.delete("testrg", "testdataController", "testADConnector");
}

async function main(): Promise<void> {
  await deletesAnActiveDirectoryConnectorInstance();
}

main().catch(console.error);
