// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DBforPostgreSQLClient } from "@azure/arm-postgresqlhsc";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks availability of a cluster name. Cluster names should be globally unique; at least 3 characters and at most 40 characters long; they must only contain lowercase letters, numbers, and hyphens; and must not start or end with a hyphen.
 *
 * @summary checks availability of a cluster name. Cluster names should be globally unique; at least 3 characters and at most 40 characters long; they must only contain lowercase letters, numbers, and hyphens; and must not start or end with a hyphen.
 * x-ms-original-file: 2023-03-02-preview/CheckNameAvailability.json
 */
async function checkNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.checkNameAvailability({
    name: "name1",
    type: "Microsoft.DBforPostgreSQL/serverGroupsv2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await checkNameAvailability();
}

main().catch(console.error);
