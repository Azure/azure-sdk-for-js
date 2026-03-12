// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates an Application Insights web test definition.
 *
 * @summary Creates or updates an Application Insights web test definition.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2022-06-15/examples/WebTestCreate.json
 */

import {
  WebTest,
  ApplicationInsightsManagementClient,
} from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function webTestCreate(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const webTestName = "my-webtest-my-component";
  const webTestDefinition: WebTest = {
    configuration: {
      webTest:
        '<WebTest Name="my-webtest" Id="678ddf96-1ab8-44c8-9274-123456789abc" Enabled="True" CssProjectStructure="" CssIteration="" Timeout="120" WorkItemIds="" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010" Description="" CredentialUserName="" CredentialPassword="" PreAuthenticate="True" Proxy="default" StopOnError="False" RecordedResultFile="" ResultsLocale="" ><Items><Request Method="GET" Guid="a4162485-9114-fcfc-e086-123456789abc" Version="1.1" Url="http://my-component.azurewebsites.net" ThinkTime="0" Timeout="120" ParseDependentRequests="True" FollowRedirects="True" RecordResult="True" Cache="False" ResponseTimeGoal="0" Encoding="utf-8" ExpectedHttpStatusCode="200" ExpectedResponseUrl="" ReportingName="" IgnoreHttpStatusCode="False" /></Items></WebTest>',
    },
    description: "Ping web test alert for mytestwebapp",
    enabled: true,
    frequency: 900,
    webTestKind: "ping",
    locations: [{ location: "us-fl-mia-edge" }],
    webTestName: "my-webtest-my-component",
    retryEnabled: true,
    syntheticMonitorId: "my-webtest-my-component",
    timeout: 120,
    kind: "ping",
    location: "South Central US",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.webTests.createOrUpdate(
    resourceGroupName,
    webTestName,
    webTestDefinition,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an Application Insights web test definition.
 *
 * @summary Creates or updates an Application Insights web test definition.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2022-06-15/examples/WebTestCreateStandard.json
 */
async function webTestCreateStandard(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const webTestName = "my-webtest-my-component";
  const webTestDefinition: WebTest = {
    description: "Ping web test alert for mytestwebapp",
    enabled: true,
    frequency: 900,
    webTestKind: "standard",
    locations: [{ location: "us-fl-mia-edge" }],
    webTestName: "my-webtest-my-component",
    request: {
      headers: [
        { headerFieldName: "Content-Language", headerFieldValue: "de-DE" },
        { headerFieldName: "Accept-Language", headerFieldValue: "de-DE" },
      ],
      httpVerb: "POST",
      requestBody: "SGVsbG8gd29ybGQ=",
      requestUrl: "https://bing.com",
    },
    retryEnabled: true,
    syntheticMonitorId: "my-webtest-my-component",
    timeout: 120,
    validationRules: { sSLCertRemainingLifetimeCheck: 100, sSLCheck: true },
    location: "South Central US",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.webTests.createOrUpdate(
    resourceGroupName,
    webTestName,
    webTestDefinition,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates an Application Insights web test definition.
 *
 * @summary Creates or updates an Application Insights web test definition.
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2022-06-15/examples/WebTestUpdate.json
 */
async function webTestUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APPLICATIONINSIGHTS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APPLICATIONINSIGHTS_RESOURCE_GROUP"] || "my-resource-group";
  const webTestName = "my-webtest-my-component";
  const webTestDefinition: WebTest = {
    configuration: {
      webTest:
        '<WebTest Name="my-webtest" Id="678ddf96-1ab8-44c8-9274-123456789abc" Enabled="True" CssProjectStructure="" CssIteration="" Timeout="30" WorkItemIds="" xmlns="http://microsoft.com/schemas/VisualStudio/TeamTest/2010" Description="" CredentialUserName="" CredentialPassword="" PreAuthenticate="True" Proxy="default" StopOnError="False" RecordedResultFile="" ResultsLocale="" ><Items><Request Method="GET" Guid="a4162485-9114-fcfc-e086-123456789abc" Version="1.1" Url="http://my-component.azurewebsites.net" ThinkTime="0" Timeout="30" ParseDependentRequests="True" FollowRedirects="True" RecordResult="True" Cache="False" ResponseTimeGoal="0" Encoding="utf-8" ExpectedHttpStatusCode="200" ExpectedResponseUrl="" ReportingName="" IgnoreHttpStatusCode="False" /></Items></WebTest>',
    },
    frequency: 600,
    webTestKind: "ping",
    locations: [
      { location: "us-fl-mia-edge" },
      { location: "apac-hk-hkn-azr" },
    ],
    webTestName: "my-webtest-my-component",
    syntheticMonitorId: "my-webtest-my-component",
    timeout: 30,
    kind: "ping",
    location: "South Central US",
  };
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.webTests.createOrUpdate(
    resourceGroupName,
    webTestName,
    webTestDefinition,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webTestCreate();
  await webTestCreateStandard();
  await webTestUpdate();
}

main().catch(console.error);
