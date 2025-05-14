// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to action to retrieve the connection URI for the Neon Database.
 *
 * @summary action to retrieve the connection URI for the Neon Database.
 * x-ms-original-file: 2025-03-01/Projects_GetConnectionUri_MaximumSet_Gen.json
 */
async function projectsGetConnectionUriMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.projects.getConnectionUri(
    "rgneon",
    "contoso-org",
    "sample-resource",
    {
      projectId: "riuifmoqtorrcffgksvfcobia",
      branchId: "iimmlbqv",
      databaseName: "xc",
      roleName: "xhmcvsgtp",
      endpointId: "jcpdvsyjcn",
      isPooled: true,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await projectsGetConnectionUriMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
