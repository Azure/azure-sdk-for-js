// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the value assigned to a specific modifiable configuration (also known as server parameter) of a server.
 *
 * @summary updates the value assigned to a specific modifiable configuration (also known as server parameter) of a server.
 * x-ms-original-file: 2026-01-01-preview/ConfigurationsUpdate.json
 */
async function updateTheValueAssignedToASpecificModifiableConfigurationAlsoKnownAsServerParameterOfAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.configurations.update(
    "exampleresourcegroup",
    "exampleserver",
    "constraint_exclusion",
    { source: "user-override", value: "on" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateTheValueAssignedToASpecificModifiableConfigurationAlsoKnownAsServerParameterOfAServer();
}

main().catch(console.error);
