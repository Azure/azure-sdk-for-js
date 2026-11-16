// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the service-created PostgreSQL username-and-password authentication method. The request is sparse and omitted properties preserve their current values. This API version supports enabling the method, disabling the method, and resetting its password. For a cluster that already has an administrator but currently has password authentication disabled, state Enabled and administratorLoginPassword can be supplied together to re-enable password authentication and reset the password. Disabling cannot include credentials and does not remove or modify existing database users or roles. Administrator rename is not supported in this API version.
 *
 * @summary updates the service-created PostgreSQL username-and-password authentication method. The request is sparse and omitted properties preserve their current values. This API version supports enabling the method, disabling the method, and resetting its password. For a cluster that already has an administrator but currently has password authentication disabled, state Enabled and administratorLoginPassword can be supplied together to re-enable password authentication and reset the password. Disabling cannot include credentials and does not remove or modify existing database users or roles. Administrator rename is not supported in this API version.
 * x-ms-original-file: 2026-10-01-preview/PasswordAuthentications_Disable.json
 */
async function disablePasswordAuthentication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.passwordAuthentications.update(
    "example-resource-group",
    "example-cluster",
    { properties: { state: "Disabled" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates the service-created PostgreSQL username-and-password authentication method. The request is sparse and omitted properties preserve their current values. This API version supports enabling the method, disabling the method, and resetting its password. For a cluster that already has an administrator but currently has password authentication disabled, state Enabled and administratorLoginPassword can be supplied together to re-enable password authentication and reset the password. Disabling cannot include credentials and does not remove or modify existing database users or roles. Administrator rename is not supported in this API version.
 *
 * @summary updates the service-created PostgreSQL username-and-password authentication method. The request is sparse and omitted properties preserve their current values. This API version supports enabling the method, disabling the method, and resetting its password. For a cluster that already has an administrator but currently has password authentication disabled, state Enabled and administratorLoginPassword can be supplied together to re-enable password authentication and reset the password. Disabling cannot include credentials and does not remove or modify existing database users or roles. Administrator rename is not supported in this API version.
 * x-ms-original-file: 2026-10-01-preview/PasswordAuthentications_Enable.json
 */
async function enablePasswordAuthenticationAndResetTheExistingAdministratorPassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.passwordAuthentications.update(
    "example-resource-group",
    "example-cluster",
    { properties: { state: "Enabled", administratorLoginPassword: "********" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates the service-created PostgreSQL username-and-password authentication method. The request is sparse and omitted properties preserve their current values. This API version supports enabling the method, disabling the method, and resetting its password. For a cluster that already has an administrator but currently has password authentication disabled, state Enabled and administratorLoginPassword can be supplied together to re-enable password authentication and reset the password. Disabling cannot include credentials and does not remove or modify existing database users or roles. Administrator rename is not supported in this API version.
 *
 * @summary updates the service-created PostgreSQL username-and-password authentication method. The request is sparse and omitted properties preserve their current values. This API version supports enabling the method, disabling the method, and resetting its password. For a cluster that already has an administrator but currently has password authentication disabled, state Enabled and administratorLoginPassword can be supplied together to re-enable password authentication and reset the password. Disabling cannot include credentials and does not remove or modify existing database users or roles. Administrator rename is not supported in this API version.
 * x-ms-original-file: 2026-10-01-preview/PasswordAuthentications_ResetPassword.json
 */
async function resetTheSolePostgreSQLAdministratorRolePassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.passwordAuthentications.update(
    "example-resource-group",
    "example-cluster",
    { properties: { administratorLoginPassword: "********" } },
  );
  console.log(result);
}

async function main() {
  await disablePasswordAuthentication();
  await enablePasswordAuthenticationAndResetTheExistingAdministratorPassword();
  await resetTheSolePostgreSQLAdministratorRolePassword();
}

main().catch(console.error);
