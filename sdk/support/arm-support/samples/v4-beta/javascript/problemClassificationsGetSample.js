// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get problem classification details for a specific Azure service.
 *
 * @summary get problem classification details for a specific Azure service.
 * x-ms-original-file: 2025-06-01-preview/GetProblemClassification.json
 */
async function getsDetailsOfProblemClassificationForAzureService() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.problemClassifications.get(
    "service_guid",
    "problemClassification_guid",
  );
  console.log(result);
}

async function main() {
  await getsDetailsOfProblemClassificationForAzureService();
}

main().catch(console.error);
