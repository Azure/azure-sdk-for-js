// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewSharingClient, {
  paginate
} from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List share resources
 *
 * @summary List share resources
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Share/preview/2023-05-30-preview/examples/ShareResources_List.json
 */
async function shareResourcesList() {
  const endpoint = "accountName.purview.azure.com/share";
  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);
  const initialResponse = await client.path("/shareResources").get();
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

async function main() {
  shareResourcesList();
}

main().catch(console.error);
