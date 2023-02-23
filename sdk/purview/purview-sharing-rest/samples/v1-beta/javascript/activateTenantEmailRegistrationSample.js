// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const createPurviewSharingClient = require("@azure-rest/purview-sharing").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Activates the email registration for current tenant
 *
 * @summary Activates the email registration for current tenant
 */
async function activateTenantEmailRegistrationSample() {
  const endpoint = process.env["ENDPOINT"] || "";
  const activationCode = process.env["ACTIVATION_CODE"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const options = {
    body: { properties: { activationCode } },
  };
  const result = await client.path("/emails:activate").post(options);
  console.log(result);
}

async function main() {
  activateTenantEmailRegistrationSample();
}

main().catch(console.error);
