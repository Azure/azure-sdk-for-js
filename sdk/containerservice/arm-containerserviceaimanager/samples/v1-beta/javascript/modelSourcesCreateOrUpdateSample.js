// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerserviceaimanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a `ModelSource`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites.
 *
 * @summary create or update a `ModelSource`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites.
 * x-ms-original-file: 2026-05-02-preview/ModelSources_CreateOrUpdate.json
 */
async function modelSourcesCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.modelSources.createOrUpdate(
    "rgaimanagers",
    "aimanager1",
    "huggingface",
    {
      properties: {
        sourceType: "HuggingFace",
        description: "Hugging Face model source",
        credential: { inline: { value: "hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" } },
      },
    },
    { ifMatch: '"00000000-0000-0000-0000-000000000000"', ifNoneMatch: "*" },
  );
  console.log(result);
}

async function main() {
  await modelSourcesCreateOrUpdateMaximumSet();
}

main().catch(console.error);
