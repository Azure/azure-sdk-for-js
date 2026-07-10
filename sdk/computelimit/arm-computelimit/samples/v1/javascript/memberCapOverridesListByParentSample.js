// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all per-member cap overrides configured under a SharedLimitCap.
 *
 * @summary lists all per-member cap overrides configured under a SharedLimitCap.
 * x-ms-original-file: 2026-07-01/MemberCapOverrides_ListByParent.json
 */
async function listAllMemberCapOverridesUnderASharedLimitCap() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.memberCapOverrides.listByParent("eastus", "StandardDSv3Family")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllMemberCapOverridesUnderASharedLimitCap();
}

main().catch(console.error);
