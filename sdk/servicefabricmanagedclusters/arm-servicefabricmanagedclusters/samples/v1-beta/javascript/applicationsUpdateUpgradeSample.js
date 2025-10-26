// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to send a request to update the current application upgrade.
 *
 * @summary send a request to update the current application upgrade.
 * x-ms-original-file: 2025-06-01-preview/ApplicationActionUpdateUpgrade_example.json
 */
async function updateAnApplicationUpgrade() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  await client.applications.updateUpgrade("resRg", "myCluster", "myApp", {
    upgradeKind: "Rolling",
    name: "fabric:/Voting",
    updateDescription: {
      rollingUpgradeMode: "Monitored",
      forceRestart: true,
      failureAction: "Manual",
      healthCheckWaitDurationInMilliseconds: "PT0H0M10S",
      healthCheckStableDurationInMilliseconds: "PT1H0M0S",
      healthCheckRetryTimeoutInMilliseconds: "PT0H15M0S",
      upgradeTimeoutInMilliseconds: "PT2H0M0S",
      upgradeDomainTimeoutInMilliseconds: "PT2H0M0S",
    },
    applicationHealthPolicy: {
      considerWarningAsError: true,
      maxPercentUnhealthyDeployedApplications: 10,
      defaultServiceTypeHealthPolicy: {
        maxPercentUnhealthyPartitionsPerService: 10,
        maxPercentUnhealthyReplicasPerPartition: 11,
        maxPercentUnhealthyServices: 12,
      },
      serviceTypeHealthPolicyMap: {
        VotingWeb: {
          maxPercentUnhealthyPartitionsPerService: 13,
          maxPercentUnhealthyReplicasPerPartition: 14,
          maxPercentUnhealthyServices: 15,
        },
      },
    },
  });
}

async function main() {
  await updateAnApplicationUpgrade();
}

main().catch(console.error);
