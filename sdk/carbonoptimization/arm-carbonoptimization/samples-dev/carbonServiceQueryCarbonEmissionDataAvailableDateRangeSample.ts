// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to aPI for query carbon emission data available date range
 *
 * @summary aPI for query carbon emission data available date range
 * x-ms-original-file: 2025-04-01/carbonEmissionsDataAvailableDateRange.json
 */

import { CarbonOptimizationManagementClient } from "@azure/arm-carbonoptimization";
import { DefaultAzureCredential } from "@azure/identity";

async function carbonServiceQueryCarbonEmissionDataAvailableDateRange(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionDataAvailableDateRange();
  console.log(result);
}

async function main(): Promise<void> {
  await carbonServiceQueryCarbonEmissionDataAvailableDateRange();
}

main().catch(console.error);
