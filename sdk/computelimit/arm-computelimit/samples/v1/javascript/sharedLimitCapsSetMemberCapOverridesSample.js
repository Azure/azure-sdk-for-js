// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeLimitClient } = require("@azure/arm-computelimit");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to replaces the full set of per-member cap overrides for this shared limit
 * cap. The supplied array becomes the new complete set of overrides;
 * supplying an empty array clears all existing overrides.
 *
 * @summary replaces the full set of per-member cap overrides for this shared limit
 * cap. The supplied array becomes the new complete set of overrides;
 * supplying an empty array clears all existing overrides.
 * x-ms-original-file: 2026-07-01/SharedLimitCaps_SetMemberCapOverrides.json
 */
async function replaceTheFullSetOfMemberCapOverridesForASharedLimitCap() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.sharedLimitCaps.setMemberCapOverrides(
    "eastus",
    "StandardDSv3Family",
    {
      memberCapOverrides: [
        { subscriptionId: "11111111-1111-1111-1111-111111111111", cap: 200 },
        { subscriptionId: "22222222-2222-2222-2222-222222222222", cap: 150 },
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to replaces the full set of per-member cap overrides for this shared limit
 * cap. The supplied array becomes the new complete set of overrides;
 * supplying an empty array clears all existing overrides.
 *
 * @summary replaces the full set of per-member cap overrides for this shared limit
 * cap. The supplied array becomes the new complete set of overrides;
 * supplying an empty array clears all existing overrides.
 * x-ms-original-file: 2026-07-01/SharedLimitCaps_SetMemberCapOverrides_ClearAll.json
 */
async function clearAllMemberCapOverridesSupplyAnEmptyArray() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const result = await client.sharedLimitCaps.setMemberCapOverrides(
    "eastus",
    "StandardDSv3Family",
    { memberCapOverrides: [] },
  );
  console.log(result);
}

async function main() {
  await replaceTheFullSetOfMemberCapOverridesForASharedLimitCap();
  await clearAllMemberCapOverridesSupplyAnEmptyArray();
}

main().catch(console.error);
