// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the ProactiveDetection configuration for this configuration id.
 *
 * @summary update the ProactiveDetection configuration for this configuration id.
 * x-ms-original-file: 2015-05-01/ProactiveDetectionConfigurationUpdate.json
 */
async function proactiveDetectionConfigurationUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ApplicationInsightsManagementClient(credential, subscriptionId);
  const result = await client.proactiveDetectionConfigurations.update(
    "my-resource-group",
    "my-component",
    "slowpageloadtime",
    {
      name: "slowpageloadtime",
      customEmails: ["foo@microsoft.com", "foo2@microsoft.com"],
      enabled: true,
      ruleDefinitions: {
        description: "Smart Detection rules notify you of performance anomaly issues.",
        displayName: "Slow page load time",
        helpUrl:
          "https://docs.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics",
        isEnabledByDefault: true,
        isHidden: false,
        isInPreview: false,
        name: "slowpageloadtime",
        supportsEmailNotifications: true,
      },
      sendEmailsToSubscriptionOwners: true,
    },
  );
  console.log(result);
}

async function main() {
  await proactiveDetectionConfigurationUpdate();
}

main().catch(console.error);
