// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a major version upgrade precheck for a flexible server.
 *
 * @summary gets information about a major version upgrade precheck for a flexible server.
 * x-ms-original-file: 2026-04-01-preview/MajorVersionUpgradePrecheckGet.json
 */
async function getInformationAboutAMajorVersionUpgradePrecheckValidation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.majorVersionUpgradePrecheck.get(
    "exampleresourcegroup",
    "exampleserver",
    "pppppppp-pppp-pppp-pppp-pppppppppppp",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getInformationAboutAMajorVersionUpgradePrecheckValidation();
}

main().catch(console.error);
