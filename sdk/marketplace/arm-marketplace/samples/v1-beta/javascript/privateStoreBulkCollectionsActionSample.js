// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MarketplaceClient } = require("@azure/arm-marketplace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to perform an action on bulk collections
 *
 * @summary perform an action on bulk collections
 * x-ms-original-file: 2025-01-01/BulkCollectionsAction.json
 */
async function bulkCollectionsAction() {
  const credential = new DefaultAzureCredential();
  const client = new MarketplaceClient(credential);
  const result = await client.privateStore.bulkCollectionsAction(
    "a0e28e55-90c4-41d8-8e34-bb7ef7775406",
    {
      payload: {
        action: "EnableCollections",
        collectionIds: [
          "c752f021-1c37-4af5-b82f-74c51c27b44a",
          "f47ef1c7-e908-4f39-ae29-db181634ad8d",
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await bulkCollectionsAction();
}

main().catch(console.error);
