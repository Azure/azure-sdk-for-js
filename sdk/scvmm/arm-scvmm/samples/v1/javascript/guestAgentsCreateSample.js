/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { ScVmm } = require("@azure/arm-scvmm");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Create Or Update GuestAgent.
 *
 * @summary Create Or Update GuestAgent.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/GuestAgents_Create_MaximumSet_Gen.json
 */
async function guestAgentsCreateMaximumSet() {
  const resourceUri = "gtgclehcbsyave";
  const resource = {
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
async function guestAgentsCreateMinimumSet() {
  const resourceUri = "gtgclehcbsyave";
  const resource = {};
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential);
  const result = await client.guestAgents.beginCreateAndWait(resourceUri, resource);
  console.log(result);
}

async function main() {
  guestAgentsCreateMaximumSet();
  guestAgentsCreateMinimumSet();
}

main().catch(console.error);
