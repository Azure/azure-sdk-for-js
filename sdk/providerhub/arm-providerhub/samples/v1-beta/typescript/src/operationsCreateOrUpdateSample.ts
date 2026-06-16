// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the operation supported by the given provider.
 *
 * @summary creates or updates the operation supported by the given provider.
 * x-ms-original-file: 2024-09-01/Operations_CreateOrUpdate.json
 */
async function operationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.operations.createOrUpdate("Microsoft.Contoso", {
    properties: {
      contents: [
        {
          name: "RP.69C09791/register/action",
          actionType: "Internal",
          display: {
            default: {
              description:
                "Registers the subscription for the RP.69C09791 resource provider and enables the creation of RP.69C09791.",
              operation: "Registers the RP.69C09791 Resource Provider",
              provider: "RP.69C09791",
              resource: "Register",
            },
          },
          isDataAction: true,
        },
        {
          name: "RP.69C09791/unregister/action",
          display: {
            default: {
              description:
                "Unregisters the subscription for the RP.69C09791 resource provider and enables the creation of RP.69C09791.",
              operation: "Unregisters the RP.69C09791 Resource Provider",
              provider: "RP.69C09791",
              resource: "Unregister",
            },
            en: {
              description: "ece249f5-b5b9-492d-ac68-b4e1be1677bc",
              operation: "d31623d6-8765-42fb-aca2-5a58303e52dd",
              provider: "RP.69C09791",
              resource: "2e1803d4-417f-492c-b305-148da38b211e",
            },
          },
          isDataAction: false,
          origin: "System",
        },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await operationsCreateOrUpdate();
}

main().catch(console.error);
