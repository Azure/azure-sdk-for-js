// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this api creates an ispCustomer with the specified create parameters
 *
 * @summary this api creates an ispCustomer with the specified create parameters
 * x-ms-original-file: 2023-05-01-preview/IspCustomers_CreateOrUpdate_MaximumSet_Gen.json
 */
async function ispCustomerCreateOrUpdateGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.ispCustomers.createOrUpdate(
    "rgConnectedCache",
    "MccRPTest2",
    {
      location: "westus",
      properties: {
        customer: {
          fullyQualifiedResourceId: "uqsbtgae",
          customerName: "mkpzynfqihnjfdbaqbqwyhd",
          contactEmail: "xquos",
          contactPhone: "vue",
          contactName: "wxyqjoyoscmvimgwhpitxky",
          isEntitled: true,
          releaseVersion: 20,
          clientTenantId: "fproidkpgvpdnac",
          isEnterpriseManaged: true,
          shouldMigrate: true,
          resendSignupCode: true,
          verifySignupCode: true,
          verifySignupPhrase: "tprjvttkgmrqlsyicnidhm",
        },
        additionalCustomerProperties: {
          customerEmail: "zdjgibsidydyzm",
          customerTransitAsn: "habgklnxqzmozqpazoyejwiphezpi",
          customerAsn: "hgrelgnrtdkleisnepfolu",
          customerEntitlementSkuId: "b",
          customerEntitlementSkuGuid: "rvzmdpxyflgqetvpwupnfaxsweiiz",
          customerEntitlementSkuName: "waaqfijr",
          customerEntitlementExpiration: new Date("2024-01-30T00:54:04.773Z"),
          optionalProperty1: "qhmwxza",
          optionalProperty2: "l",
          optionalProperty3: "mblwwvbie",
          optionalProperty4: "vzuek",
          optionalProperty5: "fzjodscdfcdr",
        },
        error: {},
      },
      tags: { key1878: "warz" },
    },
  );
  console.log(result);
}

async function main() {
  ispCustomerCreateOrUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
