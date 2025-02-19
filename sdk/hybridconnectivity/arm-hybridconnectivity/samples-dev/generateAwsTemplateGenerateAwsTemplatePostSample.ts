// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridConnectivityManagementAPI } from "@azure/arm-hybridconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve AWS Cloud Formation template
 *
 * @summary retrieve AWS Cloud Formation template
 * x-ms-original-file: 2024-12-01/GenerateAwsTemplate_Post.json
 */
async function generateAwsTemplatePost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.generateAwsTemplate.GenerateAwsTemplate_post({
    connectorId: "pnxcfjidglabnwxit",
    solutionTypes: [{ solutionType: "hjyownzpfxwiufmd", solutionSettings: {} }],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await generateAwsTemplatePost();
}

main().catch(console.error);
