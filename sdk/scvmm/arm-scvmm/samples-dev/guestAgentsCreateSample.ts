// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create Or Update GuestAgent.
 *
 * @summary Create Or Update GuestAgent.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/GuestAgents_Create_MaximumSet_Gen.json
 */

import type { GuestAgent } from "@azure/arm-scvmm";
import { ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function guestAgentsCreateMaximumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const resource: GuestAgent = {
    properties: {
      credentials: {
        password: "SecretPlaceholder",
        username: "jqxuwirrcpfv",
      },
      httpProxyConfig: { httpsProxy: "uoyzyticmohohomlkwct" },
      provisioningAction: "install",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.guestAgents.beginCreateAndWait(resourceUri, resource);
  console.log(result);
}

/**
 * This sample demonstrates how to Create Or Update GuestAgent.
 *
 * @summary Create Or Update GuestAgent.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/GuestAgents_Create_MinimumSet_Gen.json
 */
async function guestAgentsCreateMinimumSet(): Promise<void> {
  const resourceUri = "gtgclehcbsyave";
  const resource: GuestAgent = {};
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.guestAgents.beginCreateAndWait(resourceUri, resource);
  console.log(result);
}

async function main(): Promise<void> {
  await guestAgentsCreateMaximumSet();
  await guestAgentsCreateMinimumSet();
}

main().catch(console.error);
