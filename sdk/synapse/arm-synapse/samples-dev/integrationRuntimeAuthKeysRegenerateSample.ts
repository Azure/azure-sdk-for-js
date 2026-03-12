// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerate the authentication key for an integration runtime
 *
 * @summary Regenerate the authentication key for an integration runtime
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/preview/2021-06-01-preview/examples/IntegrationRuntimes_RegenerateAuthKey.json
 */

import type { IntegrationRuntimeRegenerateKeyParameters } from "@azure/arm-synapse";
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function regenerateAuthKey(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "exampleResourceGroup";
  const workspaceName = "exampleWorkspace";
  const integrationRuntimeName = "exampleIntegrationRuntime";
  const regenerateKeyParameters: IntegrationRuntimeRegenerateKeyParameters = {
    keyName: "authKey2",
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimeAuthKeysOperations.regenerate(
    resourceGroupName,
    workspaceName,
    integrationRuntimeName,
    regenerateKeyParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await regenerateAuthKey();
}

main().catch(console.error);
