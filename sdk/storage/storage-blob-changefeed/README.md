# Azure Storage Blob Change Feed client library for JavaScript

> Server Version: 2019-12-12

The change feed provides an ordered, guaranteed, durable, immutable, read-only transaction log of all the changes that occur to blobs and blob metadata in your storage account. Client applications can read these logs at any time. The change feed enables you to build efficient and scalable solutions that process change events that occur in your Blob Storage account at a low cost.

This project provides a client library in JavaScript that makes it easy to consume the change feed.

Use the client libraries in this package to:
  - Reading change feed events, all or within a time range
  - Resuming reading events from a saved position

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob-changefeed) |
[Package (npm)](https://www.npmjs.com/package/@azure/storage-blob-changefeed/) |
[API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/storage-blob-changefeed) |
[Product documentation](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-change-feed) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob-changefeed/samples) |

## Getting started

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a [Storage Account](https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal) to use this package. If you are using this package in a Node.js application, then Node.js version 8.0.0 or higher is required.

### Install the package

The preferred way to install the Azure Storage Blob Change Feed client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```bash
npm install @azure/storage-blob-changefeed
```

### Authenticate the client

This library uses an authenticated `BlobServiceClient` to initialize. Refer to [storage-blob](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob#authenticate-the-client) for how to authenticate a `BlobServiceClient`.

### Compatibility

For this preview, this library is only compatible with Node.js.

## Key concepts

The change feed is stored as blobs in a special container in your storage account at standard blob pricing cost. You can control the retention period of these files based on your requirements. Change events are appended to the change feed as records in the Apache Avro format specification: a compact, fast, binary format that provides rich data structures with inline schema. This format is widely used in the Hadoop ecosystem, Stream Analytics, and Azure Data
Factory.

This library offers a client you can use to fetch the change events.

## Examples

### Initialize the change feed client

The `BlobChangeFeedClient` requires a `BlobServiceClient` to initialize. Refer to [storage-blob](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob#create-the-blob-service-client) for how to create the blob service client. Here is an example using `StorageSharedKeyCredential`.

  ```javascript
  const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
  const { BlobChangeFeedClient } = require("@azure/storage-blob-changefeed");

  // Enter your storage account name and shared key
  const account = "<account>";
  const accountKey = "<accountkey>";
  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  const changeFeedClient = new BlobChangeFeedClient(blobServiceClient);
  ```

### Reading all events in the Change Feed

Use `BlobChangeFeedClient.listChanges()` to get iterators to iterate through the change events.

```javascript
const { BlobChangeFeedEvent } = require("@azure/storage-blob-changefeed");

let changeFeedEvents : BlobChangeFeedEvent[] = [];
for await (const event of changeFeedClient.listChanges()) {
    changeFeedEvents.push(event);
}
```

By page.

```javascript
const { BlobChangeFeedEvent } = require("@azure/storage-blob-changefeed");

let changeFeedEvents : BlobChangeFeedEvent[] = [];
for await (const eventPage of changeFeedClient.listChanges().byPage()) {
    for (const event of eventPage) {
        changeFeedEvents.push(event);
    }
}
```

### Resuming reading events with a cursor

```javascript
const { BlobChangeFeedEvent } = require("@azure/storage-blob-changefeed");

let changeFeedEvents : BlobChangeFeedEvent[] = [];
const firstPage = await changeFeedClient.listChanges().byPage({maxPageSize: 10}).next();
for (const event of firstPage) {
    changeFeedEvents.push(event);
}

// Resume iterating from the previous position with the continuationToken.
for await (const eventPage of changeFeedClient.listChanges().byPage({continuationToken: firstPage.continuationToken})) {
    for (const event of eventPage) {
        changeFeedEvents.push(event);
    }
}
```

### Reading events within a time range

Pass start time and end time to `BlobChangeFeedClient.listChanges()` to fetch events within a time range.

Note that for this preview release, the change feed client will round start time down to the nearest hour, and round end time up to the next hour.

```javascript
const { BlobChangeFeedEvent } = require("@azure/storage-blob-changefeed");

const start = new Date(Date.UTC(2020, 1, 21, 22, 30, 0)); // will be rounded down to 22:00
const end = new Date(Date.UTC(2020, 4, 8, 21, 10, 0)); // will be rounded up to 22:00

let changeFeedEvents : BlobChangeFeedEvent[] = [];
// You can also provide just a start or end time.
for await (const event of changeFeedClient.listChanges({ start, end })) {
    changeFeedEvents.push(event);
}
```

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

More code samples:

- [Blob Storage Change Feed Samples (JavaScript)](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob-changefeed/samples/javascript)
- [Blob Storage Change Feed Samples (TypeScript)](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob-changefeed/samples/typescript)
- [Blob Storage Change Feed Test Cases](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob-changefeed/test/)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

Also refer to [Storage specific guide](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/CONTRIBUTING.md) for additional information on setting up the test environment for storage libraries.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-blob-changefeed%2FREADME.png)
