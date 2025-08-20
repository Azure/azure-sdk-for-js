// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import { StorageSharedKeyCredential } from "@azure/storage-blob";
import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    // Enter your storage account name and shared key
    const account = "<account>";
    const accountKey = "<accountkey>";
    // Use StorageSharedKeyCredential with storage account and account key
    // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    // @ts-ignore
    const changeFeedClient = new BlobChangeFeedClient(
      // When using AnonymousCredential, following url should include a valid SAS or support public access
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential,
    );
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    // Enter your storage account name and shared key
    const account = "<account>";
    const credential = new DefaultAzureCredential();
    // @ts-ignore
    const changeFeedClient = new BlobChangeFeedClient(
      // When using AnonymousCredential, following url should include a valid SAS or support public access
      `https://${account}.blob.core.windows.net`,
      credential,
    );
  });

  it("ReadmeSampleListChanges", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const changeFeedClient = new BlobChangeFeedClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential,
    );
    // @ts-preserve-whitespace
    // Use for await to iterate through the change feed
    for await (const event of changeFeedClient.listChanges()) {
      console.log(`Event: ${event.eventType}`);
      console.log(`Event time: ${event.eventTime}`);
      console.log(`Event data: ${JSON.stringify(event.data)}`);
    }
    // @ts-preserve-whitespace
    // Use `byPage` to iterate through the change feed
    for await (const page of changeFeedClient.listChanges().byPage()) {
      console.log(`Page: ${JSON.stringify(page)}`);
      for (const event of page.events) {
        console.log(`Event: ${event.eventType}`);
        console.log(`Event time: ${event.eventTime}`);
        console.log(`Event data: ${JSON.stringify(event.data)}`);
      }
    }
  });

  it("ReadmeSampleListChanges_Continuation", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const changeFeedClient = new BlobChangeFeedClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential,
    );
    // @ts-preserve-whitespace
    let iterator = changeFeedClient.listChanges().byPage({ maxPageSize: 2 });
    let response = (await iterator.next()).value;
    // Prints 2 page ranges
    if (response.pageRange) {
      for (const pageRange of response.pageRange) {
        console.log(`Event: ${pageRange.eventType}`);
        console.log(`Event time: ${pageRange.eventTime}`);
        console.log(`Event data: ${JSON.stringify(pageRange.data)}`);
      }
    }
    // Gets next marker
    let marker = response.continuationToken;
    // Passing next marker as continuationToken
    iterator = changeFeedClient
      .listChanges()
      .byPage({ continuationToken: marker, maxPageSize: 10 });
    response = (await iterator.next()).value;
    // Prints 10 page ranges
    if (response.pageRange) {
      for (const pageRange of response.pageRange) {
        console.log(`Event: ${pageRange.eventType}`);
        console.log(`Event time: ${pageRange.eventTime}`);
        console.log(`Event data: ${JSON.stringify(pageRange.data)}`);
      }
    }
  });

  it("ReadmeSampleListChangesTimeRange", async () => {
    const account = "<account>";
    const accountKey = "<accountkey>";
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const changeFeedClient = new BlobChangeFeedClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential,
    );
    // @ts-preserve-whitespace
    const start = new Date(Date.UTC(2020, 1, 21, 22, 30, 0)); // will be rounded down to 22:00
    const end = new Date(Date.UTC(2020, 4, 8, 21, 10, 0)); // will be rounded up to 22:00
    // Use for await to iterate through the change feed
    for await (const event of changeFeedClient.listChanges({ start, end })) {
      console.log(`Event: ${event.eventType}`);
      console.log(`Event time: ${event.eventTime}`);
      console.log(`Event data: ${JSON.stringify(event.data)}`);
    }
    // @ts-preserve-whitespace
    // Use `byPage` to iterate through the change feed
    for await (const page of changeFeedClient.listChanges({ start, end }).byPage()) {
      console.log(`Page: ${JSON.stringify(page)}`);
      for (const event of page.events) {
        console.log(`Event: ${event.eventType}`);
        console.log(`Event time: ${event.eventTime}`);
        console.log(`Event data: ${JSON.stringify(event.data)}`);
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
