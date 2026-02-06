// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlanetaryComputerProClient } = require("@azure/planetarycomputer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to register a Search query
 *
 * @summary register a Search query
 * x-ms-original-file: 2025-04-30-preview/MosaicsRegisterSearch_Register.json
 */
async function mosaicsRegisterSearchRegister() {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.registerMosaicsSearch();
  console.log(result);
}

async function main() {
  await mosaicsRegisterSearchRegister();
}

main().catch(console.error);
