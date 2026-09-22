// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified alert definition.
 *
 * @summary get the specified alert definition.
 * x-ms-original-file: 2022-08-01-preview/GetAlertDefinitionById.json
 */
async function getAlertDefinitionById() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.alertDefinitions.get(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
    "TooManyPermanentOwnersAssignedToResource",
  );
  console.log(result);
}

async function main() {
  await getAlertDefinitionById();
}

main().catch(console.error);
