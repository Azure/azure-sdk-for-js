// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Default Security contact configurations for the subscription
 *
 * @summary get Default Security contact configurations for the subscription
 * x-ms-original-file: 2023-12-01-preview/SecurityContacts/GetSecurityContact_example.json
 */
async function getASecurityContact() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.securityContacts.get("default");
  console.log(result);
}

async function main() {
  await getASecurityContact();
}

main().catch(console.error);
