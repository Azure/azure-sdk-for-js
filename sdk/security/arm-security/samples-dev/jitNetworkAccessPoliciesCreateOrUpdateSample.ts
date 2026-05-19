// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a policy for protecting resources using Just-in-Time access control
 *
 * @summary create a policy for protecting resources using Just-in-Time access control
 * x-ms-original-file: 2020-01-01/JitNetworkAccessPolicies/CreateJitNetworkAccessPolicy_example.json
 */
async function createJITNetworkAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.jitNetworkAccessPolicies.createOrUpdate(
    "myRg1",
    "westeurope",
    "default",
    {
      type: "Microsoft.Security/locations/jitNetworkAccessPolicies",
      id: "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg1/providers/Microsoft.Security/locations/westeurope/jitNetworkAccessPolicies/default",
      kind: "Basic",
      requests: [
        {
          requestor: "barbara@contoso.com",
          startTimeUtc: new Date("2018-05-17T08:06:45.5691611Z"),
          virtualMachines: [
            {
              id: "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg1/providers/Microsoft.Compute/virtualMachines/vm1",
              ports: [
                {
                  allowedSourceAddressPrefix: "192.127.0.2",
                  endTimeUtc: new Date("2018-05-17T09:06:45.5691611Z"),
                  number: 3389,
                  status: "Initiated",
                  statusReason: "UserRequested",
                },
              ],
            },
          ],
        },
      ],
      virtualMachines: [
        {
          id: "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg1/providers/Microsoft.Compute/virtualMachines/vm1",
          ports: [
            {
              allowedSourceAddressPrefix: "*",
              maxRequestAccessDuration: "PT3H",
              number: 22,
              protocol: "*",
            },
            {
              allowedSourceAddressPrefix: "*",
              maxRequestAccessDuration: "PT3H",
              number: 3389,
              protocol: "*",
            },
          ],
        },
      ],
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createJITNetworkAccessPolicy();
}

main().catch(console.error);
