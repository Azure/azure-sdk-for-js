// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CarbonClient } from "@azure/arm-carbonoptimization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI for query carbon emission data available date range
 *
 * @summary aPI for query carbon emission data available date range
 * x-ms-original-file: 2025-04-01/carbonEmissionsDataAvailableDateRange.json
 */
async function carbonServiceQueryCarbonEmissionDataAvailableDateRange(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new CarbonClient(credential, subscriptionId);
  const result = await client.carbonService.queryCarbonEmissionDataAvailableDateRange();
  console.log(result);
}

async function main(): Promise<void> {
  await carbonServiceQueryCarbonEmissionDataAvailableDateRange();
}

main().catch(console.error);
