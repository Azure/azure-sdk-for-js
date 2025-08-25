// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get private DNS zone suffix in the cloud
 *
 * @summary Get private DNS zone suffix in the cloud
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/GetPrivateDnsZoneSuffix.json
 */

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getPrivateDnsZoneSuffix(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential);
  const result = await client.getPrivateDnsZoneSuffix.execute();
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateDnsZoneSuffix();
}

main().catch(console.error);
