// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedHatOpenShiftClient } from "@azure/arm-redhatopenshifthcp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a ExternalAuth
 *
 * @summary update a ExternalAuth
 * x-ms-original-file: 2026-09-01-preview/ExternalAuths_Update_MaximumSet_Gen.json
 */
async function externalAuthsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const result = await client.externalAuths.update("rgopenapi", "hcpCluster-name", "my-cool-auth", {
    properties: {
      issuer: {
        url: "https://microsoft.com/a",
        audiences: ["audience1", "audience2", "audience3", "audience4", "audience5"],
        ca: "rgmklhpshpjkbpjskqxtyfwetjjxr",
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
              "nmaleeslaspkxdurlxhdntydjdcdqmwizhqpgtywqzzykfvxnouqlewuwqyqlejnddtlmudupjlndnogagnkbnupmpxjsplsfbpoknppcbsjbymnlqmmtukbaiaipzevwugtrgxuxqgwlevtdtabxbcauvuwjqzngklgovnnjwcliigxeedcum",
            prefix: "krxszffgjhffwcszyzttmujlinm",
            prefixPolicy: "grjqszciuqlznueyltsmgec",
          },
          groups: {
            claim: "yrqawnseinzjlcevwxetagxeqkxoepjoctyrvddrfozociinj",
            prefix: "ajnojzalbh",
          },
        },
        validationRules: [
          {
            type: "RequiredClaim",
            requiredClaim: { claim: "ciapdmvrnfitudpx", requiredValue: "mqzzjiozgxfgflhdrnwawpke" },
          },
        ],
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await externalAuthsUpdateMaximumSet();
}

main().catch(console.error);
