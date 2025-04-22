// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CarbonOptimizationManagementClient } = require("@azure/arm-carbonoptimization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aPI for query carbon emission data available date range
 *
 * @summary aPI for query carbon emission data available date range
 * x-ms-original-file: 2025-04-01/carbonEmissionsDataAvailableDateRange.json
 */
async function carbonServiceQueryCarbonEmissionDataAvailableDateRange() {
  const credential = new DefaultAzureCredential();
  const client = new CarbonOptimizationManagementClient(credential);
  const result = await client.carbonService.queryCarbonEmissionDataAvailableDateRange();
  console.log(result);
}

async function main() {
  await carbonServiceQueryCarbonEmissionDataAvailableDateRange();
}

main().catch(console.error);
