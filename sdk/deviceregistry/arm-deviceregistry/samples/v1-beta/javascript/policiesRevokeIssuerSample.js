// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2026-03-01-preview/Policies_RevokeIssuer.json
 */
async function policiesRevokeIssuer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.policies.revokeIssuer("rgdeviceregistry", "mynamespace", "mypolicy");
}

async function main() {
  await policiesRevokeIssuer();
}

main().catch(console.error);
