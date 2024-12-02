// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  FirewallPolicyIdpsSignaturesOverridesPatchParameters
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Will update the status of policy's signature overrides for IDPS
 *
 * @summary Will update the status of policy's signature overrides for IDPS
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/FirewallPolicySignatureOverridesPatch.json
 */
async function patchSignatureOverrides() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const firewallPolicyName = "firewallPolicy";
  const options: FirewallPolicyIdpsSignaturesOverridesPatchParameters = {
    body: {
      name: "default",
      type: "Microsoft.Network/firewallPolicies/signatureOverrides",
      id:
        "/subscriptions/e747cc13-97d4-4a79-b463-42d7f4e558f2/resourceGroups/rg1/providers/Microsoft.Network/firewallPolicies/firewallPolicy/signatureOverrides/default",
      properties: { signatures: { "2000105": "Off", "2000106": "Deny" } }
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firewallPolicies/{firewallPolicyName}/signatureOverrides/default",
      subscriptionId,
      resourceGroupName,
      firewallPolicyName
    )
    .patch(options);
  console.log(result);
}

patchSignatureOverrides().catch(console.error);
