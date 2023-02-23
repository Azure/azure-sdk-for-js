// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const createPurviewSharingClient = require("@azure-rest/purview-sharing").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Register an email for the current tenant
 *
 * @summary Register an email for the current tenant
 */
async function registerTenantEmail() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const result = await client.path("/emails:register").post();
  console.log(result);
}

async function main() {
  registerTenantEmail();
}

main().catch(console.error);
