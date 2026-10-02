// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve AWS Cloud Formation template
 *
 * @summary retrieve AWS Cloud Formation template
 * x-ms-original-file: 2027-01-01/GenerateAwsTemplate_Post_MaximumSet_Gen.json
 */
async function generateAwsTemplatePostGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.generateAwsTemplate.post({
    connectorId: "pnxcfjidglabnwxit",
    solutionTypes: [{ solutionType: "hjyownzpfxwiufmd", solutionSettings: {} }],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve AWS Cloud Formation template
 *
 * @summary retrieve AWS Cloud Formation template
 * x-ms-original-file: 2027-01-01/GenerateAwsTemplate_Post_MinimumSet_Gen.json
 */
async function generateAwsTemplatePostGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.generateAwsTemplate.post({ connectorId: "pnxcfjidglabnwxit" });
  console.log(result);
}

async function main() {
  await generateAwsTemplatePostGeneratedByMaximumSetRule();
  await generateAwsTemplatePostGeneratedByMinimumSetRule();
}

main().catch(console.error);
