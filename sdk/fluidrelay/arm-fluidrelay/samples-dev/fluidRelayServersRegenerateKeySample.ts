// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RegenerateKeyRequest } from "@azure/arm-fluidrelay";
import { FluidRelayManagementClient } from "@azure/arm-fluidrelay";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Regenerate the primary or secondary key for this server.
 *
 * @summary Regenerate the primary or secondary key for this server.
 * x-ms-original-file: specification/fluidrelay/resource-manager/Microsoft.FluidRelay/stable/2022-06-01/examples/FluidRelayServers_RegenerateKeys.json
 */
async function regenerateKeysForAFluidRelayServer(): Promise<void> {
  const subscriptionId = process.env["FLUIDRELAY_SUBSCRIPTION_ID"] || "xxxx-xxxx-xxxx-xxxx";
  const resourceGroup = "myResourceGroup";
  const fluidRelayServerName = "myFluidRelayServer";
  const parameters: RegenerateKeyRequest = { keyName: "key1" };
  const credential = new DefaultAzureCredential();
  const client = new FluidRelayManagementClient(credential, subscriptionId);
  const result = await client.fluidRelayServers.regenerateKey(
    resourceGroup,
    fluidRelayServerName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await regenerateKeysForAFluidRelayServer();
}

main().catch(console.error);
