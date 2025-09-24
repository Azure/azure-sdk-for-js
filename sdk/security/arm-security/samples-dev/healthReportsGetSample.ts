// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get health report of resource
 *
 * @summary Get health report of resource
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/preview/2023-05-01-preview/examples/HealthReports/GetHealthReports_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getHealthReportOfResource(): Promise<void> {
  const resourceId =
    "subscriptions/a1efb6ca-fbc5-4782-9aaa-5c7daded1ce2/resourcegroups/E2E-IBB0WX/providers/Microsoft.Security/securityconnectors/AwsConnectorAllOfferings";
  const healthReportName = "909c629a-bf39-4521-8e4f-10b443a0bc02";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.healthReports.get(resourceId, healthReportName);
  console.log(result);
}

async function main(): Promise<void> {
  await getHealthReportOfResource();
}

main().catch(console.error);
