// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update the ProactiveDetection configuration for this configuration id.
 *
 * @summary Update the ProactiveDetection configuration for this configuration id.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2015-05-01/examples/ProactiveDetectionConfigurationUpdate.json
 */

import {
  ApplicationInsightsComponentProactiveDetectionConfiguration,
  ApplicationInsightsManagementClient,
} from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function proactiveDetectionConfigurationUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const resourceName = "my-component";
  const configurationId = "slowpageloadtime";
  const proactiveDetectionProperties: ApplicationInsightsComponentProactiveDetectionConfiguration =
  {
    customEmails: ["foo@microsoft.com", "foo2@microsoft.com"],
    enabled: true,
    lastUpdatedTime: undefined,
    name: "slowpageloadtime",
    ruleDefinitions: {
      description:
        "Smart Detection rules notify you of performance anomaly issues.",
      displayName: "Slow page load time",
      helpUrl:
        " https://learn.microsoft.com/en-us/azure/application-insights/app-insights-proactive-performance-diagnostics",
      isEnabledByDefault: true,
      isHidden: false,
      isInPreview: false,
      name: "slowpageloadtime",
      supportsEmailNotifications: true,
    },
    sendEmailsToSubscriptionOwners: true,
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.proactiveDetectionConfigurations.update(
    resourceGroupName,
    resourceName,
    configurationId,
    proactiveDetectionProperties,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await proactiveDetectionConfigurationUpdate();
}

main().catch(console.error);
