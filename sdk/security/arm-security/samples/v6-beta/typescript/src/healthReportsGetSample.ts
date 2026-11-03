// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get health report of resource
 *
 * @summary get health report of resource
 * x-ms-original-file: 2023-05-01-preview/HealthReports/GetHealthReports_example.json
 */
async function getHealthReportOfResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.healthReports.get(
    "subscriptions/a1efb6ca-fbc5-4782-9aaa-5c7daded1ce2/resourcegroups/E2E-IBB0WX/providers/Microsoft.Security/securityconnectors/AwsConnectorAllOfferings",
    "909c629a-bf39-4521-8e4f-10b443a0bc02",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getHealthReportOfResource();
}

main().catch(console.error);
