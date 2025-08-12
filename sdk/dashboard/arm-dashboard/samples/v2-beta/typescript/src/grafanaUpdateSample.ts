// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a workspace for Grafana resource.
 *
 * @summary update a workspace for Grafana resource.
 * x-ms-original-file: 2024-11-01-preview/Grafana_Update.json
 */
async function grafanaUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.grafana.update("myResourceGroup", "myWorkspace", {
    properties: {
      apiKey: "Enabled",
      deterministicOutboundIP: "Enabled",
      enterpriseConfigurations: {
        marketplaceAutoRenew: "Enabled",
        marketplacePlanId: "myPlanId",
      },
      grafanaConfigurations: {
        security: { csrfAlwaysCheck: false },
        smtp: {
          enabled: true,
          fromAddress: "test@sendemail.com",
          fromName: "emailsender",
          host: "smtp.sendemail.com:587",
          password: "<password>",
          skipVerify: true,
          startTLSPolicy: "OpportunisticStartTLS",
          user: "username",
        },
        snapshots: { externalEnabled: true },
        unifiedAlertingScreenshots: { captureEnabled: false },
        users: { editorsCanAdmin: true, viewersCanEdit: true },
      },
      grafanaIntegrations: {
        azureMonitorWorkspaceIntegrations: [
          {
            azureMonitorWorkspaceResourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.monitor/accounts/myAzureMonitorWorkspace",
          },
        ],
      },
      grafanaMajorVersion: "9",
      grafanaPlugins: { "sample-plugin-id": {} },
    },
    sku: { name: "Standard" },
    tags: { Environment: "Dev 2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await grafanaUpdate();
}

main().catch(console.error);
