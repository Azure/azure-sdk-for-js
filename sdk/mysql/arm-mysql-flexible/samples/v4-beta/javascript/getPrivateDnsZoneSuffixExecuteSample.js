// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get private DNS zone suffix in the cloud.
 *
 * @summary get private DNS zone suffix in the cloud.
 * x-ms-original-file: 2025-06-01-preview/GetPrivateDnsZoneSuffix.json
 */
async function getPrivateDnsZoneSuffix() {
  const credential = new DefaultAzureCredential();
  const client = new MySQLManagementFlexibleServerClient(credential);
  const result = await client.getPrivateDnsZoneSuffix.execute();
  console.log(result);
}

async function main() {
  await getPrivateDnsZoneSuffix();
}

main().catch(console.error);
