// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to elevates access for a Global Administrator.
 *
 * @summary elevates access for a Global Administrator.
 * x-ms-original-file: 2015-07-01/ElevateAccess.json
 */
async function elevateAccessGlobalAdministrator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.globalAdministrator.elevateAccess();
}

async function main(): Promise<void> {
  await elevateAccessGlobalAdministrator();
}

main().catch(console.error);
