// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerserviceaimanager";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a `ModelSource`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites.
 *
 * @summary create or update a `ModelSource`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites.
 * x-ms-original-file: 2026-09-02-preview/ModelSources_CreateOrUpdate.json
 */
async function modelSourcesCreateOrUpdateMaximumSet(): Promise<void> {
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

/**
 * This sample demonstrates how to create or update a `ModelSource`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites.
 *
 * @summary create or update a `ModelSource`. This is a full-replace operation: any optional property omitted from the request body is reset to its default value, or cleared if it has no default. To safely modify a subset of fields, perform a GET, modify the returned resource, and PUT it back using the returned ETag via the `If-Match` header to avoid concurrent overwrites.
 * x-ms-original-file: 2026-09-02-preview/ModelSources_CreateOrUpdate_ManagedIdentity.json
 */
async function modelSourcesCreateOrUpdateManagedIdentity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.modelSources.createOrUpdate(
    "rgaimanagers",
    "aimanager1",
    "foundry",
    {
      properties: {
        sourceType: "MicrosoftFoundry",
        description: "Foundry model source",
        microsoftFoundry: {
          projectResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.CognitiveServices/accounts/test-account/projects/test-model-project",
        },
        credential: {
          managedIdentity: {
            resourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/mytestidentity",
          },
        },
      },
    },
    { ifMatch: '"00000000-0000-0000-0000-000000000000"', ifNoneMatch: "*" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await modelSourcesCreateOrUpdateMaximumSet();
  await modelSourcesCreateOrUpdateManagedIdentity();
}

main().catch(console.error);
