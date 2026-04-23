// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedCacheClient } = require("@azure/arm-connectedcache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this api creates an enterprise mcc customer with the specified create parameters
 *
 * @summary this api creates an enterprise mcc customer with the specified create parameters
 * x-ms-original-file: 2024-11-30-preview/EnterpriseMccCustomers_CreateOrUpdate_MaximumSet_Gen.json
 */
async function enterpriseMccCustomersCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.enterpriseMccCustomers.createOrUpdate(
    "rgConnectedCache",
    "MccRPTest1",
    {
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
          customerTransitState: "voblixkxfejbmhxilb",
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
      tags: { key3379: "dpyqeaqhcnutzezom" },
      location: "westus",
    },
  );
  console.log(result);
}

async function main() {
  await enterpriseMccCustomersCreateOrUpdate();
}

main().catch(console.error);
