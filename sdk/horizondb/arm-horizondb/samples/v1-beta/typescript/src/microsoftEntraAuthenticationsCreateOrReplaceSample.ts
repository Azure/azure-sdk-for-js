// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces the service-created Microsoft Entra authentication method. State Enabled enables the feature and State Disabled disables it; no additional properties are required. Repeating the same request is idempotent. Disabling the feature does not remove or modify database roles or users previously created through the MicrosoftEntraAdministrators control-plane API or directly through pgaadauth extension functions.
 *
 * @summary creates or replaces the service-created Microsoft Entra authentication method. State Enabled enables the feature and State Disabled disables it; no additional properties are required. Repeating the same request is idempotent. Disabling the feature does not remove or modify database roles or users previously created through the MicrosoftEntraAdministrators control-plane API or directly through pgaadauth extension functions.
 * x-ms-original-file: 2026-10-01-preview/MicrosoftEntraAuthentications_CreateOrReplaceDisabled.json
 */
async function disableMicrosoftEntraAuthenticationDeclaratively(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.microsoftEntraAuthentications.createOrReplace(
    "example-resource-group",
    "example-cluster",
    { properties: { state: "Disabled" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or replaces the service-created Microsoft Entra authentication method. State Enabled enables the feature and State Disabled disables it; no additional properties are required. Repeating the same request is idempotent. Disabling the feature does not remove or modify database roles or users previously created through the MicrosoftEntraAdministrators control-plane API or directly through pgaadauth extension functions.
 *
 * @summary creates or replaces the service-created Microsoft Entra authentication method. State Enabled enables the feature and State Disabled disables it; no additional properties are required. Repeating the same request is idempotent. Disabling the feature does not remove or modify database roles or users previously created through the MicrosoftEntraAdministrators control-plane API or directly through pgaadauth extension functions.
 * x-ms-original-file: 2026-10-01-preview/MicrosoftEntraAuthentications_CreateOrReplaceEnabled.json
 */
async function enableMicrosoftEntraAuthenticationDeclaratively(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.microsoftEntraAuthentications.createOrReplace(
    "example-resource-group",
    "example-cluster",
    { properties: { state: "Enabled" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await disableMicrosoftEntraAuthenticationDeclaratively();
  await enableMicrosoftEntraAuthenticationDeclaratively();
}

main().catch(console.error);
