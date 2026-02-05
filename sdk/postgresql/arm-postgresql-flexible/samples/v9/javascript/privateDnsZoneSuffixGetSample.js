// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the private DNS zone suffix.
 *
 * @summary Gets the private DNS zone suffix.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/stable/2025-08-01/examples/PrivateDnsZoneSuffixGet.json
 */
async function getThePrivateDnsSuffix() {
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential);
  const result = await client.privateDnsZoneSuffix.get();
  console.log(result);
}

async function main() {
  await getThePrivateDnsSuffix();
}

main().catch(console.error);
