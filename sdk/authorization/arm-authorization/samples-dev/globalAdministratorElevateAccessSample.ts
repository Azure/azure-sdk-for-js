// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Elevates access for a Global Administrator.
 *
 * @summary Elevates access for a Global Administrator.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/ElevateAccess.json
 */
async function elevateAccessGlobalAdministrator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.globalAdministrator.elevateAccess();
  console.log(result);
}

async function main(): Promise<void> {
  await elevateAccessGlobalAdministrator();
}

main().catch(console.error);
