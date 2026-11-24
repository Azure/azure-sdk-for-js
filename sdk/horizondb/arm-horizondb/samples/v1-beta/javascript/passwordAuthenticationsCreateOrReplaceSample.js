// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces the service-created PostgreSQL username-and-password authentication method.
 *
 * @summary creates or replaces the service-created PostgreSQL username-and-password authentication method.
 * x-ms-original-file: 2026-10-01-preview/PasswordAuthentications_CreateOrReplace.json
 */
async function enablePasswordAuthenticationAndSetTheAdministratorLoginAndPasswordDuringInitialSetup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.passwordAuthentications.createOrReplace(
    "example-resource-group",
    "example-cluster",
    {
      properties: {
        state: "Enabled",
        administratorLogin: "adminlogin1",
        administratorLoginPassword: "********",
      },
    },
  );
  console.log(result);
}

async function main() {
  await enablePasswordAuthenticationAndSetTheAdministratorLoginAndPasswordDuringInitialSetup();
}

main().catch(console.error);
