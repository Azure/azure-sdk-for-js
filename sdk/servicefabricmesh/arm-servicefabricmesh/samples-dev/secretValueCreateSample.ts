// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a new value of the specified secret resource. The name of the value is typically the version identifier. Once created the value cannot be changed.
 *
 * @summary Creates a new value of the specified secret resource. The name of the value is typically the version identifier. Once created the value cannot be changed.
 * x-ms-original-file: specification/servicefabricmesh/resource-manager/Microsoft.ServiceFabricMesh/preview/2018-09-01-preview/examples/secrets/values/create.json
 */

import type { SecretValueResourceDescription } from "@azure/arm-servicefabricmesh";
import { ServiceFabricMeshManagementClient } from "@azure/arm-servicefabricmesh";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createSecretValue(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEFABRICMESH_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SERVICEFABRICMESH_RESOURCE_GROUP"] || "sbz_demo";
  const secretResourceName = "dbConnectionString";
  const secretValueResourceName = "v1";
  const secretValueResourceDescription: SecretValueResourceDescription = {
    name: "v1",
    location: "West US",
    value:
      "mongodb://contoso123:0Fc3IolnL12312asdfawejunASDF@asdfYXX2t8a97kghVcUzcDv98hawelufhawefafnoQRGwNj2nMPL1Y9qsIr9Srdw==@contoso123.documents.azure.com:10255/mydatabase?ssl=true",
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceFabricMeshManagementClient(credential, subscriptionId);
  const result = await client.secretValueOperations.create(
    resourceGroupName,
    secretResourceName,
    secretValueResourceName,
    secretValueResourceDescription,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createSecretValue();
}

main().catch(console.error);
