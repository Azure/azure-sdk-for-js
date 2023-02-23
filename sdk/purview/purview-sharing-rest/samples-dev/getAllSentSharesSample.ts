// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createPurviewSharingClient, {
  SentSharesGetAllSentSharesParameters,
  paginate,
} from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List sent shares
 *
 * @summary List sent shares
 */
async function getAllSentShares() {
  const endpoint = process.env["ENDPOINT"] || "";
  const storageAccountResourceId = process.env["STORAGE_ACCOUNT_RESOURCE_ID"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);
  const options: SentSharesGetAllSentSharesParameters = {
    queryParameters: {
      referenceName: storageAccountResourceId,
    },
  };

  const initialResponse = await client.path("/sentShares").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

async function main() {
  getAllSentShares();
}

main().catch(console.error);
