// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SaaSClient } from "@azure/arm-saas";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the status of a long-running SaaS operation at the tenant scope.
 *
 * @summary gets the status of a long-running SaaS operation at the tenant scope.
 * x-ms-original-file: 2026-04-01/SaasGetTenantOperationStatus.json
 */
async function getSaaSOperationStatusAtTenantScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SaaSClient(credential);
  const result = await client.saasOperationStatuses.getTenantOperationStatus(
    "e24b5b6b-2dfc-41ea-c457-46d0c42494af",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSaaSOperationStatusAtTenantScope();
}

main().catch(console.error);
