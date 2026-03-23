// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DiscoveryClient } = require("@azure/arm-discovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Tool
 *
 * @summary update a Tool
 * x-ms-original-file: 2026-02-01-preview/Tools_Update_MaximumSet_Gen.json
 */
async function toolsUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
  const client = new DiscoveryClient(credential, subscriptionId);
  const result = await client.tools.update("rgdiscovery", "f1972d0fc9531d424c", {
    properties: {
      version: "jittnzvso",
      environmentVariables: { key3840: "snaxrtkryhwqw" },
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
    tags: { key4187: "vbirsnehukndlpioqtsmqyoqhklg" },
  });
  console.log(result);
}

async function main() {
  await toolsUpdateMaximumSet();
}

main().catch(console.error);
