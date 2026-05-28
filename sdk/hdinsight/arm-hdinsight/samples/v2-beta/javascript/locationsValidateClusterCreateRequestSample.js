// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validate the cluster create request spec is valid or not.
 *
 * @summary validate the cluster create request spec is valid or not.
 * x-ms-original-file: 2025-01-15-preview/HDI_Locations_ValidateClusterCreateRequest.json
 */
async function getTheSubscriptionUsagesForSpecificLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.locations.validateClusterCreateRequest("southcentralus", {
    name: "testclustername",
    type: "Microsoft.HDInsight/clusters",
    fetchAaddsResource: false,
    location: "southcentralus",
    properties: {
      clusterDefinition: {
        componentVersion: { Spark: "2.4" },
        configurations: {
          gateway: {
            "restAuthCredential.isEnabled": true,
            "restAuthCredential.password": "**********",
            "restAuthCredential.username": "admin",
          },
        },
        kind: "spark",
      },
      clusterVersion: "4.0",
      computeProfile: {
        roles: [
          {
            name: "headnode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "********", username: "sshuser" },
            },
            scriptActions: [],
            targetInstanceCount: 2,
          },
          {
            name: "workernode",
            hardwareProfile: { vmSize: "Standard_E8_V3" },
            osProfile: {
              linuxOperatingSystemProfile: { password: "********", username: "sshuser" },
            },
            scriptActions: [],
            targetInstanceCount: 4,
          },
          {
            name: "zookeepernode",
            hardwareProfile: { vmSize: "Standard_D13_V2" },
            minInstanceCount: 1,
            osProfile: {
              linuxOperatingSystemProfile: { password: "**********", username: "sshuser" },
            },
            scriptActions: [],
            targetInstanceCount: 3,
          },
        ],
      },
      minSupportedTlsVersion: "1.2",
      osType: "Linux",
      storageProfile: {
        storageaccounts: [
          {
            name: "storagename.blob.core.windows.net",
            container: "contianername",
            enableSecureChannel: true,
            isDefault: true,
            key: "*******",
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Storage/storageAccounts/storagename",
          },
        ],
      },
      tier: "Standard",
    },
    tags: {},
    tenantId: "00000000-0000-0000-0000-000000000000",
  });
  console.log(result);
}

async function main() {
  await getTheSubscriptionUsagesForSpecificLocation();
}

main().catch(console.error);
