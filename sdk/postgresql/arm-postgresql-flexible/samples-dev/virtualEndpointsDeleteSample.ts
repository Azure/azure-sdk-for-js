// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a virtual endpoint.
 *
 * @summary Deletes a virtual endpoint.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/VirtualEndpointDelete.json
 */

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAVirtualEndpoint(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "pgtestsvc4";
  const virtualEndpointName = "pgVirtualEndpoint1";
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.virtualEndpoints.beginDeleteAndWait(
    resourceGroupName,
    serverName,
    virtualEndpointName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAVirtualEndpoint();
}

main().catch(console.error);
