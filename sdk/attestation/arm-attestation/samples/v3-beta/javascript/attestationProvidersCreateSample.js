// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AttestationManagementClient } = require("@azure/arm-attestation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Attestation Provider.
 *
 * @summary creates or updates an Attestation Provider.
 * x-ms-original-file: 2021-06-01/Create_AttestationProvider.json
 */
async function attestationProvidersCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.create(
    "MyResourceGroup",
    "myattestationprovider",
    {
      location: "East US",
      properties: { publicNetworkAccess: "Enabled", tpmAttestationAuthentication: "Enabled" },
      tags: { Property1: "Value1", Property2: "Value2", Property3: "Value3" },
    },
  );
  console.log(result);
}

async function main() {
  await attestationProvidersCreate();
}

main().catch(console.error);
