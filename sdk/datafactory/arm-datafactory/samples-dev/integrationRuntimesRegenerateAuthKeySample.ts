// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerates the authentication key for an integration runtime.
 *
 * @summary Regenerates the authentication key for an integration runtime.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/IntegrationRuntimes_RegenerateAuthKey.json
 */

import {
  IntegrationRuntimeRegenerateKeyParameters,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function integrationRuntimesRegenerateAuthKey(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const integrationRuntimeName = "exampleIntegrationRuntime";
  const regenerateKeyParameters: IntegrationRuntimeRegenerateKeyParameters = {
    keyName: "authKey2",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.regenerateAuthKey(
    resourceGroupName,
    factoryName,
    integrationRuntimeName,
    regenerateKeyParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimesRegenerateAuthKey();
}

main().catch(console.error);
