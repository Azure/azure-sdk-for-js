// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SaaSClient } = require("@azure/arm-saas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status of a long-running SaaS operation at the tenant scope.
 *
 * @summary gets the status of a long-running SaaS operation at the tenant scope.
 * x-ms-original-file: 2026-04-01/SaasGetTenantOperationStatus.json
 */
async function getSaaSOperationStatusAtTenantScope() {
  const credential = new DefaultAzureCredential();
  const client = new SaaSClient(credential);
  const result = await client.saasOperationStatuses.getTenantOperationStatus(
    "e24b5b6b-2dfc-41ea-c457-46d0c42494af",
  );
  console.log(result);
}

async function main() {
  await getSaaSOperationStatusAtTenantScope();
}

main().catch(console.error);
