// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to install a template.
 *
 * @summary install a template.
 * x-ms-original-file: 2025-07-01-preview/contentTemplates/InstallTemplate.json
 */
async function getATemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "d0cfeab2-9ae0-4464-9919-dccaee2e48f0";
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.contentTemplate.install(
    "myRg",
    "myWorkspace",
    "str.azure-sentinel-solution-str",
    {
      author: { name: "Microsoft", email: "support@microsoft.com" },
      contentId: "8365ebfe-a381-45b7-ad08-7d818070e11f",
      contentKind: "AnalyticsRule",
      contentProductId: "str.azure-sentinel-solution-str-ar-cbfe4fndz66bi",
      displayName: "API Protection workbook template",
      mainTemplate: {
        $schema: "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
        contentVersion: "1.0.1",
        resources: [
          {
            name: "8365ebfe-a381-45b7-ad08-7d818070e11f",
            type: "Microsoft.SecurityInsights/AlertRuleTemplates",
            apiVersion: "2022-04-01-preview",
            kind: "Scheduled",
            location: "[parameters('workspace-location')]",
            properties: {
              description:
                "Creates an incident when a large number of Critical/High severity CrowdStrike Falcon sensor detections is triggered by a single user",
              displayName: "Critical or High Severity Detections by User",
              enabled: false,
              query: "...",
              queryFrequency: "PT1H",
              queryPeriod: "PT1H",
              severity: "High",
              status: "Available",
              suppressionDuration: "PT1H",
              suppressionEnabled: false,
              triggerOperator: "GreaterThan",
              triggerThreshold: 0,
            },
          },
          {
            name: "[concat(parameters('workspace'),'/Microsoft.SecurityInsights/',concat('AnalyticsRule-', last(split([resourceId('Microsoft.SecurityInsights/AlertRuleTemplates', 8365ebfe-a381-45b7-ad08-7d818070e11f)],'/'))))]",
            type: "Microsoft.OperationalInsights/workspaces/providers/metadata",
            apiVersion: "2022-01-01-preview",
            properties: {
              description: "CrowdStrike Falcon Endpoint Protection Analytics Rule 1",
              author: { name: "Microsoft", email: "support@microsoft.com" },
              contentId: "4465ebde-b381-45f7-ad08-7d818070a11c",
              kind: "AnalyticsRule",
              parentId:
                "[resourceId('Microsoft.SecurityInsights/AlertRuleTemplates', 8365ebfe-a381-45b7-ad08-7d818070e11f)]",
              source: {
                name: "str",
                kind: "Solution",
                sourceId: "str.azure-sentinel-solution-str",
              },
              support: {
                name: "Microsoft Corporation",
                email: "support@microsoft.com",
                link: "https://support.microsoft.com/",
                tier: "Microsoft",
              },
              version: "1.0.0",
            },
          },
        ],
      },
      packageId: "str.azure-sentinel-solution-str",
      packageKind: "Solution",
      packageName: "str",
      packageVersion: "1.0.0",
      source: { name: "str", kind: "Solution", sourceId: "str.azure-sentinel-solution-str" },
      support: {
        name: "Microsoft Corporation",
        email: "support@microsoft.com",
        link: "https://support.microsoft.com/",
        tier: "Microsoft",
      },
      version: "1.0.1",
    },
  );
  console.log(result);
}

async function main() {
  await getATemplate();
}

main().catch(console.error);
