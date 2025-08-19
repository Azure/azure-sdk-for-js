// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get private DNS zone suffix in the cloud.
 *
 * @summary Get private DNS zone suffix in the cloud.
 * x-ms-original-file: specification/mysql/resource-manager/Microsoft.DBforMySQL/ServiceOperations/stable/2023-12-30/examples/GetPrivateDnsZoneSuffix.json
 */
async function getPrivateDnsZoneSuffix(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential);
  const result = await client.getPrivateDnsZoneSuffix.execute();
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateDnsZoneSuffix();
}

main().catch(console.error);
