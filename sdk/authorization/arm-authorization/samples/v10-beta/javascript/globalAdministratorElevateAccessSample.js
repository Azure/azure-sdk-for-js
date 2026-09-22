// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to elevates access for a Global Administrator.
 *
 * @summary elevates access for a Global Administrator.
 * x-ms-original-file: 2015-07-01/ElevateAccess.json
 */
async function elevateAccessGlobalAdministrator() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.globalAdministrator.elevateAccess();
}

async function main() {
  await elevateAccessGlobalAdministrator();
}

main().catch(console.error);
