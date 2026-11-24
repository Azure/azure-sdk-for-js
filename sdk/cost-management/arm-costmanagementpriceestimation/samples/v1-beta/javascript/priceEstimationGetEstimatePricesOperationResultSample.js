// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  CostManagementPriceEstimationManagementClient,
} = require("@azure/arm-costmanagementpriceestimation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the status or result of an estimatePrices operation. This URL is returned
 * in the Location header of the estimatePrices response. Returns HTTP 202 with
 * Location and Retry-After headers while pricing runs, then the estimate (HTTP
 * 200) or the operation's ARM error. Unknown or expired operations, and
 * operations started by another caller or subscription, return HTTP 404
 * OperationNotFound.
 *
 * @summary gets the status or result of an estimatePrices operation. This URL is returned
 * in the Location header of the estimatePrices response. Returns HTTP 202 with
 * Location and Retry-After headers while pricing runs, then the estimate (HTTP
 * 200) or the operation's ARM error. Unknown or expired operations, and
 * operations started by another caller or subscription, return HTTP 404
 * OperationNotFound.
 * x-ms-original-file: 2026-10-01-preview/EstimatePricesOperationResultGet.json
 */
async function getTheResultOfAPriceEstimationOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CostManagementPriceEstimationManagementClient(credential, subscriptionId);
  const result = await client.priceEstimation.getEstimatePricesOperationResult(
    "2f0d4b7a9c1e4d6f8a3b5c7d9e1f2a4b",
  );
  console.log(result);
}

async function main() {
  await getTheResultOfAPriceEstimationOperation();
}

main().catch(console.error);
