// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PreviewAlertRuleManagementClient } = require("@azure/arm-previewalertrule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the results of a simulated historical execution of an alert rule
 *
 * @summary retrieves the results of a simulated historical execution of an alert rule
 * x-ms-original-file: 2025-07-01-preview/previewDynamicThresholdLogSearchAlertRule.json
 */
async function runPreviewOfADynamicThresholdLogSearchAlertRule() {
  const credential = new DefaultAzureCredential();
  const client = new PreviewAlertRuleManagementClient(credential);
  const result = await client.previewAlertRule(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.OperationalInsights/workspaces/myWorkspace",
    {
      location: "eastus",
      properties: {
        scheduledQueryRuleProperties: {
          location: "eastus",
          description: "Performance rule",
          criteria: {
            allOf: [
              {
                alertSensitivity: "Medium",
                criterionType: "DynamicThresholdCriterion",
                dimensions: [{ name: "AlertName", operator: "Include", values: ["alert"] }],
                operator: "GreaterThan",
                query: "Alert",
                timeAggregation: "Count",
              },
            ],
          },
          enabled: true,
          evaluationFrequency: "PT1H",
          scopes: [
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.OperationalInsights/workspaces/myWorkspace",
          ],
          severity: 4,
          windowSize: "PT1H",
        },
        timespan: "PT24H",
      },
    },
  );
  console.log(result);
}

async function main() {
  await runPreviewOfADynamicThresholdLogSearchAlertRule();
}

main().catch(console.error);
