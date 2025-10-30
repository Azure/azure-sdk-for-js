// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to register a Search query
 *
 * @summary register a Search query
 * x-ms-original-file: 2025-04-30-preview/MosaicsRegisterSearch_Register.json
 */
async function mosaicsRegisterSearchRegister(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.registerMosaicsSearch();
  console.log(result);
}

async function main(): Promise<void> {
  await mosaicsRegisterSearchRegister();
}

main().catch(console.error);
