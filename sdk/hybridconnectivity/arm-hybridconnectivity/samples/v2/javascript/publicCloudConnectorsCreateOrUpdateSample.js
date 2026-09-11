// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridConnectivityManagementAPI } = require("@azure/arm-hybridconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a PublicCloudConnector
 *
 * @summary create a PublicCloudConnector
 * x-ms-original-file: 2027-01-01/PublicCloudConnectors_CreateOrUpdate_MaximumSet_Gen.json
 */
async function publicCloudConnectorsCreateOrUpdateGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5ACC4579-DB34-4C2F-8F8C-25061168F342";
  const client = new HybridConnectivityManagementAPI(credential, subscriptionId);
  const result = await client.publicCloudConnectors.createOrUpdate("rghybridconnectivity", "abc", {
    properties: {
      awsCloudProfile: {
        accountId: "snbnuxckevyqpm",
        excludedAccounts: ["rwgqpukglvbqmogqcliqolucp"],
        isOrganizationalAccount: true,
      },
      hostType: "AWS",
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
    },
    tags: {},
    location: "jpiglusfxynfcewcjwvvnn",
  });
  console.log(result);
}

async function main() {
  await publicCloudConnectorsCreateOrUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
