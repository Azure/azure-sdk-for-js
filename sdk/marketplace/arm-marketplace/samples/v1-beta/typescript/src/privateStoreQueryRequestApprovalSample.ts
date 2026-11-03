// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MarketplaceClient } from "@azure/arm-marketplace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get request statuses foreach plan, this api is used as a complex GET action.
 *
 * @summary get request statuses foreach plan, this api is used as a complex GET action.
 * x-ms-original-file: 2025-01-01/QueryRequestApproval.json
 */
async function queryRequestApproval(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.queryRequestApproval(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    "marketplacetestthirdparty.md-test-third-party-2",
    {
      payload: {
        properties: {
          planIds: ["testPlanA", "testPlanB", "*"],
          publisherId: "marketplacetestthirdparty",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await queryRequestApproval();
}

main().catch(console.error);
