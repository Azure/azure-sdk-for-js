// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AlertsManagementClient } from "@azure/arm-tenantactivitylogalerts";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new Tenant Activity Log Alert rule or update an existing one.
 *
 * @summary create a new Tenant Activity Log Alert rule or update an existing one.
 * x-ms-original-file: 2023-04-01-preview/TenantActivityLogAlertRule_CreateOrUpdate.json
 */
async function createOrUpdateATenantActivityLogAlertRuleForTenantLevelEvents(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AlertsManagementClient(credential);
  const result = await client.tenantActivityLogAlerts.createOrUpdate(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "SampleActivityLogAlertSHRuleOnTenantLevel",
    {
      location: "Global",
      description:
        "Description of sample Activity Log Alert service health rule on tenant level events.",
      actions: {
        actionGroups: [
          {
            actionGroupId:
              "/providers/Microsoft.Management/ManagementGroups/72f988bf-86f1-41af-91ab-2d7cd011db47/providers/Microsoft.Insights/actionGroups/SampleActionGroup",
            actionProperties: { "Email.Title": "my email title" },
            webhookProperties: { sampleWebhookProperty: "SamplePropertyValue" },
          },
        ],
      },
      condition: { allOf: [{ equals: "ServiceHealth", field: "category" }] },
      enabled: true,
      tenantScope: "72f988bf-86f1-41af-91ab-2d7cd011db47",
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateATenantActivityLogAlertRuleForTenantLevelEvents();
}

main().catch(console.error);
