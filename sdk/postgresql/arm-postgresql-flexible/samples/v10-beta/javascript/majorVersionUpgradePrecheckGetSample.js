// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about a major version upgrade precheck for a flexible server.
 *
 * @summary gets information about a major version upgrade precheck for a flexible server.
 * x-ms-original-file: 2026-04-01-preview/MajorVersionUpgradePrecheckGet.json
 */
async function getInformationAboutAMajorVersionUpgradePrecheckValidation() {
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

async function main() {
  await getInformationAboutAMajorVersionUpgradePrecheckValidation();
}

main().catch(console.error);
