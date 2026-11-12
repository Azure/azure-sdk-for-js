// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Tool
 *
 * @summary update a Tool
 * x-ms-original-file: 2026-06-01/Tools_Update_MaximumSet_Gen.json
 */
async function toolsUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.tools.update("rgdiscovery", "f1f7503773093a8c1e", {
    properties: {
      version: "jtpp",
      environmentVariables: { key8857: "egddkscfebieioknriklhsrl" },
      definitionContent: {
        tool_id: "discovery-m1",
        name: "discovery",
        description:
          "Advanced DFT computational tools for molecular geometry optimization and property calculations",
        actions: [
          {
            name: "GeometryOptimization",
            description:
              "Optimize geometry of 'xyz's from the input data asset. This is a prerequisite for all other discovery computations.",
            input_schema: {
              type: "object",
              properties: {
                inputDataAssetId: {
                  type: "string",
                  description: "Identifier of the input data asset",
                },
                xyzColumnName: {
                  type: "string",
                  description: "Column containing xyz data within the input data table asset",
                },
                outputDataAssetId: {
                  type: "string",
                  description:
                    "Identifier to use for the new output data asset which will be created.",
                },
                basisSet: {
                  type: "string",
                  description:
                    "Basis set. Must be one of the supported basis sets (e.g., def2-svp, def2-tzvp).",
                },
              },
              required: ["inputDataAssetId", "xyzColumnName"],
            },
            command: "python3 submit_dft.py ",
            environment_variables: [
              { name: "OUTPUT_DIRECTORY_PATH", value: "{{ outputDataAssetId }}" },
            ],
          },
        ],
      },
    },
    tags: { key1372: "ihmhpkujjlitavkabscrrpjwsaks" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await toolsUpdateMaximumSet();
}

main().catch(console.error);
