// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary list shares in an account, showing options for paging, resuming paging, etc.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { ShareServiceClient } from "@azure/storage-file-share";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  const serviceClient = new ShareServiceClient(
    `https://${accountName}.file.core.windows.net`,
    new DefaultAzureCredential(),
  );

  console.log("Shares:");
  for await (const share of serviceClient.listShares()) {
    console.log(`- ${share.name}`);
  }

  // The iterator also supports iteration by page with a configurable (and optional) `maxPageSize`. Here, we use a small
  // `maxPageSize` so that the effect of paging is noticeable with a small number of shares

  console.log("Shares (by page):");
  const maxPageSize = 5;
  let pageNumber = 1;
  for await (const page of serviceClient.listShares().byPage({ maxPageSize })) {
    console.log(`- Page ${pageNumber++}:`);
    if (page.shareItems) {
      for (const share of page.shareItems) {
        console.log(`  - ${share.name}`);
      }
    }
  }

  // The paged iterator also supports resuming from a continuation token. In the following example, we use the
  // continuation token from the first iteration to resume iteration at the second page.

  console.log("Shares (by page, starting from the second page of results):");
  const iter = serviceClient.listShares().byPage({ maxPageSize });
  const result = await iter.next();

  if (result.done) {
    throw new Error("Expected at least one page of results.");
  }

  // The continuation token is an optional property of the page.
  const continuationToken = result.value.continuationToken;

  if (!continuationToken) {
    throw new Error("Expected a continuation token from the service, but one was not returned.");
  }

  const resumed = serviceClient.listShares().byPage({ maxPageSize, continuationToken });
  pageNumber = 2;
  for await (const page of resumed) {
    console.log(`- Page ${pageNumber++}:`);
    if (page.shareItems) {
      for (const share of page.shareItems) {
        console.log(`  - ${share.name}`);
      }
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
