// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary use custom HTTP pipeline options when connecting to the service
 */

import { newPipeline, ShareServiceClient } from "@azure/storage-file-share";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  // Enter your storage account name
  const accountName = process.env.ACCOUNT_NAME;
  if (!accountName) {
    throw new Error("ACCOUNT_NAME environment variable is not set.");
  }

  const pipeline = newPipeline(new DefaultAzureCredential(), {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    retryOptions: { maxTries: 4 }, // Retry options
    userAgentOptions: { userAgentPrefix: "AdvancedSample V1.0.0" }, // Customized telemetry string
  });

  // List shares
  const serviceClient = new ShareServiceClient(
    `https://${accountName}.file.core.windows.net`,
    pipeline,
  );

  console.log("Shares:");
  let i = 1;
  for await (const share of serviceClient.listShares()) {
    console.log(`Share ${i++}: ${share.name}`);
  }

  // Create a share
  const shareName = `newshare${new Date().getTime()}`;
  const shareClient = serviceClient.getShareClient(shareName);
  await shareClient.create();
  console.log(`Created share ${shareClient.name} successfully.`);

  // Delete share
  await shareClient.delete();
  console.log(`Deleted share ${shareClient.name}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
