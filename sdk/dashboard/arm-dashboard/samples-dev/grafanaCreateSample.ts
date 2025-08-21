// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana.
 *
 * @summary create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana.
 * x-ms-original-file: 2024-11-01-preview/Grafana_Create.json
 */

import { DashboardManagementClient } from "@azure/arm-dashboard";
import { DefaultAzureCredential } from "@azure/identity";

async function grafanaCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DashboardManagementClient(credential, subscriptionId);
  const result = await client.grafana.create("myResourceGroup", "myWorkspace", {
    identity: { type: "SystemAssigned" },
    location: "West US",
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
      publicNetworkAccess: "Enabled",
      zoneRedundancy: "Enabled",
    },
    sku: { name: "Standard" },
    tags: { Environment: "Dev" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await grafanaCreate();
}

main().catch(console.error);
