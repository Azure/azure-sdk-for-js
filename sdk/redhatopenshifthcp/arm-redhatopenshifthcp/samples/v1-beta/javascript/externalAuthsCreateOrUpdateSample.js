// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a ExternalAuth
 *
 * @summary create a ExternalAuth
 * x-ms-original-file: 2026-06-30-preview/ExternalAuths_CreateOrUpdate_MaximumSet_Gen.json
 */
async function externalAuthsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.externalAuths.createOrUpdate(
    "rgopenapi",
    "hcpCluster-name",
    "my-cool-auth",
    {
      properties: {
        issuer: {
          url: "https://microsoft.com/a",
          audiences: ["audience1", "audience2", "audience3", "audience4", "audience5"],
          ca: "lrakpuqodeqscdauefb",
        },
        clients: [
          {
            component: { name: "my-cool-component", authClientNamespace: "my-cool-namespace" },
            clientId: "vobxtzobefgl",
            extraScopes: ["ejmvezdxvoozyiickteiqnvpxqciep"],
            type: "Confidential",
          },
        ],
        claim: {
          mappings: {
            username: {
              claim:
                "utlmketyrdxmwijowjzbuqyawuoqrlriryuknigayeviriulgjvuwvxjrsrhpmvavyyxzapgkfeyedcklnoddeviibefgvubvecffqgdhntammtlwjsjemhsqhafmmorskpuwbtjgkoggxq",
              prefix: "ojmwi",
              prefixPolicy: "mdbghfytgejdqobfllqmajtc",
            },
            groups: {
              claim:
                "icvcoadhpyprqygxyvqhewaycjdtzrwjzbjgmyralburdaolouyvkymfpetymlcwpqsoteryaatoapieizbsnttmkkxsrhyaacnucznujhgmxkmnmgtcjntjsmuabplpoyxberrjdikkkqqiqfnlvwngpbfajzhxzdgqicoconqtrrstzzumdurgfsheypcm",
              prefix: "kjlxhbjdvwarcwdu",
            },
          },
          validationRules: [
            {
              type: "RequiredClaim",
              requiredClaim: {
                claim: "ciapdmvrnfitudpx",
                requiredValue: "mqzzjiozgxfgflhdrnwawpke",
              },
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await externalAuthsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
