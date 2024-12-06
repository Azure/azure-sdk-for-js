// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a cacheNodes with the specified create parameters
 *
 * @summary creates a cacheNodes with the specified create parameters
 * x-ms-original-file: 2023-05-01-preview/EnterpriseCustomerOperations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function enterpriseCustomerOperationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.enterpriseCustomerOperations.createOrUpdate(
    "rgConnectedCache",
    "l",
    {
      properties: {
        statusCode: "oldkroffqtkryqffpsi",
        statusText: "bs",
        statusDetails: "lhwvcz",
        error: {},
      },
      tags: { key4215: "zjbszvlzf" },
      location: "zdzhhkjyogrqxwihkifnmeyhwpujbr",
    },
  );
  console.log(result);
}

async function main() {
  enterpriseCustomerOperationsCreateOrUpdate();
}

main().catch(console.error);
