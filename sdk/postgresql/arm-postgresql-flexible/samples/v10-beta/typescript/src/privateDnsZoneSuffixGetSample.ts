// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private DNS zone suffix.
 *
 * @summary gets the private DNS zone suffix.
 * x-ms-original-file: 2026-01-01-preview/PrivateDnsZoneSuffixGet.json
 */
async function getThePrivateDNSSuffix(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential);
  const result = await client.privateDnsZoneSuffix.get();
  console.log(result);
}

async function main(): Promise<void> {
  await getThePrivateDNSSuffix();
}

main().catch(console.error);
