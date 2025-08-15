// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SSODetailsRequest, MonitorsGetSSODetailsOptionalParams } from "@azure/arm-dynatrace";
import { DynatraceObservability } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the SSO configuration details from the partner.
 *
 * @summary Gets the SSO configuration details from the partner.
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_GetSSODetails_MaximumSet_Gen.json
 */
async function monitorsGetSsoDetailsMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const request: SSODetailsRequest = { userPrincipal: "alice@microsoft.com" };
  const options: MonitorsGetSSODetailsOptionalParams = { request };
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.getSSODetails(resourceGroupName, monitorName, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the SSO configuration details from the partner.
 *
 * @summary Gets the SSO configuration details from the partner.
 * x-ms-original-file: specification/dynatrace/resource-manager/Dynatrace.Observability/stable/2023-04-27/examples/Monitors_GetSSODetails_MinimumSet_Gen.json
 */
async function monitorsGetSsoDetailsMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["DYNATRACE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["DYNATRACE_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const request: SSODetailsRequest = { userPrincipal: "alice@microsoft.com" };
  const options: MonitorsGetSSODetailsOptionalParams = { request };
  const credential = new DefaultAzureCredential();
  const client = new DynatraceObservability(credential, subscriptionId);
  const result = await client.monitors.getSSODetails(resourceGroupName, monitorName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsGetSsoDetailsMaximumSetGen();
  await monitorsGetSsoDetailsMinimumSetGen();
}

main().catch(console.error);
