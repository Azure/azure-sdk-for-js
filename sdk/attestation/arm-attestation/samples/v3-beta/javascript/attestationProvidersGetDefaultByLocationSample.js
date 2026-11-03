// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AttestationManagementClient } = require("@azure/arm-attestation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the default provider by location.
 *
 * @summary get the default provider by location.
 * x-ms-original-file: 2021-06-01/Get_DefaultProviderByLocation.json
 */
async function attestationProvidersGetDefaultWithLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6c96b33e-f5b8-40a6-9011-5cb1c58b0915";
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.getDefaultByLocation("Central US");
  console.log(result);
}

async function main() {
  await attestationProvidersGetDefaultWithLocation();
}

main().catch(console.error);
