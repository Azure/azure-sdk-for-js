// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { LabServicesClient } from "@azure/arm-labservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns an azure operation result.
 *
 * @summary Returns an azure operation result.
 * x-ms-original-file: specification/labservices/resource-manager/Microsoft.LabServices/stable/2022-08-01/examples/OperationResults/getOperationResult.json
 */
async function getOperationResult(): Promise<void> {
  const subscriptionId =
    process.env["LABSERVICES_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const operationResultId = "a64149d8-84cb-4566-ab8e-b4ee1a074174";
  const credential = new DefaultAzureCredential();
  const client = new LabServicesClient(credential, subscriptionId);
  const result = await client.operationResults.get(operationResultId);
  console.log(result);
}

async function main(): Promise<void> {
  await getOperationResult();
}

main().catch(console.error);
