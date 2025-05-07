# Azure Storage Blob Change Feed client library for JavaScript

> Server Version: 2019-12-12 or later.

The change feed provides an ordered, guaranteed, durable, immutable, read-only transaction log of all the changes that occur to blobs and blob metadata in your storage account. Client applications can read these logs at any time. The change feed enables you to build efficient and scalable solutions that process change events that occur in your Blob Storage account at a low cost.

This project provides a client library in JavaScript that makes it easy to consume the change feed.

Use the client libraries in this package to:

- Reading change feed events, all or within a time range
- Resuming reading events from a saved position

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob-changefeed)
- [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob-changefeed/)
- [API Reference Documentation](https://learn.microsoft.com/javascript/api/@azure/storage-blob-changefeed)
- [Product documentation](https://learn.microsoft.com/azure/storage/blobs/storage-blob-change-feed)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob-changefeed/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- A [Storage Account](https://learn.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal)

### Install the package

The preferred way to install the Azure Storage Blob Change Feed client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```bash
npm install @azure/storage-blob-changefeed
```

### Authenticate the client

This library uses an authenticated `BlobServiceClient` to initialize. Refer to [storage-blob](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#authenticate-the-client) for how to authenticate a `BlobServiceClient`.

### Compatibility

For now, this library is only compatible with Node.js.

## Key concepts

The change feed is stored as blobs in a special container in your storage account at standard blob pricing cost. You can control the retention period of these files based on your requirements. Change events are appended to the change feed as records in the Apache Avro format specification: a compact, fast, binary format that provides rich data structures with inline schema. This format is widely used in the Hadoop ecosystem, Stream Analytics, and Azure Data
Factory.

This library offers a client you can use to fetch the change events.

## Examples

- [Initialize the change feed client](#initialize-the-change-feed-client "Initialize the change feed client")
- [Reading all events in the Change Feed](#reading-all-events-in-the-change-feed "Reading all events in the Change Feed")
- [Resuming reading events with a continuationToken](#resuming-reading-events-with-a-continuationtoken "Resuming reading events with a continuationToken")
- [Reading events within a time range](#reading-events-within-a-time-range "Reading events within a time range")

### Initialize the change feed client

The `BlobChangeFeedClient` requires almost the same parameters as `BlobServiceClient` to initialize. Refer to [storage-blob](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob#create-the-blob-service-client) for how to create the blob service client. Here is an example using `StorageSharedKeyCredential`.

```ts snippet:ReadmeSampleCreateClient
import { StorageSharedKeyCredential } from "@azure/storage-blob";
import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";

// Enter your storage account name and shared key
const account = "<account>";
const accountKey = "<accountkey>";
// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const changeFeedClient = new BlobChangeFeedClient(
  // When using AnonymousCredential, following url should include a valid SAS or support public access
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential,
);
```

### Reading all events in the Change Feed

Use `BlobChangeFeedClient.listChanges()` to get iterators to iterate through the change events.

```ts snippet:ReadmeSampleListChanges
import { StorageSharedKeyCredential } from "@azure/storage-blob";
import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";

const account = "<account>";
const accountKey = "<accountkey>";
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const changeFeedClient = new BlobChangeFeedClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential,
);

// Use for await to iterate through the change feed
for await (const event of changeFeedClient.listChanges()) {
  console.log(`Event: ${event.eventType}`);
  console.log(`Event time: ${event.eventTime}`);
  console.log(`Event data: ${JSON.stringify(event.data)}`);
}

// Use `byPage` to iterate through the change feed
for await (const page of changeFeedClient.listChanges().byPage()) {
  console.log(`Page: ${JSON.stringify(page)}`);
  for (const event of page.events) {
    console.log(`Event: ${event.eventType}`);
    console.log(`Event time: ${event.eventTime}`);
    console.log(`Event data: ${JSON.stringify(event.data)}`);
  }
}
```

### Resuming reading events with a continuationToken

```ts snippet:ReadmeSampleListChanges_Continuation
import { StorageSharedKeyCredential } from "@azure/storage-blob";
import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";

const account = "<account>";
const accountKey = "<accountkey>";
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const changeFeedClient = new BlobChangeFeedClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential,
);

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
iterator = changeFeedClient.listChanges().byPage({ continuationToken: marker, maxPageSize: 10 });
response = (await iterator.next()).value;
// Prints 10 page ranges
if (response.pageRange) {
  for (const pageRange of response.pageRange) {
    console.log(`Event: ${pageRange.eventType}`);
    console.log(`Event time: ${pageRange.eventTime}`);
    console.log(`Event data: ${JSON.stringify(pageRange.data)}`);
  }
}
```

### Reading events within a time range

Pass start time and end time to `BlobChangeFeedClient.listChanges()` to fetch events within a time range.

Note that for now, the change feed client will round start time down to the nearest hour, and round end time up to the next hour.

```ts snippet:ReadmeSampleListChangesTimeRange
import { StorageSharedKeyCredential } from "@azure/storage-blob";
import { BlobChangeFeedClient } from "@azure/storage-blob-changefeed";

const account = "<account>";
const accountKey = "<accountkey>";
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const changeFeedClient = new BlobChangeFeedClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential,
);

const start = new Date(Date.UTC(2020, 1, 21, 22, 30, 0)); // will be rounded down to 22:00
const end = new Date(Date.UTC(2020, 4, 8, 21, 10, 0)); // will be rounded up to 22:00
// Use for await to iterate through the change feed
for await (const event of changeFeedClient.listChanges({ start, end })) {
  console.log(`Event: ${event.eventType}`);
  console.log(`Event time: ${event.eventTime}`);
  console.log(`Event data: ${JSON.stringify(event.data)}`);
}

// Use `byPage` to iterate through the change feed
for await (const page of changeFeedClient.listChanges({ start, end }).byPage()) {
  console.log(`Page: ${JSON.stringify(page)}`);
  for (const event of page.events) {
    console.log(`Event: ${event.eventType}`);
    console.log(`Event time: ${event.eventTime}`);
    console.log(`Event data: ${JSON.stringify(event.data)}`);
  }
}
```

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

More code samples:

- [Blob Storage Change Feed Samples (JavaScript)](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob-changefeed/samples/v12-beta/javascript)
- [Blob Storage Change Feed Samples (TypeScript)](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob-changefeed/samples/v12-beta/typescript)
- [Blob Storage Change Feed Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/storage/storage-blob-changefeed/test/)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

Also refer to [Storage specific guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/storage/CONTRIBUTING.md) for additional information on setting up the test environment for storage libraries.
