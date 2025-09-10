// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Checks that the data connection parameters are valid.
 *
 * @summary Checks that the data connection parameters are valid.
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/preview/2021-06-01-preview/examples/KustoPoolDataConnectionValidation.json
 */

import type { DataConnectionValidation } from "@azure/arm-synapse";
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function kustoPoolDataConnectionValidation(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "kustorptest";
  const workspaceName = "kustorptest";
  const kustoPoolName = "kustoclusterrptest4";
  const databaseName = "KustoDatabase8";
  const parameters: DataConnectionValidation = {
    dataConnectionName: "DataConnections8",
    properties: { kind: "EventHub" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.kustoPoolDataConnections.beginDataConnectionValidationAndWait(
    resourceGroupName,
    workspaceName,
    kustoPoolName,
    databaseName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoPoolDataConnectionValidation();
}

main().catch(console.error);
