// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  DdosProtectionPlansGetParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets information about the specified DDoS protection plan.
 *
 * @summary Gets information about the specified DDoS protection plan.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/DdosProtectionPlanGet.json
 */
async function getDDoSProtectionPlan() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const ddosProtectionPlanName = "test-plan";
  const options: DdosProtectionPlansGetParameters = {
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosProtectionPlans/{ddosProtectionPlanName}",
      subscriptionId,
      resourceGroupName,
      ddosProtectionPlanName
    )
    .get(options);
  console.log(result);
}

getDDoSProtectionPlan().catch(console.error);
