// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve GCP Access Control template
 *
 * @summary retrieve GCP Access Control template
 * x-ms-original-file: 2027-01-01/GenerateGcpTemplate_Post_MaximumSet_Gen.json
 */
async function generateGcpTemplatePostMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.generateGcpTemplate.post({
    connectorId: "lvrdneuerxztxiixlzswcbm",
    gcpTemplateFormat: "terraform",
    solutionTypes: [{ solutionType: "hjyownzpfxwiufmd", solutionSettings: {} }],
    gcpCloudProfile: {
      projectProperties: { projectNumber: "mjubieitixhpm", projectId: "mjubieitixhpmid" },
      organizationProperties: {
        organizationId: "vqlzghfdinlamurmg",
        managementProjectNumber: "mjubieitixhpm",
        managementProjectId: "mjubieitixhpmid",
        excludedProjectNumbers: ["sepdnfxmhcrubtklwllxfbhju"],
        excludedFolderIds: ["xxl"],
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to retrieve GCP Access Control template
 *
 * @summary retrieve GCP Access Control template
 * x-ms-original-file: 2027-01-01/GenerateGcpTemplate_Post_MinimumSet_Gen.json
 */
async function generateGcpTemplatePostMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.generateGcpTemplate.post({ connectorId: "lvrdneuerxztxiixlzswcbm" });
  console.log(result);
}

async function main() {
  await generateGcpTemplatePostMaximumSet();
  await generateGcpTemplatePostMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
