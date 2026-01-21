// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnClient } = require("@azure/arm-edgeactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2025-12-01-preview/EdgeActionVersions_GetVersionCode.json
 */
async function getVersionCode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnClient(credential, subscriptionId);
  const result = await client.edgeActionVersions.getVersionCode(
    "testrg",
    "edgeAction1",
    "version1",
  );
  console.log(result);
}

async function main() {
  await getVersionCode();
}

main().catch(console.error);
