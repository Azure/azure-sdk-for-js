// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an alert.
 *
 * @summary update an alert.
 * x-ms-original-file: 2022-08-01-preview/UpdateAlert.json
 */
async function deactivateAlert() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.alerts.update(
    "subscriptions/afa2a084-766f-4003-8ae1-c4aeb893a99f",
    "TooManyPermanentOwnersAssignedToResource",
    { isActive: false },
  );
}

async function main() {
  await deactivateAlert();
}

main().catch(console.error);
