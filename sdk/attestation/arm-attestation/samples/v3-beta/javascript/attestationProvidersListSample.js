// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AttestationManagementClient } = require("@azure/arm-attestation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a list of attestation providers in a subscription.
 *
 * @summary returns a list of attestation providers in a subscription.
 * x-ms-original-file: 2021-06-01/Get_AttestationProvidersList.json
 */
async function attestationProvidersList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.list();
  console.log(result);
}

async function main() {
  await attestationProvidersList();
}

main().catch(console.error);
