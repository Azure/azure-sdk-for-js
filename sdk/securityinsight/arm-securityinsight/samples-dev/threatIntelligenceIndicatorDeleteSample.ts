// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a threat intelligence indicator.
 *
 * @summary Delete a threat intelligence indicator.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/threatintelligence/DeleteThreatIntelligence.json
 */

import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAThreatIntelligenceIndicator(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "bd794837-4d29-4647-9105-6339bfdb4e6a";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const name = "d9cd6f0b-96b9-3984-17cd-a779d1e15a93";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.threatIntelligenceIndicator.delete(
    resourceGroupName,
    workspaceName,
    name,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAThreatIntelligenceIndicator();
}

main().catch(console.error);
